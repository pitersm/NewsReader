using Contracts;
using Microsoft.EntityFrameworkCore;
using News_Reader.DAL.Models;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Net;
using System.ServiceModel.Syndication;
using System.Text;
using System.Threading.Tasks;
using System.Xml;

namespace News_Reader.Service.Services
{
    public class RSSFeedService : IRSSFeedService
    {
        private readonly IRepository<RSSFeed> _repository;
        public RSSFeedService(IRepository<RSSFeed> repository)
        {
            _repository = repository;
        }
        public async Task<RSSFeedDTO> Create(RSSFeedDTO dto)
        {
            RSSFeed rssFeed = new RSSFeed()
            {
                Name = dto.Name,
                CategoryId = dto.Category.Id.Value,
                XMLFileAddress = dto.XMLFileAddress
            };

            var newFeed = await _repository.Save(rssFeed);
            dto.Id = newFeed.Id;
            return dto;
        }

        public async Task Delete(long id)
        {
            await _repository.Delete(id);
        }

        public async Task<RSSFeedDTO> Get(long id)
        {
            var feed = await _repository.Get(id, "Category");
            return new RSSFeedDTO()
            {
                Id = feed.Id,
                Name = feed.Name,
                XMLFileAddress = feed.XMLFileAddress,
                Category = feed.Category != null ? new CategoryDTO()
                {
                    Id = feed.Category.Id,
                    Name = feed.Category.Name
                } : null
            };
        }

        public async Task<List<RSSFeedDTO>> List()
        {
            return await _repository.List("Category")
                              .OrderBy(a => a.Name)
                              .Select(a => new RSSFeedDTO()
                              {
                                  Id = a.Id,
                                  Name = a.Name,
                                  XMLFileAddress = a.XMLFileAddress,
                                  Category = new CategoryDTO() { Name = a.Category.Name, Id = a.Category.Id }
                              })
                              .ToListAsync();
        }

        public async Task<NewsQueryDTO> ListNewsByRSSFeed(long feedId, DateTimeOffset? listFromParam = null, string filter = "")
        {
            var rssFeed = await _repository.Get(feedId);

            if (rssFeed == null)
            {
                return null;
            }

            var newsListItems = LoadFeedItems(rssFeed);

            return BuildNewsQueryResult(newsListItems, listFromParam, filter);
        }

        public NewsQueryDTO ListNewsByCategory(long categoryId, DateTimeOffset? listFrom, string filter)
        {
            var rssFeeds = _repository.List()
                .Where(a => a.CategoryId == categoryId)
                .ToList();

            IEnumerable<SyndicationItem> aggregatedFeedItems = new List<SyndicationItem>();
            var feedXNames = new Dictionary<string, string>();

            foreach (var rssFeed in rssFeeds)
            {
                feedXNames.Add(rssFeed.XMLFileAddress, rssFeed.Name);
                aggregatedFeedItems = aggregatedFeedItems.Concat(LoadFeedItems(rssFeed));
            }

            return BuildNewsQueryResult(aggregatedFeedItems, listFrom, filter, feedXNames);
        }

        public NewsQueryDTO ListNews(DateTimeOffset? listFrom, string filter)
        {
            var rssFeeds = _repository.List().ToList();

            IEnumerable<SyndicationItem> aggregatedFeedItems = new List<SyndicationItem>();
            var feedXNames = new Dictionary<string, string>();

            foreach (var rssFeed in rssFeeds)
            {
                feedXNames.Add(rssFeed.XMLFileAddress, rssFeed.Name);
                aggregatedFeedItems = aggregatedFeedItems.Concat(LoadFeedItems(rssFeed));
            }

            return BuildNewsQueryResult(aggregatedFeedItems, listFrom, filter, feedXNames);
        }

        private IEnumerable<SyndicationItem> LoadFeedItems(RSSFeed rssFeed) 
        {
            var rssFeedAddress = rssFeed.XMLFileAddress;
            string xml;
            using (WebClient webClient = new WebClient())
            {
                xml = Encoding.UTF8.GetString(webClient.DownloadData(rssFeedAddress));
            }
            xml = xml.Replace("EST</pubDate>", "-0500</pubDate>");

            StringReader tx = new StringReader(xml);
            using var reader = XmlReader.Create(tx);
            var feed = SyndicationFeed.Load(reader);

            return feed.Items;
        }

        private NewsQueryDTO BuildNewsQueryResult(IEnumerable<SyndicationItem> feedItems, DateTimeOffset? listFrom, 
            string filter, Dictionary<string, string> feedNames = null)
        {
            Func<SyndicationItem, bool> filterByDate = new Func<SyndicationItem, bool>(a => true);
            Func<SyndicationItem, bool> filterByFilter = new Func<SyndicationItem, bool>(a => true);

            if (listFrom != null)
            {
                filterByDate = new Func<SyndicationItem, bool>(a => a.PublishDate < listFrom);
            }

            if (!string.IsNullOrWhiteSpace(filter))
            {
                var culture = new CultureInfo("en-US");
                filterByFilter = new Func<SyndicationItem, bool>(a =>
                culture.CompareInfo.IndexOf(a.Title.Text, filter, CompareOptions.IgnoreCase) >= 0);
            }

            var newsList = feedItems
                .OrderByDescending(u => u.PublishDate)
                .Where(a => filterByFilter.Invoke(a) && filterByDate.Invoke(a))
                .Take(10)
                .ToList();

            if (newsList.Count == 0)
            {
                return null;
            }

            return new NewsQueryDTO()
            {
                OldestPublishDate = newsList.Last().PublishDate,
                NewsItems = from item in newsList
                            orderby item.PublishDate descending
                            select new NewsItemDTO()
                            {
                                Identifier = item.Id,
                                Title = item.Title.Text,
                                Summary = item.Summary != null ? item.Summary.Text : string.Empty,
                                Link = item.Links.First().Uri.ToString(),
                                PublishDate = item.PublishDate
                                //Source = feedNames.FirstOrDefault(a => a.Key == item.)
                            }
            };
        }

        public async Task Update(RSSFeedDTO dto)
        {
            var repoObj = new RSSFeed()
            {
                Id = dto.Id.Value,
                Name = dto.Name,
                XMLFileAddress = dto.XMLFileAddress,
                CategoryId = dto.Category != null ? dto.Category.Id : null
            };

            await _repository.Update(repoObj);
        }

        
    }
}

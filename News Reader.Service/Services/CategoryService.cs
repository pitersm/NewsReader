using Microsoft.EntityFrameworkCore;
using News_Reader.DAL.Models;
using Contracts;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace News_Reader.Service.Services
{
    public class CategoryService : ICategoryService
    {
        private IRepository<FeedCategory> _categoryRepository;
        private IRepository<RSSFeed> _feedRepository;

        public CategoryService(IRepository<FeedCategory> categoryRepository, IRepository<RSSFeed> feedRepository)
        {
            _categoryRepository = categoryRepository;
            _feedRepository = feedRepository;
        }

        public async Task<CategoryDTO> Create(CategoryDTO dto)
        {
            FeedCategory category = new FeedCategory()
            {
                Name = dto.Name
            };

            var newCategory = await _categoryRepository.Save(category);
            dto.Id = newCategory.Id;
            return dto;
        }

        public async Task Delete(long id)
        {
            var feedsUnderCategory = _feedRepository.List().Where(a => a.CategoryId == id).ToList();

            foreach (RSSFeed feed in feedsUnderCategory)
            {
                feed.CategoryId = null;
                await _feedRepository.Save(feed);
            }

            await _categoryRepository.Delete(id);
        }

        public async Task<CategoryDTO> Get(long id)
        {
            var category = await _categoryRepository.Get(id, "Feeds");
            return new CategoryDTO()
            {
                Id = category.Id,
                Name = category.Name,
                RssFeeds = category.Feeds.Select(feed => new RSSFeedDTO() {
                    Id = feed.Id,
                    Name = feed.Name,
                    XMLFileAddress = feed.XMLFileAddress
                })
            };
        }

        public Task<List<CategoryDTO>> List()
        {
            return _categoryRepository.List()
                              .OrderBy(a => a.Name)
                              .Select(a => new CategoryDTO() { Id = a.Id, Name = a.Name})
                              .ToListAsync();
        }

        public async Task Update(CategoryDTO dto)
        {
            var repoObj = new FeedCategory()
            {
                Id = dto.Id.Value,
                Name = dto.Name,
                Feeds = dto.RssFeeds.Select(a => new RSSFeed() { Name = a.Name, Id = a.Id.Value, XMLFileAddress = a.XMLFileAddress}).ToList()
            };

            await _categoryRepository.Update(repoObj);
        }
    }
}

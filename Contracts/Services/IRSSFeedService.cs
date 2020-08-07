using System;
using System.Threading.Tasks;

namespace Contracts
{
    public interface IRSSFeedService : IBaseEntityService<RSSFeedDTO>
    {
        NewsQueryDTO ListNews(DateTimeOffset? listFrom, string filter);
        Task<NewsQueryDTO> ListNewsByRSSFeed(long feedId, DateTimeOffset? listFrom, string filter);
        NewsQueryDTO ListNewsByCategory(long categoryId, DateTimeOffset? listFrom, string filter);
    }
}

using News_Reader.Service.Contracts;
using System.Collections.Generic;

namespace News_Reader.Service.Contracts
{
    public class CategoryDTO : BaseEntityDTO
    {
        public string Name { get; set; }
        public IEnumerable<RSSFeedDTO> RssFeeds { get; set; }
    }
}

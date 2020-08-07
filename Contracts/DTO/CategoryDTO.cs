using Contracts;
using System.Collections.Generic;

namespace Contracts
{
    public class CategoryDTO : BaseEntityDTO
    {
        /// <summary>
        /// The category name
        /// </summary>
        /// <example>Technology</example>
        public string Name { get; set; }
        /// <summary>
        /// A list of feeds under that category
        /// </summary>
        /// <example>Technology</example>
        public IEnumerable<RSSFeedDTO> RssFeeds { get; set; }
    }
}

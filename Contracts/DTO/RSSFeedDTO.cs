namespace Contracts
{
    public class RSSFeedDTO : BaseEntityDTO
    {
        /// <summary>
        /// The category name
        /// </summary>
        /// <example>Ny Times</example>
        public string Name { get; set; }
        /// <summary>
        /// The category name
        /// </summary>
        /// <example>https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml</example>
        public string XMLFileAddress { get; set; }
        /// <summary>
        /// The feed category
        /// </summary>
        public CategoryDTO Category { get; set; }
    }
}

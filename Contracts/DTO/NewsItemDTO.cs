using System;

namespace Contracts
{
    public class NewsItemDTO
    {
        public string Identifier { get; set; }
        public string Source { get; set; }
        public string Title { get; set; }
        public string Link { get; set; }
        public string Summary { get; set; }
        public DateTimeOffset PublishDate { get; set; }
    }
}

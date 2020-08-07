using System;
using System.Collections.Generic;

namespace Contracts
{
    public class NewsQueryDTO
    {
        public DateTimeOffset OldestPublishDate { get; set; }
        public IEnumerable<NewsItemDTO> NewsItems { get; set; }
    }
}

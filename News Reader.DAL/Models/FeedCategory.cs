using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace News_Reader.DAL.Models
{
    public class FeedCategory : BaseModel
    {
        [Required]
        public string Name { get; set; }
        public ICollection<RSSFeed> Feeds { get; set; }
    }
}

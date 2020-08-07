using System.ComponentModel.DataAnnotations.Schema;

namespace News_Reader.DAL.Models
{
    public class RSSFeed : BaseModel
    {
        public string Name { get; set; }
        public string XMLFileAddress { get; set; }
        [ForeignKey("FeedCategory")]
        public long? CategoryId { get; set; }
        public FeedCategory Category { get; set; }
    }
}

using System.ComponentModel.DataAnnotations;

namespace News_Reader.DAL.Models
{
    public class BaseModel : IModel
    {
        [Required]
        [Key]
        public long Id { get; set; }
    }
}

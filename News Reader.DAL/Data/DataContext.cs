using Microsoft.EntityFrameworkCore;
using News_Reader.DAL.Models;

namespace News_Reader.DAL.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<FeedCategory> FeedCategories { get; set; }
        public DbSet<RSSFeed> RSSFeeds { get; set; }
    }
}

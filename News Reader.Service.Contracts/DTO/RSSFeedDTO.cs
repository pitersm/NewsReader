namespace News_Reader.Service.Contracts
{
    public class RSSFeedDTO : BaseEntityDTO
    {
        public string Name { get; set; }
        public string XMLFileAddress { get; set; }
        public CategoryDTO Category { get; set; }
    }
}

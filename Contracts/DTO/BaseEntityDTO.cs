namespace Contracts
{
    public class BaseEntityDTO : IBaseEntityDTO
    {
        /// <summary>
        /// The entitie's primary key ID
        /// </summary>
        public long? Id { get; set; }
    }
}

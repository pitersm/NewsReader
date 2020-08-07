using System.Collections.Generic;
using System.Threading.Tasks;

namespace News_Reader.Service.Contracts
{
    public interface IBaseEntityService<EntityDTO> where EntityDTO : IBaseEntityDTO
    {
        Task<List<EntityDTO>> List();
        Task<EntityDTO> Get(long id);
        Task<EntityDTO> Create(EntityDTO dto);
        Task Update(EntityDTO dto);
        Task Delete(long id);
    }
}

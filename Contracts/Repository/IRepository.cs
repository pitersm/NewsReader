using System.Linq;
using System.Threading.Tasks;

namespace Contracts
{
    public interface IRepository<TEntity> where TEntity : class
    {
        IQueryable<TEntity> List(string navigation = null);
        Task<TEntity> Get(long id, string navigation = null);
        Task<TEntity> Save(TEntity entity);
        Task Update(TEntity entity);
        Task Delete(long id);
    }
}

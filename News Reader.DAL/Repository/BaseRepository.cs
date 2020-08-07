using Microsoft.EntityFrameworkCore;
using News_Reader.DAL.Data;
using News_Reader.DAL.Models;
using Contracts;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace News_Reader.DAL.Repository
{
    public class BaseRepository<TEntity> : IRepository<TEntity> where TEntity : class, IModel
    {
        private readonly DataContext _context;
        private DbSet<TEntity> entities;

        public BaseRepository(DataContext context)
        {
            _context = context;
            entities = context.Set<TEntity>();
        }

        public Task<TEntity> Get(long id, string navigation = null)
        {
            var query = entities.Where(a => a.Id == id);
            if (!string.IsNullOrEmpty(navigation))
            {
                query = query.Include(navigation);
            }

            return query.AsNoTracking().FirstOrDefaultAsync();
        }

        public IQueryable<TEntity> List(string navigation = null)
        {
            var query = entities.Select(a => a);
            if (!string.IsNullOrEmpty(navigation))
            {
                query = query.Include(navigation);
            };
            return query;
        }

        public async Task<TEntity> Save(TEntity entity)
        {
            await entities.AddAsync(entity);
            await _context.SaveChangesAsync();

            return entity;
        }

        public async Task Update(TEntity entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException(nameof(TEntity));
            }
            entities.Update(entity);
            await _context.SaveChangesAsync();
        }

        public async Task Delete(long id)
        {
            TEntity entity = await Get(id);
            entities.Remove(entity);
            await _context.SaveChangesAsync();
        }
    }
}

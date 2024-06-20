using Microsoft.EntityFrameworkCore;
using ToDoApp.Repository.Data;
using ToDoApp.Repository.Data.Models;
using ToDoApp.Repository.Interfaces;

namespace ToDoApp.Repository
{
    public class StatusRepo : IStatusRepo
    {
        private ToDoAppContext _dbContext;

        public StatusRepo(ToDoAppContext dbContext)
        {
            _dbContext = dbContext;
        }
        public void Add(Status status)
        {
            _dbContext.Add(status);
            _dbContext.SaveChangesAsync();
        }

        public Task<List<Status>> GetStatuses()
        {
            return _dbContext.Statuses.ToListAsync();
        }
    }
}

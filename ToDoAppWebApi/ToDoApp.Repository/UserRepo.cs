using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;
using ToDoApp.Repository.Data;
using ToDoApp.Repository.Data.Models;
using ToDoApp.Repository.Interfaces;

namespace ToDoApp.Repository
{
    public class UserRepo : IUserRepo
    {
        private ToDoAppContext _dbContext;

        public UserRepo(ToDoAppContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<User> AddUser(User user)
        {
            var userEntry =  await _dbContext.Users.AddAsync(user);
            await _dbContext.SaveChangesAsync();
            return userEntry.Entity;
        }

        public async Task<User?> GetUser(string username)
        {
             return await _dbContext.Users.FirstOrDefaultAsync(user => user.Username == username);
        }
    }
}

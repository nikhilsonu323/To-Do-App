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

        public User AddUser(User user)
        {
            var userEntry =  _dbContext.Users.Add(user);
            _dbContext.SaveChanges();
            return userEntry.Entity;
        }

        public User? GetUser(string username)
        {
             return _dbContext.Users.FirstOrDefault(user => user.Username == username);
        }
    }
}

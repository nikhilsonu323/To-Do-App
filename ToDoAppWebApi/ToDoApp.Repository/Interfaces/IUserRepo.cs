using ToDoApp.Repository.Data.Models;

namespace ToDoApp.Repository.Interfaces
{
    public interface IUserRepo
    {
        Task<User> AddUser(User user);
        Task<User?> GetUser(String username);
    }
}

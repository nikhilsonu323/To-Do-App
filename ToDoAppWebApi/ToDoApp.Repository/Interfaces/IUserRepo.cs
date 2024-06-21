using ToDoApp.Repository.Data.Models;

namespace ToDoApp.Repository.Interfaces
{
    public interface IUserRepo
    {
        User AddUser(User user);
        User? GetUser(String username);
    }
}

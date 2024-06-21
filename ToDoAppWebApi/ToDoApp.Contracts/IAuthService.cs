using ToDoApp.Concerns;

namespace ToDoApp.Contracts
{
    public interface IAuthService
    {
        public string? Login(UserDTO loginUser);

        public bool Register(UserDTO loginUser);

    }
}

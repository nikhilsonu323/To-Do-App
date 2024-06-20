using ToDoApp.Concerns;

namespace ToDoApp.Contracts
{
    public interface IAuthService
    {
        public Task<AuthResponse?> Login(UserDTO loginUser);

        public Task<AuthResponse?> Register(UserDTO loginUser);

    }
}

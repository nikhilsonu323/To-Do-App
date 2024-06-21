using ToDoApp.Concerns;
using ToDoApp.Contracts;
using ToDoApp.Repository.Interfaces;
using ToDoApp.Services.Utilities;

namespace ToDoApp.Services
{
    public class AuthService : IAuthService
    {

        private readonly IUserRepo _userRepo;
        private readonly IAuthHelper _authHelper;

        public AuthService(IUserRepo userRepo, IAuthHelper authHelper)
        {
            _userRepo = userRepo;
            _authHelper = authHelper;
        }

        public string? Login(UserDTO loginUser)
        {
            var user = _userRepo.GetUser(loginUser.Username);
            if (user == null)
            {
                return null;
            }
            else
            {
                if (!_authHelper.Verify(user.Password, loginUser.Password))
                {
                    return null;
                }
                return _authHelper.GetToken(user.UserId);
            }
        }
        public bool Register(UserDTO userDTO)
        {
            var user = _userRepo.GetUser(userDTO.Username);
            if (user != null)
            {
                return false;
            }
            var userToAdd = Mapper.MapToUser(userDTO);
            userToAdd.Password = _authHelper.Hash(userDTO.Password);

            _userRepo.AddUser(userToAdd);
            return true;
        }
    }
}

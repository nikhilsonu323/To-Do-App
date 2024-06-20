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

        public async Task<AuthResponse?> Login(UserDTO loginUser)
        {
            var user = await _userRepo.GetUser(loginUser.Username);
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
                return GenerateAuthResponse(user.UserId);
            }
        }
        public async Task<AuthResponse?> Register(UserDTO userDTO)
        {
            var user = await _userRepo.GetUser(userDTO.Username);
            if (user != null)
            {
                return null;
            }
            var userToAdd = Mapper.MapToUser(userDTO);
            userToAdd.Password = _authHelper.Hash(userDTO.Password);

            var addedUser = await _userRepo.AddUser(userToAdd);

            return GenerateAuthResponse(addedUser.UserId);
        }

        private AuthResponse GenerateAuthResponse(int userId)
        {
            var expiresAt = DateTime.Now.AddDays(1);
            TimeSpan timeDifference = expiresAt - DateTime.Now;

            return new AuthResponse()
            {
                Token = _authHelper.GetToken(userId, expiresAt),
                ExpiresIn = timeDifference.TotalSeconds
            };
        }
    }
}

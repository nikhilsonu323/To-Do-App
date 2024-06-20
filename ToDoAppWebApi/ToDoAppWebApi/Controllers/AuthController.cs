using Microsoft.AspNetCore.Mvc;
using ToDoApp.Concerns;
using ToDoApp.Contracts;

namespace ToDoAppWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(UserDTO loginDetails)
        {
            var result = await _authService.Login(loginDetails);
            if (result == null)
            {
                return BadRequest(new
                {
                    error = new { message = "Invalid_Credentials" }
                });
            }
            return Ok(result);
        }

        [HttpPost("signup")]
        public async Task<IActionResult> SignUp(UserDTO userDetails)
        {
            var result = await _authService.Register(userDetails);
            if (result == null)
            {
                return Unauthorized(new
                {
                    error = new { message = "User_Exists" }
                });
            }
            return Ok(result);
        }

    }
}
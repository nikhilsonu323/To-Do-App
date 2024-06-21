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
        public IActionResult Login(UserDTO loginDetails)
        {
            var token = _authService.Login(loginDetails);
            if (token == null)
            {
                return BadRequest(new
                {
                    error = new { message = "Invalid_Credentials" }
                });
            }
            return Ok(new { token });
        }

        [HttpPost("signup")]
        public IActionResult SignUp(UserDTO userDetails)
        {
            var result = _authService.Register(userDetails);
            if (!result)
            {
                return Unauthorized(new
                {
                    error = new { message = "User_Exists" }
                });
            }
            return Created();
        }

    }
}
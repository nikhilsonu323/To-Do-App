using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using ToDoApp.Concerns;
using ToDoApp.Contracts;

namespace ToDoAppWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class TasksController : ControllerBase
    {
        private ITaskService _taskService;

        public TasksController(ITaskService taskService)
        {
            _taskService = taskService;
        }


        [HttpPost("Add")]
        public IActionResult AddTask([FromBody] TaskDTO task)
        {
            var userId = GetUserId();
            if (userId == null) { return BadRequest(); }
            _taskService.AddTask(task, userId.Value);
            return Created();
        }

        [HttpPost("Update")]
        public async Task<IActionResult> UpdateTask([FromBody] TaskDTO task)
        {
            var userId = GetUserId();
            if (userId == null) { return BadRequest(); }
            var isUpdated = await _taskService.UpdateTask(task, userId.Value);
            if (!isUpdated) {
                return BadRequest(new
                {
                    error = "Task Id Doesn't Exist"
                });
            }
            return Created();
        }

        [HttpGet]
        public async Task<IActionResult> GetTasks([FromQuery] DateTime? date, [FromQuery] int? statusId)
        {
            var userId = GetUserId();
            if (userId == null) { return BadRequest(); }
            var tasks = await _taskService.GetTasks(userId.Value, date, statusId);
            return Ok(tasks);
        }

        [HttpGet("All")]
        public async Task<IActionResult> GetAllTasks()
        {
            var userId = GetUserId();
            if (userId == null) { return BadRequest(); }
            var tasks = await _taskService.GetAllTasks(userId.Value);
            return Ok(tasks);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetTask([FromRoute] int taskId)
        {
            var userId = GetUserId();
            if (userId == null) { return BadRequest(); }
            var tasks = await _taskService.GetTask(taskId, userId.Value);
            return Ok(tasks);
        }

        private int? GetUserId() 
        {
            var userIdString = User.Claims.FirstOrDefault(claim => claim.Type == ClaimTypes.NameIdentifier)?.Value;
            int userId;
            if (userIdString == null || !int.TryParse(userIdString, out userId))
            {
                return null;
            }
            return userId;
        }
    }
}

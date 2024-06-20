using ToDoApp.Concerns;
using ToDoApp.Contracts;
using ToDoApp.Repository.Interfaces;
using ToDoApp.Services.Utilities;

namespace ToDoApp.Services
{
    public class TaskService : ITaskService
    {
        private ITaskRepo _taskRepo;

        public TaskService(ITaskRepo taskRepo)
        {
            _taskRepo = taskRepo;
        }

        public void AddTask(TaskDTO task, int userId)
        {
            _taskRepo.AddTask(Mapper.MapToTask(task, userId));
        }

        public async Task<TaskDTO?> GetTask(int taskId, int userId)
        {
            var task = await _taskRepo.GetTask(taskId);
            if (task == null || task.UserId != userId) { return null; }
            return Mapper.MapToTaskDTO(task);
        }

        public async Task<List<TaskDTO>> GetTasks(int userId, DateTime? date, int? statusId)
        {
            var tasks = await _taskRepo.GetTasks(userId, date, statusId);
            return Mapper.MapToTaskDTO(tasks);
        }

        public async Task<List<TaskDTO>> GetAllTasks(int userId)
        {
            var tasks = await _taskRepo.GetAll(userId);
            return Mapper.MapToTaskDTO(tasks);
        }

        public Task<bool> UpdateTask(TaskDTO task, int userId)
        {
            return _taskRepo.UpdateTask(Mapper.MapToTask(task, userId));
        }

        public Task<bool> DeleteTask(int taskId, int userId)
        {
            return _taskRepo.DeleteTask(taskId, userId);
        }
    }
}

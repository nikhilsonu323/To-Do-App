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
            task.CreatedOn = DateTime.Now;
            _taskRepo.AddTask(Mapper.MapToTask(task, userId));
        }

        public async Task<TaskDTO?> GetTask(int taskId, int userId)
        {
            var task = await _taskRepo.GetTask(taskId, userId);
            if(task == null) { return null; }
            return Mapper.MapToTaskDTO(task);
        }

        public async Task<List<TaskDTO>> GetTasks(int userId, DateTime? createdOn, DateTime? completedOn, int? statusId)
        {
            var tasks = await _taskRepo.GetTasks(userId, createdOn, completedOn, statusId);
            return Mapper.MapToTaskDTO(tasks);
        }

        public async Task<List<TaskDTO>> GetAllTasks(int userId)
        {
            var tasks = await _taskRepo.GetAll(userId);
            return Mapper.MapToTaskDTO(tasks);
        }

        public Task<bool> UpdateTask(TaskDTO task, int userId)
        {
            if(task.StatusId == (int)Statuses.Completed)
            {
                task.CompletedOn = DateTime.Now;
            }
            return _taskRepo.UpdateTask(Mapper.MapToTask(task, userId));
        }

        public Task<bool> DeleteTask(int taskId, int userId)
        {
            return _taskRepo.DeleteTask(taskId, userId);
        }

        public void DeleteAll(int userId, DateTime? date)
        {
            _taskRepo.DeleteAll(userId, date);
        }

    }
}

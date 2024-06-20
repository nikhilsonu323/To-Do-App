using ToDoApp.Concerns;

namespace ToDoApp.Contracts
{
    public interface ITaskService
    {
        void AddTask(TaskDTO task, int userId);

        Task<bool> UpdateTask(TaskDTO task, int userId);

        Task<TaskDTO?> GetTask(int taskId, int userId);

        Task<List<TaskDTO>> GetTasks(int userId, DateTime? date, int? statusId);

        Task<List<TaskDTO>> GetAllTasks(int userId);

        Task<bool> DeleteTask(int taskId, int userId);
    }
}

using ToDoApp.Repository.Data.Models;

namespace ToDoApp.Repository.Interfaces
{
    public interface ITaskRepo
    {
        void AddTask(ToDoTask task);
        Task<bool> UpdateTask(ToDoTask task);
        Task<ToDoTask?> GetTask(int taskId, int userId);        
        Task<List<ToDoTask>> GetTasks(int userId, DateTime? date, int? statusId);
        Task<List<ToDoTask>> GetAll(int userId);
        Task<bool> DeleteTask(int taskId, int userId);
        void DeleteAll(int userId, DateTime? date);
    }
}

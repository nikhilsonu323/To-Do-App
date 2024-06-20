using ToDoApp.Repository.Data.Models;

namespace ToDoApp.Repository.Interfaces
{
    public interface IStatusRepo
    {
        void Add(Status status);
        Task<List<Status>> GetStatuses();
    }
}

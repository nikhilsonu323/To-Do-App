using ToDoApp.Concerns;

namespace ToDoApp.Contracts
{
    public interface IStatusService
    {
        void Add(StatusDTO status);
        Task<List<StatusDTO>> GetStatuses();   
    }
}

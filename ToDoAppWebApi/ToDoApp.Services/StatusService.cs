using ToDoApp.Concerns;
using ToDoApp.Contracts;
using ToDoApp.Repository.Interfaces;
using ToDoApp.Services.Utilities;

namespace ToDoApp.Services
{
    public class StatusService : IStatusService
    {
        private IStatusRepo _statusRepo;

        public StatusService(IStatusRepo statusRepo)
        {
            _statusRepo = statusRepo;
        }

        public void Add(StatusDTO status)
        { 
            _statusRepo.Add(Mapper.MapToStatus(status));
        }

        public async Task<List<StatusDTO>> GetStatuses()
        {
            var statuses =  await _statusRepo.GetStatuses();
            return Mapper.MapToStatusDTO(statuses);
        }
    }
}

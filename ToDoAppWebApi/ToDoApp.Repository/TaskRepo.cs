﻿using Microsoft.EntityFrameworkCore;
using ToDoApp.Repository.Data;
using ToDoApp.Repository.Data.Models;
using ToDoApp.Repository.Interfaces;

namespace ToDoApp.Repository
{
    public class TaskRepo : ITaskRepo
    {
        private ToDoAppContext _dbContext;

        public TaskRepo(ToDoAppContext dbContext)
        {
            _dbContext = dbContext;
        }

        public void AddTask(ToDoTask task)
        {
            _dbContext.Tasks.Add(task);
            _dbContext.SaveChanges();
        }

        public async Task<bool> UpdateTask(ToDoTask task)
        {
            var existingTask = await GetTask(task.TaskId, task.UserId);
            if (existingTask == null) { return false; }

            _dbContext.Entry(existingTask).State = EntityState.Detached;

            _dbContext.Tasks.Update(task);
            await _dbContext.SaveChangesAsync();

            return true;
        }

        public async Task<ToDoTask?> GetTask(int taskId, int userId)
        {
            return await _dbContext.Tasks.Include(task => task.Status)
                .FirstOrDefaultAsync(task => task.TaskId == taskId && task.UserId == userId);
        }

        public async Task<List<ToDoTask>> GetTasks(int userId, DateTime? createdOn, DateTime? completedOn, int? statusId, string? sortBy = null)
        {
            var query = _dbContext.Tasks.Include(task => task.Status)
                    .Where(task => task.UserId == userId &&
                    (createdOn == null || createdOn.Value.Date == task.CreatedOn.Date) &&
                    (completedOn == null || (task.CompletedOn != null && task.CompletedOn.Value.Date == completedOn.Value.Date)) &&
                    (statusId == null || statusId.Value == task.StatusId));
            switch (sortBy)
            {
                case "createdOn":
                    query = query.OrderByDescending(task => task.CreatedOn);
                    break;

                case "completedOn":
                    query = query.OrderByDescending(task => task.CompletedOn);
                    break;
            }
            return await query.ToListAsync();            
        }

        public async Task<List<ToDoTask>> GetAll(int userId)
        {
            return await _dbContext.Tasks.Include(task => task.Status)
                .Where(task => task.UserId == userId)
                .OrderBy(task => task.StatusId)
                .OrderBy(task => task.CreatedOn)
                .ToListAsync();
        }

        public async Task<bool> DeleteTask(int taskId, int userId)
        {
            var taskToBeDeleted = _dbContext.Tasks.FirstOrDefault(task => task.TaskId == taskId && task.UserId == userId);
            if (taskToBeDeleted == null) { return false; }
            var deleted = _dbContext.Tasks.Remove(taskToBeDeleted);
            await _dbContext.SaveChangesAsync();
            return true;
        }

        public void DeleteAll(int userId, DateTime? date)
        {
            var tasksToBeDeleted = _dbContext.Tasks
                            .Where(task => task.UserId == userId &&
                             (date == null || task.CreatedOn.Date == date.Value.Date));
            var isExists = tasksToBeDeleted.Any();
            if (!tasksToBeDeleted.Any()) { return; }
            _dbContext.Tasks.RemoveRange(tasksToBeDeleted);
            _dbContext.SaveChanges();
        }
    }
}

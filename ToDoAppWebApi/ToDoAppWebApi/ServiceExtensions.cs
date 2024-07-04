﻿using ToDoApp.Contracts;
using ToDoApp.Repository;
using ToDoApp.Repository.Interfaces;
using ToDoApp.Services;
using ToDoApp.Services.Utilities;
using ToDoAppWebApi.Middlewares;

namespace ToDoAppWebApi
{
    public static class ServiceExtensions
    {
        public static IServiceCollection AddDependencies(this IServiceCollection services)
        {
            services.AddTransient<ExceptionHandlingMiddleware>();

            services.AddTransient<IAuthService, AuthService>();
            services.AddTransient<ITaskService, TaskService>();
            services.AddTransient<IStatusService, StatusService>();
            services.AddTransient<IAuthHelper, AuthHelper>();

            services.AddScoped<IUserRepo, UserRepo>();
            services.AddScoped<ITaskRepo, TaskRepo>();
            services.AddScoped<IStatusRepo, StatusRepo>();

            return services;
        }
    }
}

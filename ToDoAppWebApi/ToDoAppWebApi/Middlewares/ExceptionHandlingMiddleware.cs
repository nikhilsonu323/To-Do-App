﻿
using Serilog;
using System.Security.Claims;

namespace ToDoAppWebApi.Middlewares
{
    public class ExceptionHandlingMiddleware : IMiddleware
    {
        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
        {
            try
            {
                await next.Invoke(context);
            }
            catch(Exception exception)
            {
                context.Response.StatusCode = 500;
                await context.Response.WriteAsync(exception.Message);
                LogError(exception, context);
            }
        }

        private void LogError(Exception? exception, HttpContext content)
        {
            string errorMessage = "";
            while (exception != null)
            {
                errorMessage += exception.Message + "\n";
                exception = exception.InnerException;
            }
            var userId = GetUserId(content);

            var errorLog = new
            {
                message = errorMessage,
                user = userId,
                endPoint = content.GetEndpoint()?.DisplayName
            };

            Log.Error("{@errorLog}", errorLog);
        }
        private string? GetUserId(HttpContext content)
        {
            var userIdString = content.User.Claims.FirstOrDefault(claim => claim.Type == ClaimTypes.NameIdentifier)?.Value;
            return userIdString;
        }
    }
}

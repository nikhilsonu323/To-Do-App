using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Serilog;
using System.Security.Claims;
using ToDoApp.Repository.Data.Models;

namespace ToDoAppWebApi.Filters
{
    public class CustomExceptionFilterAttribute : Attribute, IExceptionFilter
    {
        public void OnException(ExceptionContext context)
        {
            string errorMessage = "";
            var exception = context.Exception;
            while(exception != null)
            {
                errorMessage += exception.Message + "\n";
                exception = exception.InnerException;
            }
            var userId = GetUserId(context.HttpContext);

            var errorLog = new
            {
                message = errorMessage,
                user = userId,
                endPoint = context.HttpContext.GetEndpoint()?.DisplayName
            };

            Log.Error(errorMessage);
            

            context.Result = new BadRequestObjectResult(new
            {
                message = context.Exception.Message,
            });
        }

        private string? GetUserId(HttpContext content)
        {
            var userIdString = content.User.Claims.FirstOrDefault(claim => claim.Type == ClaimTypes.NameIdentifier)?.Value;
            return userIdString;
        }
    }
}

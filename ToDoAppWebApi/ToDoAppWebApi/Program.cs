using FluentValidation.AspNetCore;
using FluentValidation;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using ToDoApp.Repository.Data;
using ToDoAppWebApi;
using ToDoAppWebApi.Validators;

internal class Program
{
    private static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Add services to the container.

        builder.Services.AddControllers();
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        builder.Services.AddDbContext<ToDoAppContext>(opt =>
        {
            Console.WriteLine(builder.Configuration.GetConnectionString("ToDoAppConnection"));
            opt.UseSqlServer(builder.Configuration.GetConnectionString("ToDoAppConnection"));
        });

        builder.Services.AddAuthentication(opt =>
        {
            opt.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            opt.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        }).AddJwtBearer(opt =>
        {
            opt.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = false,
                ValidateAudience = false,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JWT:Key"]!))
            };
        });


        builder.Services.AddFluentValidationAutoValidation();
        builder.Services.AddValidatorsFromAssemblyContaining<TaskValidator>();

        builder.Services.AddDependencies();


        builder.Services.AddCors(opt =>
        {
            opt.AddPolicy("AllowAll", policy =>
            {
                policy.WithOrigins("https://feedback.d14fnc79dak6e4.amplifyapp.com/")
                      .AllowAnyMethod()
                      .AllowAnyHeader();
            });
        });

        var app = builder.Build();

        app.UseCors("AllowAll");

        // Configure the HTTP request pipeline.
        
        app.UseSwagger();
        app.UseSwaggerUI();
        

        app.UseHttpsRedirection();

        app.UseAuthentication();
        app.UseAuthorization();

        app.MapControllers();

        app.Run();
    }
}
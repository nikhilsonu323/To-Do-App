﻿namespace ToDoApp.Repository.Data.Models;

public partial class User
{
    public int UserId { get; set; }

    public string Username { get; set; } = null!;

    public string Password { get; set; } = null!;

    public virtual ICollection<ToDoTask> Tasks { get; set; } = new List<ToDoTask>();
}

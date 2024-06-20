using Microsoft.EntityFrameworkCore;
using ToDoApp.Repository.Data.Models;

namespace ToDoApp.Repository.Data;

public partial class ToDoAppContext : DbContext
{
    public ToDoAppContext()
    {
    }

    public ToDoAppContext(DbContextOptions<ToDoAppContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Status> Statuses { get; set; }

    public virtual DbSet<ToDoTask> Tasks { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Status>(entity =>
        {
            entity.HasKey(e => e.StatusId).HasName("PK__Statuses__C8EE20637A0EE24D");

            entity.Property(e => e.StatusName).HasMaxLength(50);
        });

        modelBuilder.Entity<ToDoTask>(entity =>
        {
            entity.HasKey(e => e.TaskId).HasName("PK__Tasks__7C6949B15B32887C");

            entity.Property(e => e.CompletedOn).HasColumnType("datetime");
            entity.Property(e => e.CreatedOn).HasColumnType("datetime");

            entity.HasOne(d => d.Status).WithMany(p => p.Tasks)
                .HasForeignKey(d => d.StatusId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Tasks__StatusId__3D5E1FD2");

            entity.HasOne(d => d.User).WithMany(p => p.Tasks)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK__Tasks__UserId__3C69FB99");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PK__Users__1788CC4CAF524A19");

            entity.HasIndex(e => e.Username, "UQ__Users__536C85E4CA275780").IsUnique();

            entity.Property(e => e.Username).HasMaxLength(100);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}

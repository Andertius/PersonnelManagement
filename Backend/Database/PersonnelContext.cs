using Backend.Models.Entities;

using Microsoft.EntityFrameworkCore;

namespace Backend.Database;

public class PersonnelContext : DbContext
{
    public PersonnelContext(DbContextOptions<PersonnelContext> options)
        : base(options)
    {
    }

    public DbSet<Personnel> Personnel { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Personnel>(x =>
        {
            x.Property(person => person.Job).IsRequired();
            x.Property(person => person.LastName).IsRequired();
            x.Property(person => person.Salary).HasColumnType("decimal(19,4)");
        });
    }
}

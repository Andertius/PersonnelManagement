using System;

namespace Backend.Models.Entities;

public class Personnel
{
    public Personnel(
        Guid id,
        string lastName,
        string job,
        decimal salary,
        DateTime dateOfBirth)
    {
        Id = id;
        LastName = lastName;
        Job = job;
        Salary = salary;
        DateOfBirth = dateOfBirth;
    }

    public Guid Id { get; set; }

    public string LastName { get; set; }

    public string Job { get; set; }

    public decimal Salary { get; set; }

    public DateTime DateOfBirth { get; set; }
}

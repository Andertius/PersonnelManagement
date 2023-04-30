using System;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Backend.Models.Requests;

public class AddPersonnelRequest
{
    [JsonPropertyName("lastName"), Required]
    public string? LastName { get; init; }

    [JsonPropertyName("job"), Required]
    public string? Job { get; init; }

    [JsonPropertyName("salary"), Required]
    public decimal? Salary { get; init; }

    [JsonPropertyName("dateOfBirth"), Required]
    public DateTime? DateOfBirth { get; init; }
}

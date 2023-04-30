using System;
using System.Collections.Generic;

namespace Backend.Models.Responses;

public class AddPersonnelResponse
{
    public AddPersonnelResponse(Guid id)
    {
        Id = id;
        Errors = Array.Empty<string>();
    }

    public AddPersonnelResponse(ICollection<string> errors)
    {
        Errors = errors;
    }

    public ICollection<string> Errors { get; set; }

    public Guid Id { get; set; }
}

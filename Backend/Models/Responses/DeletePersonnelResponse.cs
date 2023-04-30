using System;
using System.Collections.Generic;

namespace Backend.Models.Responses;

public class DeletePersonnelResponse
{
    public DeletePersonnelResponse()
    {
        Errors = Array.Empty<string>();
    }

    public DeletePersonnelResponse(ICollection<string> errors)
    {
        Errors = errors;
    }

    public ICollection<string> Errors { get; set; }
}

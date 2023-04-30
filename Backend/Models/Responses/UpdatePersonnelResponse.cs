using System;
using System.Collections.Generic;

namespace Backend.Models.Responses;

public class UpdatePersonnelResponse
{
    public UpdatePersonnelResponse()
    {
        Errors = Array.Empty<string>();
    }

    public UpdatePersonnelResponse(ICollection<string> errors)
    {
        Errors = errors;
    }

    public ICollection<string> Errors { get; set; }
}

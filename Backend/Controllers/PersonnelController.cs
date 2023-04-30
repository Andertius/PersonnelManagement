using System;
using System.Threading.Tasks;

using Backend.Models.Requests;
using Backend.Services;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[ApiController]
[Route("api/personnel")]
[AllowAnonymous]
public class PersonnelController : ControllerBase
{
    private readonly IPersonnelService _personnelService;

    public PersonnelController(IPersonnelService personnelService)
    {
        _personnelService = personnelService;
    }

    [HttpGet]
    public async Task<IActionResult> GetPersonnelById([FromQuery] string? name = null)
    {
        var response = await _personnelService.GetPersonnelByName(name);

        return Ok(response);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetPersonnelById([FromRoute] Guid id)
    {
        var response = await _personnelService.GetPersonnelById(id);

        return Ok(response);
    }

    [HttpPost]
    public async Task<IActionResult> AddPersonnel([FromBody] AddPersonnelRequest request)
    {
        var response = await _personnelService.AddPersonnel(request);

        return Ok(response);
    }

    [HttpPut]
    public async Task<IActionResult> UpdatePersonnel([FromBody] UpdatePersonnelRequest request)
    {
        var response = await _personnelService.UpdatePersonnel(request);

        return Ok(response);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeletePersonnel([FromRoute] Guid id)
    {
        var response = await _personnelService.DeletePersonnel(id);

        return Ok(response);
    }
}

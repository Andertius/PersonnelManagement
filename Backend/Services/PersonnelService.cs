using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Backend.Database;
using Backend.Models.Entities;
using Backend.Models.Requests;
using Backend.Models.Responses;

using Microsoft.EntityFrameworkCore;

namespace Backend.Services;

public interface IPersonnelService
{
    Task<Personnel?> GetPersonnelById(Guid id);
    Task<ICollection<Personnel>> GetPersonnelByName(string? name);
    Task<AddPersonnelResponse> AddPersonnel(AddPersonnelRequest request);
    Task<UpdatePersonnelResponse> UpdatePersonnel(UpdatePersonnelRequest request);
    Task<DeletePersonnelResponse> DeletePersonnel(Guid id);
}

public class PersonnelService : IPersonnelService
{
    private readonly PersonnelContext _context;

    public PersonnelService(PersonnelContext context)
    {
        _context = context;
    }

    public async Task<Personnel?> GetPersonnelById(Guid id)
    {
        return await _context.Personnel.FindAsync(id);
    }

    public async Task<ICollection<Personnel>> GetPersonnelByName(string? name)
    {
        return await _context.Personnel
            .Where(x => x.LastName.Contains(name ?? ""))
            .ToListAsync();
    }

    public async Task<AddPersonnelResponse> AddPersonnel(AddPersonnelRequest request)
    {
        var entity = new Personnel(
            Guid.NewGuid(),
            request.LastName!,
            request.Job!,
            request.Salary!.Value,
            request.DateOfBirth!.Value);

        _context.Add(entity);
        await _context.SaveChangesAsync();

        return new AddPersonnelResponse(entity.Id);
    }

    public async Task<UpdatePersonnelResponse> UpdatePersonnel(UpdatePersonnelRequest request)
    {
        var entity = await _context.Personnel.FindAsync(request.Id);

        if (entity is null)
        {
            return new UpdatePersonnelResponse(new[] { "Entity with id '{request.Id}' could not be found." });
        }

        entity.DateOfBirth = request.DateOfBirth!.Value;
        entity.Salary = request.Salary!.Value;
        entity.LastName = request.LastName!;
        entity.Job = request.Job!;

        _context.Update(entity);
        await _context.SaveChangesAsync();

        return new UpdatePersonnelResponse();
    }

    public async Task<DeletePersonnelResponse> DeletePersonnel(Guid id)
    {
        var entity = await _context.Personnel.FindAsync(id);

        if (entity is null)
        {
            return new DeletePersonnelResponse(new[] { "Entity with id '{request.Id}' could not be found." });
        }

        _context.Remove(entity);
        await _context.SaveChangesAsync();

        return new DeletePersonnelResponse();
    }
}

using ContactManager.Models;
using CsvHelper;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using System.Globalization;
using ContactManager.Maps;
using Microsoft.EntityFrameworkCore;

namespace ContactManager.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ContactController : ControllerBase
    {
        private readonly ContactContext _context;
        private readonly ILogger<ContactController> _logger;

        public ContactController(ContactContext context, ILogger<ContactController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpGet]
        public async Task<IEnumerable<Contact>> GetContacts()
        {
            return _context.Contacts.ToList();
        }

        [HttpPost]
        public async Task<IActionResult> UploadContacts(IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest("File is empty.");
            }

            using (var reader = new StreamReader(file.OpenReadStream()))
            using (var csv = new CsvReader(reader, CultureInfo.InvariantCulture))
            {
                csv.Context.RegisterClassMap<ContactMap>();

                var contacts = csv.GetRecords<Contact>().ToList();

                await _context.Contacts.AddRangeAsync(contacts);
                await _context.SaveChangesAsync();
            }

            return Ok();
        }

        [HttpPatch("{id:int}")]
        public IActionResult UpdateContact([FromRoute] int id, [FromBody] JsonPatchDocument<Contact> patchDoc)
        {
            if (patchDoc == null)
            {
                return BadRequest("Patch document is empty.");
            }

            Contact? dancer = _context.Contacts.Find(id);
            if (dancer == null)
            {
                return NotFound($"No dancer with id {id}");
            }

            patchDoc.ApplyTo(dancer, ModelState);

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (!TryValidateModel(dancer))
            {
                return BadRequest(ModelState);
            }

            try
            {
                _context.Update(dancer);
                _context.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Contacts.Any(e => e.Id == id))
                {
                    return NotFound("DB save error");
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

    }
}

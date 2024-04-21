using ContactManager.Models;
using CsvHelper.Configuration;

namespace ContactManager.Maps
{
    public class ContactMap : ClassMap<Contact>
    {
        public ContactMap()
        {
            Map(m => m.Name).Name("Name");
            Map(m => m.DateOfBirth).Name("DateOfBirth");
            Map(m => m.Married).Name("Married");
            Map(m => m.Phone).Name("Phone");
            Map(m => m.Salary).Name("Salary");
        }
    }

}

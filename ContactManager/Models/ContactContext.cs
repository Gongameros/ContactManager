using ContactManager.Configurations;
using Microsoft.EntityFrameworkCore;

namespace ContactManager.Models
{
    public class ContactContext : DbContext
    {
        public DbSet<Contact> Contacts { get; set; }

        public ContactContext(DbContextOptions options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfiguration(new ContactConfiguration());
        }
    }
}

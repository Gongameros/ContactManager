using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ContactManager.Models;

namespace ContactManager.Configurations
{
    public class ContactConfiguration : IEntityTypeConfiguration<Contact>
    {
        public void Configure(EntityTypeBuilder<Contact> builder)
        {
            builder.HasKey(e => e.Id);

            builder.Property(e => e.DateOfBirth)
                .HasConversion(
                    v => v.ToDateTime(TimeOnly.MinValue),  // Convert DateOnly to DateTime
                    v => DateOnly.FromDateTime(v));        // Convert DateTime to DateOnly

            builder.Property(e => e.Id)
                .ValueGeneratedOnAdd();
        }
    }
}

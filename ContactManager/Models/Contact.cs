using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ContactManager.Models
{
    public class Contact
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        [NotMapped]
        public DateOnly DateOfBirth { get; set; }

        [Required]
        public bool Married { get; set; }

        [Required]
        [Phone]
        public string Phone { get; set; }
        
        [Required]
        public int Salary { get; set; }

    }
}

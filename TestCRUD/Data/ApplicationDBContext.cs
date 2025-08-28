using Microsoft.EntityFrameworkCore;
using TestCRUD.Models.Entities;

namespace TestCRUD.Data
{
    public class ApplicationDBContext : DbContext
    {
        public ApplicationDBContext(DbContextOptions<ApplicationDBContext> options) : base(options)
        {
            
        }

        public DbSet<Employee> Employees { get; set; }
    }
}

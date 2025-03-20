using Microsoft.EntityFrameworkCore;
using ShopAPI.Models;

namespace ShopAPI.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<Product> Products { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<RepairService> RepairServices { get; set; }
        public DbSet<RepairOrder> RepairOrders { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            
            // Configure entities to support multiple languages
            modelBuilder.Entity<Product>()
                .Property(p => p.NamePtBr).IsRequired();
            modelBuilder.Entity<Product>()
                .Property(p => p.NameEn).IsRequired();
        }
    }
} 
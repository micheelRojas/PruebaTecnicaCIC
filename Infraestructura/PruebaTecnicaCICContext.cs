using Dominio;
using Microsoft.EntityFrameworkCore;
using OrganicSoft.Infraestructura.Base;

namespace Infraestructura
{
   public class PruebaTecnicaCICContext : DbContextBase
    {
        public PruebaTecnicaCICContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<Curso> Curso { get; set; }
        public DbSet<Tutor> Tutor { get; set; }
        public DbSet<Tema> Tema { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Curso>().HasKey(c => c.Id);
            modelBuilder.Entity<Tutor>().HasKey(c => c.Id);
            modelBuilder.Entity<Tema>().HasKey(c => c.Id);
        }
    }
}

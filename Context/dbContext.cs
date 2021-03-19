using apiRecibos.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace apiRecibos.Context
{
    public class dbContext : DbContext
    {
        public dbContext(DbContextOptions<dbContext> options) : base(options)
        {

        }


        public DbSet<recibos> recibos { get; set; }
        public DbSet<Usuarios> usuarios { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace apiRecibos.Models
{
    public class recibos
    {
        [Key]
        public int id_recibo { get; set; }
        public string proveedor { get; set; }
        public decimal monto { get; set; }
        public string moneda { get; set; }
        public DateTime fecha { get; set; }
        public string comentario { get; set; }
    }
}

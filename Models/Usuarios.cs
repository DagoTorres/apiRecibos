using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace apiRecibos.Models
{
    [Table("usuarios")]
    public class Usuarios
    {   
        [Key]
        public int id_usuario { get; set; }
        public string nombre { get; set; }
        public string ap_paterno { get; set; }
        public string ap_materno { get; set; }
        public string email { get; set; }
        public string pass { get; set; }
}
}

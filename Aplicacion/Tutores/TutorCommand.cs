using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Aplicacion.Tutores
{
    public class TutorCommand
    {
        public TutorCommand()
        {
        }

        public TutorCommand(int id, int cedula, string nombre)
        {
            Id = id;
            Cedula = cedula;
            Nombre = nombre;

        }


        public int Id { get; set; }
        public int Cedula { get; set; }
        public String Nombre { get; set; }

        public virtual IReadOnlyList<string> CanCrear()
        {
            var errors = new List<string>();

            if ((Cedula == 0))
                errors.Add("Cedula del tutor no especificada");

            if (string.IsNullOrEmpty(Nombre))
                errors.Add("Nombre del tutor no especificado");

            return errors;
        }

    }
}

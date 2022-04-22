using System;
using System.Collections.Generic;

namespace Aplicacion.Temas
{
    public class TemaCommand
    {
        public int Id { get; set; }
        public int Codigo { get; set; }
        public String Nombre { get; set; }
        public int CursoId { get;  set; }
        public TemaCommand()
        {
        }

        public TemaCommand(int id, int codigo, string nombre)
        {
            Id = id;
            Codigo = codigo;
            Nombre = nombre;

        }


       

        public virtual IReadOnlyList<string> CanCrear()
        {
            var errors = new List<string>();

            if ((Codigo == 0))
                errors.Add("Codigo del tema no especificado");

            if (string.IsNullOrEmpty(Nombre))
                errors.Add("Nombre del tema no especificado");

            return errors;
        }

    }
}

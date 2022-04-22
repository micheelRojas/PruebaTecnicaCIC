using Aplicacion.Temas;
using Aplicacion.Tutores;
using Dominio;
using System;
using System.Collections.Generic;

namespace Aplicacion.Cursos
{
    public class CursoCommand
    {
        public int Id { get; set; }
        public int CodigoCurso { get; set; }
        public String NombreCurso { get; set; }
        public TutorCommand Tutor { get; set; }
        public List<TemaCommand> TemasCurso { get; set; }
        public int TutorId { get; set; }


        public CursoCommand()
        {
        }

        public CursoCommand(int id, int codigoCurso, string nombreCurso, TutorCommand tutor, List<TemaCommand> temascurso)
        {
            Id = id;
            CodigoCurso = codigoCurso;
            NombreCurso = nombreCurso;
            Tutor = tutor;
            TemasCurso = temascurso;
        }
        public virtual IReadOnlyList<string> CanCrear()
        {
            var errors = new List<string>();

            if ((CodigoCurso == 0))
                errors.Add("Codigo del curso no especificado");

            if (string.IsNullOrEmpty(NombreCurso))
                errors.Add("Nombre del curso no especificado");

            if (string.IsNullOrEmpty(Tutor.ToString()))
                errors.Add("Tutor del curso no especificado");
            return errors;
        }
    }

}

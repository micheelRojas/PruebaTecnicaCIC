using OrganicSoft.Dominio.Base;
using System;
using System.Collections.Generic;

namespace Dominio
{
    public class Curso : Entity<int>, IAggregateRoot
    {
        public int CodigoCurso { get; private set; }
        public String NombreCurso { get; private set; }
        public Tutor Tutor { get; private set; }
        public List<Tema> Temas { get; private set; }
        public int TutorId { get; private set; }
        public Curso()
        {
        }
        public Curso(int codigoCurso, string nombreCurso, Tutor tutor, List<Tema> temasCurso)
        {
            CodigoCurso = codigoCurso;
            NombreCurso = nombreCurso;
            Tutor = tutor;
            Temas = temasCurso;
        }
        public void AddTemaTutor(Tutor tutor, List<Tema> temasCurso)
        {
            Tutor = tutor;
            Temas = temasCurso;
        }
        public String ModificarCurso(String nuevoNombre)
        {
            if (nuevoNombre == null || nuevoNombre == "")
            {
                return "Error, no se pudo modificar el curso";
            }
            NombreCurso = nuevoNombre;
            return "Curso Modificado con exito";
        }
    }
}

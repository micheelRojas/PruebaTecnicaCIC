using Dominio.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Aplicacion.Cursos
{
    public class ModificarCursoCommandHandle
    {
        private readonly IUnitOfWork _unitOfWork;

        private readonly ICursoRepository _cursoRepository;

        public ModificarCursoCommandHandle(IUnitOfWork unitOfWork, ICursoRepository cursoRepository)
        {
            _unitOfWork = unitOfWork;
            _cursoRepository = cursoRepository;
        }
        public ModificarCursoResponse Handle(CursoEditCommand command)
        {

            var curso = _cursoRepository.FindFirstOrDefault(curso => curso.Id == command.Id || curso.CodigoCurso == command.CodigoCurso);
            if (curso == null) return new ModificarCursoResponse("El curso no existe");
            var response = curso.ModificarCurso(command.NombreCurso);
            _cursoRepository.Update(curso);
            _unitOfWork.Commit();

            return new ModificarCursoResponse(response);
        }
    }
    public class ModificarCursoResponse
    {
        public ModificarCursoResponse()
        {

        }

        public ModificarCursoResponse(string mensaje)
        {
            Mensaje = mensaje;
        }

        public string Mensaje { get; set; }
        public bool isOk()
        {
            return this.Mensaje.Equals("Curso Modificado con exito");
        }
    }
    public class CursoEditCommand
    {
        public int Id { get; set; }
        public int CodigoCurso { get; set; }
        public String NombreCurso { get; set; }

        public CursoEditCommand()
        {
        }

        public CursoEditCommand(int id, int codigoCurso, string nombreCurso)
        {
            Id = id;
            CodigoCurso = codigoCurso;
            NombreCurso = nombreCurso;
        }
        public virtual IReadOnlyList<string> CanCrear()
        {
            var errors = new List<string>();

            if ((CodigoCurso == 0))
                errors.Add("Codigo del curso no especificado");

            if (string.IsNullOrEmpty(NombreCurso))
                errors.Add("Nombre del curso no especificado");
            return errors;
        }
    }
}

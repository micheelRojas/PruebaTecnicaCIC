using Dominio;
using Dominio.Contracts;
using System.Collections.Generic;
using System.Linq;

namespace Aplicacion.Cursos
{
    public class EliminarCursoCommandHandle
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ICursoRepository _cursoRepository;
        private readonly ITutorRepository _tutorRepository;
        private readonly ITemaRepository _temaRepository;

        public EliminarCursoCommandHandle(IUnitOfWork unitOfWork, ICursoRepository cursoRepository, ITutorRepository tutorRepository, ITemaRepository temaRepository)
        {
            _unitOfWork = unitOfWork;
            _cursoRepository = cursoRepository;
            _tutorRepository = tutorRepository;
            _temaRepository = temaRepository;
        }
        public EliminarCursoResponse Handle(CursoCommand command)
        {
            var curso = _cursoRepository.FindFirstOrDefault(curso => curso.Id == command.Id || curso.CodigoCurso == command.CodigoCurso);
            if (curso == null) return new EliminarCursoResponse("El curso no existe");
            Tutor tutor = _tutorRepository.FindFirstOrDefault(tutor => tutor.Id == curso.TutorId);
            List<Tema> temas = _temaRepository.GetAll().Where(tema=>tema.CursoId==curso.Id).ToList();
            curso.AddTemaTutor(tutor, temas);
            _cursoRepository.Delete(curso);
            _unitOfWork.Commit();
            return new EliminarCursoResponse($"Curso Eliminado Exitosamente");

        }
    }
    public class EliminarCursoResponse
    {
        public EliminarCursoResponse(string message)
        {
            Message = message;
        }
        public string Message { get; set; }
        public bool isOk()
        {
            return this.Message.Equals("Curso Eliminado Exitosamente");
        }
    }
}

using Dominio;
using Dominio.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Aplicacion.Cursos
{
    public class ConsultarDetallesCursoQueryHandle
    {
        
        private readonly ICursoRepository _cursoRepository;
        private readonly ITutorRepository _tutorRepository;
        private readonly ITemaRepository _temaRepository;

        public ConsultarDetallesCursoQueryHandle(ICursoRepository cursoRepository, ITutorRepository tutorRepository, ITemaRepository temaRepository)
        {
         
            _cursoRepository = cursoRepository;
            _tutorRepository = tutorRepository;
            _temaRepository = temaRepository;
        }
        public ConsultarDetallesCursosQueryResponse Handle(int id)
        {
            var curso = _cursoRepository.FindFirstOrDefault(curso => curso.Id == id || curso.CodigoCurso == id);
            if (curso == null) return new ConsultarDetallesCursosQueryResponse(null);
            Tutor tutor = _tutorRepository.FindFirstOrDefault(tutor => tutor.Id == curso.TutorId);
            List<Tema> temas = _temaRepository.GetAll().Where(tema => tema.CursoId == curso.Id).ToList();
            curso.AddTemaTutor(tutor, temas);
            return new ConsultarDetallesCursosQueryResponse(curso);

        }

    }

    public class ConsultarDetallesCursosQueryResponse
    {
        public Curso Cursos { get; set; }

        public ConsultarDetallesCursosQueryResponse(Curso cursos)
        {
            Cursos = cursos;
        }
    }
}

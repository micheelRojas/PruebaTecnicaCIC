using Dominio.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Aplicacion.Cursos
{
    public class ConsultarCursosQueryHandle
    {
        private ICursoRepository _cursoRepository;

        public ConsultarCursosQueryHandle(ICursoRepository cursoRepository)
        {
            _cursoRepository = cursoRepository;
        }
        public ConsultarCursosQueryResponse Handle()
        {
            var cursos = _cursoRepository.GetAll().Select(t => new CursoCommand
            {
                Id = t.Id,
                CodigoCurso= t.CodigoCurso,
               NombreCurso = t.NombreCurso,
               TutorId = t.TutorId,
            }).ToList();
            return new ConsultarCursosQueryResponse(cursos);
        }
    }
    public class ConsultarCursosQueryResponse
    {
        public ConsultarCursosQueryResponse(List<CursoCommand> cursos)
        {
            Cursos = cursos;
        }
        public List<CursoCommand> Cursos { get; set; }
    }
}

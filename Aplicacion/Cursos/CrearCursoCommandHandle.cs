using Dominio;
using Dominio.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Aplicacion.Cursos
{
  public  class CrearCursoCommandHandle
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ICursoRepository _cursoRepository;
        private readonly ITutorRepository _tutorRepository;
        private readonly ITemaRepository _temaRepository;

        public CrearCursoCommandHandle(IUnitOfWork unitOfWork, ICursoRepository cursoRepository, ITutorRepository tutorRepository, ITemaRepository temaRepository)
        {
            _unitOfWork = unitOfWork;
            _cursoRepository = cursoRepository;
            _tutorRepository = tutorRepository;
            _temaRepository = temaRepository;
        }

        public CrearCursoResponse Handle(CursoCommand command)
        {
            Curso curso = _cursoRepository.FindFirstOrDefault(t => t.Id == command.Id || t.CodigoCurso == command.CodigoCurso);
            if (curso != null)
            {
                return new CrearCursoResponse("El curso ya existe");
            }
            IReadOnlyList<string> errors = command.CanCrear();
            if (errors.Any())
            {
                string ListaErrors = "Errores: " + string.Join(",", errors);
                return new CrearCursoResponse(ListaErrors);
            }
            Tutor tutor =_tutorRepository.FindFirstOrDefault(t => t.Cedula == command.Tutor.Cedula);
            Tema temaCurso;
            List<Tema> temasNuevos = new List<Tema>();
            foreach (var tema in command.TemasCurso)
            {
                temaCurso = new Tema(tema.Codigo,tema.Nombre);
                _temaRepository.Add(temaCurso);
                temasNuevos.Add(temaCurso);
            }
            Curso CursoNuevo = new Curso(
                                            command.CodigoCurso,
                                            command.NombreCurso,
                                            tutor,
                                            temasNuevos
                                            );
           
            _cursoRepository.Add(CursoNuevo);
            _unitOfWork.Commit();
            return new CrearCursoResponse("Se creó con exito el curso.");
        }
    }
    public class CrearCursoResponse
    {
        public CrearCursoResponse()
        {

        }

        public CrearCursoResponse(string mensaje)
        {
            Mensaje = mensaje;
        }

        public string Mensaje { get; set; }
        public bool isOk()
        {
            return this.Mensaje.Equals("Se creó con exito el curso.");
        }
    }
}

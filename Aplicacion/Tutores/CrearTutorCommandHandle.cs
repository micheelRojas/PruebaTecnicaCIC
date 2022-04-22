using Dominio;
using Dominio.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Aplicacion.Tutores
{
    public class CrearTutorCommandHandle
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ITutorRepository _tutorRepository;
        public CrearTutorCommandHandle(IUnitOfWork unitOfWork, ITutorRepository tutorRepository)
        {
            _unitOfWork = unitOfWork;
            _tutorRepository = tutorRepository;

        }
        public CrearTutorResponse Handle(TutorCommand command)
        {
            Tutor tutor = _tutorRepository.FindFirstOrDefault(t => t.Id == command.Id || t.Cedula == command.Cedula);
            if (tutor != null)
            {
                return new CrearTutorResponse("El tutor ya existe");
            }
            IReadOnlyList<string> errors = command.CanCrear();
            if (errors.Any())
            {
                string ListaErrors = "Errores: " + string.Join(",", errors);
                return new CrearTutorResponse(ListaErrors);
            }

            Tutor TutorNuevo = new Tutor(
                                            command.Cedula,
                                            command.Nombre
                                            
                                            );

            _tutorRepository.Add(TutorNuevo);
            _unitOfWork.Commit();
            return new CrearTutorResponse("Se creó con exito el tutor.");
        }
    }
   

    public class CrearTutorResponse
    {
        public CrearTutorResponse()
        {

        }

        public CrearTutorResponse(string mensaje)
        {
            Mensaje = mensaje;
        }

        public string Mensaje { get; set; }
        public bool isOk()
        {
            return this.Mensaje.Equals("Se creó con exito el tutor.");
        }
    }
}

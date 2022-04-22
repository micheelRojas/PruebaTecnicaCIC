using Dominio;
using Dominio.Contracts;
using System.Collections.Generic;
using System.Linq;

namespace Aplicacion.Temas
{
    public class CrearTemaCommandHandle
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ITemaRepository _temaRepository;

        public CrearTemaCommandHandle(IUnitOfWork unitOfWork, ITemaRepository temaRepository)
        {
            _unitOfWork = unitOfWork;
            _temaRepository = temaRepository;
        }
        public CrearTemaResponse Handle(TemaCommand command)
        {
            Tema tema = _temaRepository.FindFirstOrDefault(t => t.Id == command.Id || t.CodigoTema == command.Codigo);
            if (tema != null)
            {
                return new CrearTemaResponse("El tema ya existe");
            }
            IReadOnlyList<string> errors = command.CanCrear();
            if (errors.Any())
            {
                string ListaErrors = "Errores: " + string.Join(",", errors);
                return new CrearTemaResponse(ListaErrors);
            }

            Tema TemaNuevo = new Tema(
                                            command.Codigo,
                                            command.Nombre

                                            );

            _temaRepository.Add(TemaNuevo);
            //_unitOfWork.Commit();
            return new CrearTemaResponse("Se creó con exito el tema.");
        }
    }

}
public class CrearTemaResponse
{
    public CrearTemaResponse()
    {

    }

    public CrearTemaResponse(string mensaje)
    {
        Mensaje = mensaje;
    }

    public string Mensaje { get; set; }
    public bool isOk()
    {
        return this.Mensaje.Equals("Se creó con exito el tema.");
    }
}


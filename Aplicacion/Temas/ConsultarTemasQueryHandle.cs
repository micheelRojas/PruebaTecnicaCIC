using Dominio.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Aplicacion.Temas
{
   public class ConsultarTemasQueryHandle
    {
        private ITemaRepository _temaRepository;

        public ConsultarTemasQueryHandle(ITemaRepository temaRepository)
        {
            _temaRepository = temaRepository;
        }
        public ConsultarTemasQueryResponse Handle()
        {
            var temas = _temaRepository.GetAll().Select(t => new TemaCommand
            {
                Id = t.Id,
                Codigo = t.CodigoTema,
                Nombre = t.NombreTema,
                CursoId= t.CursoId
            }).ToList();
            return new ConsultarTemasQueryResponse(temas);
        }
    }
    public class ConsultarTemasQueryResponse
    {
        public ConsultarTemasQueryResponse(List<TemaCommand> temas)
        {
            Temas = temas;
        }
        public List<TemaCommand> Temas { get; set; }
    }
}

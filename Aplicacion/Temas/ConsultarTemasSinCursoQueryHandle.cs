using Dominio.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Aplicacion.Temas
{
    public class ConsultarTemasSinCursoQueryHandle
    {
        private ITemaRepository _temaRepository;

        public ConsultarTemasSinCursoQueryHandle(ITemaRepository temaRepository)
        {
            _temaRepository = temaRepository;
        }
        public ConsultarTemasQueryResponse Handle()
        {
            var temas = _temaRepository.GetAll().Where(tema=>tema.CursoId==null || tema.CursoId==1000).Select(t => new TemaCommand
            {
                Id = t.Id,
                Codigo = t.CodigoTema,
                Nombre = t.NombreTema,
                CursoId = t.CursoId
            }).ToList();
            return new ConsultarTemasQueryResponse(temas);
        }
    }
}

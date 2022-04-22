using Dominio.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Aplicacion.Tutores
{
   public class ConsultarTutoresQueryHandle
    {
        private ITutorRepository _tutorRepository;

        public ConsultarTutoresQueryHandle(ITutorRepository tutorRepository)
        {
            _tutorRepository = tutorRepository;
        }
        public ConsultarTutoresQueryResponse Handle()
        {
            var tutores = _tutorRepository.GetAll().Select(t => new TutorCommand
            {
                Id = t.Id,
                Cedula = t.Cedula,
                Nombre = t.Nombre,
            }).ToList();
            return new ConsultarTutoresQueryResponse(tutores);
        }
    }
    public class ConsultarTutoresQueryResponse
    {
        public ConsultarTutoresQueryResponse(List<TutorCommand> tutores)
        {
            Tutores = tutores;
        }
        public List<TutorCommand> Tutores { get; set; }
    }
}

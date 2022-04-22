using Aplicacion.Tutores;
using Dominio.Contracts;
using Infraestructura;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace WebApi.Angular.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TutorController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly PruebaTecnicaCICContext _context;
        private readonly ITutorRepository _tutorRepository;

        public TutorController(IUnitOfWork unitOfWork, ITutorRepository tutorRepository, PruebaTecnicaCICContext context)
        {
            _context = context;
            _unitOfWork = unitOfWork;
            _tutorRepository = tutorRepository;

        }
        [HttpPost]
        public async Task<ActionResult> CreateTutor([FromBody] TutorCommand command)
        {
            var service = new CrearTutorCommandHandle(_unitOfWork, _tutorRepository);
            var response = service.Handle(command);

            if (response.isOk())
            {
                await _context.SaveChangesAsync();
                return Ok(response);
            }
            return BadRequest(response.Mensaje);
        }
        [HttpGet]
        public ActionResult<List<TutorCommand>> GetTutores()
        {
            var result = new ConsultarTutoresQueryHandle(_tutorRepository).Handle();

            return Ok(result.Tutores);
        }
    }
}

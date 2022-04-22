using Aplicacion.Temas;
using Dominio.Contracts;
using Infraestructura;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Angular.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TemaController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly PruebaTecnicaCICContext _context;
        private readonly ITemaRepository _temaRepository;

        public TemaController(IUnitOfWork unitOfWork, PruebaTecnicaCICContext context, ITemaRepository temaRepository)
        {
            _unitOfWork = unitOfWork;
            _context = context;
            _temaRepository = temaRepository;
        }
        [HttpPost]
        public async Task<ActionResult> CreateTema([FromBody] TemaCommand command)
        {
            var service = new CrearTemaCommandHandle(_unitOfWork, _temaRepository);
            var response = service.Handle(command);

            if (response.isOk())
            {
                await _context.SaveChangesAsync();
                return Ok(response);
            }
            return BadRequest(response.Mensaje);
        }
        [HttpGet]
        public ActionResult<List<TemaCommand>> GetTemas()
        {
            var result = new ConsultarTemasQueryHandle(_temaRepository).Handle();

            return Ok(result.Temas);
        }
        [HttpGet("GetDetalleCurso")]
        public ActionResult<List<TemaCommand>> GetTemasSinCurso()
        {
            var result = new ConsultarTemasSinCursoQueryHandle(_temaRepository).Handle();

            return Ok(result.Temas);
        }
    }
}

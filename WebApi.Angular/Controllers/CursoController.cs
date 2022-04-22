using Aplicacion.Cursos;
using Dominio;
using Dominio.Contracts;
using Infraestructura;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace WebApi.Angular.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CursoController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly PruebaTecnicaCICContext _context;
        private readonly ICursoRepository _cursoRepository;
        private readonly ITutorRepository _tutorRepository;
        private readonly ITemaRepository _temaRepository;

        public CursoController(IUnitOfWork unitOfWork, PruebaTecnicaCICContext context, ICursoRepository cursoRepository, ITutorRepository tutorRepository, ITemaRepository temaRepository)
        {
            _unitOfWork = unitOfWork;
            _context = context;
            _cursoRepository = cursoRepository;
            _tutorRepository = tutorRepository;
            _temaRepository = temaRepository;
        }

        [HttpPost]
        public async Task<ActionResult> CreateCurso([FromBody] CursoCommand command)
        {
            var service = new CrearCursoCommandHandle(_unitOfWork, _cursoRepository, _tutorRepository,_temaRepository);
            var response = service.Handle(command);

            if (response.isOk())
            {
                await _context.SaveChangesAsync();
                return Ok(response);
            }
            return BadRequest(response.Mensaje);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetCurso([FromRoute] int id)
        {
            Curso curso = await _context.Curso.SingleOrDefaultAsync(t => t.Id == id);
            if (curso == null)
                return NotFound();
            return Ok(curso);
        }
        [HttpGet("GetDetalleCurso/{id}")]
        public IActionResult GetDetalleCurso([FromRoute] int id)
        {
            var result = new ConsultarDetallesCursoQueryHandle(_cursoRepository,_tutorRepository,_temaRepository).Handle(id);
            return Ok(result.Cursos);
        }

        [HttpGet]
        public ActionResult<List<CursoCommand>> GetCursos()
        {
            var result = new ConsultarCursosQueryHandle(_cursoRepository).Handle();

            return Ok(result.Cursos);
        }
      
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateCurso([FromRoute] int id, [FromBody] CursoEditCommand command)
        {
            var service = new ModificarCursoCommandHandle(_unitOfWork, _cursoRepository);
            var response = service.Handle(command);
            if (response.isOk())
            {
                await _context.SaveChangesAsync();
                return Ok(response);
            }
            return BadRequest(response.Mensaje);
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult> deleteCurso([FromRoute] int id)
        {
            var service = new EliminarCursoCommandHandle(_unitOfWork, _cursoRepository,_tutorRepository,_temaRepository);
            CursoCommand command = new CursoCommand();
            command.CodigoCurso = id;
            var response = service.Handle(command);
            if (response.isOk())
            {
                await _context.SaveChangesAsync();
                return Ok(response);
            }
            return BadRequest(response);

        }

    }
}

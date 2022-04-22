using Dominio;
using Dominio.Contracts;
using OrganicSoft.Infraestructura.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infraestructura
{
   public class CursoRepository : GenericRepository<Curso>, ICursoRepository
    {
        public CursoRepository(IDbContext context) : base(context)
        {

        }
    }
}

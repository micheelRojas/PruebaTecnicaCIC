using Dominio;
using Dominio.Contracts;
using OrganicSoft.Infraestructura.Base;
using System;

namespace Infraestructura
{
    public class TemaRepository : GenericRepository<Tema>, ITemaRepository
    {
        public TemaRepository(IDbContext context) : base(context)
        {

        }
    
    }
}

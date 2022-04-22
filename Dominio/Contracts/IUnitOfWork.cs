using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Threading;
namespace Dominio.Contracts
{
   public interface IUnitOfWork
    {
        int Commit();
        Task<int> CommitAsync(CancellationToken cancellationToken = default);
    }
}

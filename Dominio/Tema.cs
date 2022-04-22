using OrganicSoft.Dominio.Base;
using System;


namespace Dominio
{
    public class Tema : Entity<int>, IAggregateRoot
    {
        public int CodigoTema { get; private set; }
        public String NombreTema { get; private set; }
        public int CursoId { get; private set; }
        public Tema()
        {
        }

        public Tema(int codigoTema, string nombreTema)
        {
            CodigoTema = codigoTema;
            NombreTema = nombreTema;
        }

    }
}

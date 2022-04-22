using OrganicSoft.Dominio.Base;
using System;


namespace Dominio
{
    public class Tutor : Entity<int>, IAggregateRoot
    {
        public int Cedula { get; private set; }
        public String Nombre { get; private set; }
        public Tutor()
        {
        }

        public Tutor(int cedula, string nombre)
        {
            Cedula = cedula;
            Nombre = nombre;
        }
    }
}

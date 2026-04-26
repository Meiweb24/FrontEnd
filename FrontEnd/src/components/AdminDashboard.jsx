import { useAuth } from '../context/AuthContext'

export default function AdminDashboard() {
  const { logout } = useAuth()

  return (
    <main className="admin-page">
      <section className="section">
        <div className="container">
          <div className="section-heading">
            <h1>Panel privado de administracion</h1>
            <p>
              Esta ruta esta protegida y solo se puede visualizar despues de un login
              exitoso.
            </p>
          </div>

          <div className="admin-grid">
            <article className="admin-card fade-in-up">
              <h2>Control de ofertas</h2>
              <p>Administra promociones, vigencias y productos destacados.</p>
            </article>
            <article className="admin-card fade-in-up">
              <h2>Gestion de inventario</h2>
              <p>Revisa stock, categorias y prioridad de productos.</p>
            </article>
            <article className="admin-card fade-in-up">
              <h2>Analitica inicial</h2>
              <p>Monitorea articulos con mejor conversion y carrito promedio.</p>
            </article>
          </div>

          <div className="admin-actions">
            <a href="/tienda" className="btn btn--secondary">
              Volver a tienda
            </a>
            <button type="button" className="btn btn--primary" onClick={logout}>
              Cerrar sesion
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}

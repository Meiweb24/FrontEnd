import { useAuth } from '../context/AuthContext'
import AdminStats from './AdminStats'
import AdminProductTable from './AdminProductTable'

export default function AdminDashboard() {
  const { logout } = useAuth()

  return (
    <main className="admin-page">
      <section className="section">
        <div className="container">
          <div className="section-heading">
            <h1>Panel de administración</h1>
            <p>Gestiona productos, ofertas y visualiza analítica del inventario.</p>
          </div>

          <AdminStats />

          <AdminProductTable />

          <div className="admin-actions">
            <a href="/tienda" className="btn btn--secondary">
              Volver a tienda
            </a>
            <button type="button" className="btn btn--primary" onClick={logout}>
              Cerrar sesión
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}

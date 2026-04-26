import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { isAdmin, login, logout, authError } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const success = login(username, password)

    if (success) {
      setUsername('')
      setPassword('')
    }
  }

  if (isAdmin) {
    return (
      <section className="section section--compact" id="admin">
        <div className="container">
          <div className="login-card login-card--active">
            <div>
              <h2>Modo admin activado</h2>
              <p>Ya puedes ver ofertas exclusivas y descuentos de administracion.</p>
            </div>
            <button type="button" className="btn btn--secondary" onClick={logout}>
              Cerrar sesion
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="section section--compact" id="admin">
      <div className="container">
        <div className="login-card">
          <div>
            <h2>Ingreso admin</h2>
            <p>Accede a modulos de precio especial y bloques de descuento oculto.</p>
          </div>
          <form className="login-form" onSubmit={handleSubmit}>
            <input
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="Usuario"
              autoComplete="username"
            />
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Contrasena"
              autoComplete="current-password"
            />
            <button type="submit" className="btn btn--primary">
              Ingresar
            </button>
          </form>
          {authError ? <p className="login-error">{authError}</p> : null}
        </div>
      </div>
    </section>
  )
}

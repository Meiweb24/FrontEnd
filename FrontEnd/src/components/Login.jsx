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
              <h2>Admin Mode Enabled</h2>
              <p>Exclusive Deals and Admin Discounts are now visible.</p>
            </div>
            <button type="button" className="btn btn--secondary" onClick={logout}>
              Logout
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
            <h2>Admin Login</h2>
            <p>Access special pricing modules and hidden discount blocks.</p>
          </div>
          <form className="login-form" onSubmit={handleSubmit}>
            <input
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="Username"
              autoComplete="username"
            />
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Password"
              autoComplete="current-password"
            />
            <button type="submit" className="btn btn--primary">
              Login
            </button>
          </form>
          {authError ? <p className="login-error">{authError}</p> : null}
        </div>
      </div>
    </section>
  )
}

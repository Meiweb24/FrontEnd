import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Modal from 'react-bootstrap/Modal'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { isAdmin, login, logout, authError } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [robotChecked, setRobotChecked] = useState(false)

  const closeModal = () => {
    setShowModal(false)
    setRobotChecked(false)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!robotChecked) {
      return
    }

    const success = login(username, password)

    if (success) {
      setUsername('')
      setPassword('')
      setShowPassword(false)
      closeModal()
    }
  }

  if (isAdmin) {
    return (
      <section className="section section--compact" id="admin">
        <div className="container">
          <div className="login-card login-card--active">
            <div>
              <h2>Modo admin activado</h2>
              <p>Ya puedes navegar tambien la ruta privada del panel administrativo.</p>
            </div>
            <div className="login-card__actions">
              <a href="/admin" className="btn btn--primary">
                Ir al panel privado
              </a>
              <button type="button" className="btn btn--secondary" onClick={logout}>
                Cerrar sesion
              </button>
            </div>
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
            <h2>Ingreso admin con modal</h2>
            <p>Demo de autenticacion para rutas privadas con verificacion local.</p>
          </div>
          <div className="login-card__actions">
            <button type="button" className="btn btn--primary" onClick={() => setShowModal(true)}>
              Abrir login
            </button>
          </div>
          {authError ? <p className="login-error">{authError}</p> : null}
        </div>
      </div>

      <Modal centered show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Login privado</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="adminUser">
              <Form.Label>Usuario</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                placeholder="Ingresa tu usuario"
                autoComplete="username"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="adminPass">
              <Form.Label>Contrasena</Form.Label>
              <InputGroup>
                <Form.Control
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Ingresa tu contrasena"
                  autoComplete="current-password"
                  required
                />
                <Button
                  variant="outline-secondary"
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                >
                  {showPassword ? 'Ocultar' : 'Mostrar'}
                </Button>
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-3" controlId="captchaCheck">
              <Form.Check
                type="checkbox"
                label="No soy un robot (simulado)"
                checked={robotChecked}
                onChange={(event) => setRobotChecked(event.target.checked)}
              />
            </Form.Group>

            <Button variant="dark" type="submit" disabled={!robotChecked}>
              Verificar ingreso
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </section>
  )
}

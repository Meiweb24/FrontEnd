export default function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="container footer__grid">
        <div>
          <h3>Tech Hub</h3>
          <p>Perifericos premium para workstations, gaming y productividad diaria.</p>
          <div className="contact-links">
            <a href="https://github.com/Meiweb24/FrontEnd" target="_blank" rel="noreferrer">
              GitHub del proyecto
            </a>
          </div>
        </div>
        <div>
          <h3>Boletin</h3>
          <p>Recibe lanzamientos y ofertas semanales antes de su publicacion.</p>
          <form className="newsletter" onSubmit={(event) => event.preventDefault()}>
            <input type="email" placeholder="tu-correo@ejemplo.com" aria-label="Correo" />
            <button type="submit" className="btn btn--primary btn--sm">
              Suscribirme
            </button>
          </form>
        </div>
      </div>
      <p className="footer__copy">2026 Tech Hub. Construido con React + Vite.</p>
    </footer>
  )
}


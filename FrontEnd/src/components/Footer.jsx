export default function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="container footer__grid">
        <div>
          <h3>Tech Hub</h3>
          <p>Premium performance gear for workstations and gaming setups.</p>
        </div>
        <div>
          <h3>Newsletter</h3>
          <p>Get launch alerts and weekly offers before public release.</p>
          <form className="newsletter" onSubmit={(event) => event.preventDefault()}>
            <input type="email" placeholder="you@example.com" aria-label="Email" />
            <button type="submit" className="btn btn--primary btn--sm">
              Subscribe
            </button>
          </form>
        </div>
      </div>
      <p className="footer__copy">2026 Tech Hub. Built with React + Vite.</p>
    </footer>
  )
}

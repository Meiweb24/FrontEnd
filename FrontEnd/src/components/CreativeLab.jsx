export default function CreativeLab() {
  return (
    <main className="lab-page">
      <section className="lab-hero">
        <div className="container lab-hero__inner">
          <p className="lab-kicker">Tech Hub - Home Oficial</p>
          <h1>Tu tienda tech para armar un setup potente, limpio y confiable</h1>
          <p>
            Compra perifericos de alto rendimiento con una experiencia rapida y clara:
            teclado, mouse, audio, monitores y accesorios seleccionados para Colombia.
          </p>
          <div className="lab-actions">
            <a href="/tienda" className="btn btn--primary btn--lg">
              Entrar a la tienda
            </a>
            <a href="/tienda#deals" className="btn btn--secondary btn--lg">
              Ir a ofertas
            </a>
          </div>
        </div>
      </section>

      <section className="lab-strip">
        <div className="container lab-strip__grid">
          <article className="lab-card lab-card--keyboard">
            <h2>Teclados</h2>
            <p>Textura, respuesta y sonido calibrado para productividad y juego.</p>
          </article>
          <article className="lab-card lab-card--mouse">
            <h2>Mouse</h2>
            <p>Control preciso y diseno ergonomico para sesiones intensas.</p>
          </article>
          <article className="lab-card lab-card--audio">
            <h2>Audio</h2>
            <p>Inmersion, claridad y comunicaciones limpias en cada partida.</p>
          </article>
        </div>
      </section>

      <section className="lab-feature">
        <div className="container lab-feature__inner">
          <div>
            <h2>Home pensado para compra real</h2>
            <p>
              Navega a la tienda completa, explora ofertas activas y encuentra equipos
              por categoria con una interfaz enfocada en conversion y velocidad.
            </p>
          </div>
          <a href="/tienda" className="btn btn--primary btn--md">
            Entrar al catalogo
          </a>
        </div>
      </section>
    </main>
  )
}

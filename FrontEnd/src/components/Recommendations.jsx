export default function Recommendations({ products, onAddToCart }) {
  return (
    <section className="section recommendations" id="recommendations">
      <div className="container">
        <div className="section-heading">
          <h2>Smart Recommendations</h2>
          <p>
            Priorizadas segun tu carrito, categoria activa y productos destacados para
            que compres mas rapido sin perder tiempo.
          </p>
        </div>

        <div className="recommend-grid">
          {products.length ? (
            products.map((item) => (
              <article key={item.id} className="recommend-card">
                <img src={item.image} alt={item.name} loading="lazy" />
                <div>
                  <p className="recommend-card__category">{item.categoryLabel}</p>
                  <h3>{item.name}</h3>
                  <p>{item.tagline}</p>
                  <div className="recommend-card__bottom">
                    <strong>${item.price}</strong>
                    <button
                      type="button"
                      className="btn btn--primary btn--sm"
                      onClick={() => onAddToCart(item.id)}
                    >
                      Add
                    </button>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <p className="empty-state">Ya agregaste todo. Revisa Deals para nuevas ofertas.</p>
          )}
        </div>
      </div>
    </section>
  )
}

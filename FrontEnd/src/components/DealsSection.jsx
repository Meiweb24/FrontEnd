export default function DealsSection({ products, onAddToCart, onCategoryChange }) {
  const topDeals = products
    .filter((item) => Number.isFinite(item.originalPrice) && item.originalPrice > item.price)
    .slice(0, 3)

  return (
    <section className="section deals" id="deals">
      <div className="container">
        <div className="section-heading">
          <h2>Live Deals</h2>
          <p>
            Esta seccion ya no esta muerta: ofertas activas por categoria, descuentos
            reales y acciones rapidas para comprar.
          </p>
        </div>

        <div className="deals-grid">
          {topDeals.map((item) => {
            const discount = Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)

            return (
              <article key={item.id} className="deal-card">
                <p className="deal-card__tag">{item.dealTag}</p>
                <h3>{item.name}</h3>
                <p className="deal-card__meta">
                  {item.categoryLabel} • Save {discount}%
                </p>
                <div className="deal-card__price">
                  <strong>${item.price}</strong>
                  <span>${item.originalPrice}</span>
                </div>
                <div className="deal-card__actions">
                  <button type="button" className="btn btn--primary btn--sm" onClick={() => onAddToCart(item.id)}>
                    Add deal
                  </button>
                  <button
                    type="button"
                    className="btn btn--secondary btn--sm"
                    onClick={() => onCategoryChange(item.category)}
                  >
                    Ver categoria
                  </button>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

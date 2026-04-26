import { formatCOP } from '../utils/currency'

export default function ProductCard({
  product,
  highlighted = false,
  onAddToCart,
  quantityInCart = 0,
}) {
  return (
    <article className={`product-card ${highlighted ? 'product-card--highlighted' : ''}`}>
      <div className="product-card__media">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          onError={(event) => {
            event.currentTarget.src = '/product-fallback.svg'
          }}
        />
      </div>
      <div className="product-card__content">
        <p className="product-card__category">{product.categoryLabel}</p>
        <h3>{product.name}</h3>
        <p className="product-card__tagline">{product.tagline}</p>
        <div className="product-card__bottom">
          <div className="product-card__price">
            <strong>{formatCOP(product.price)}</strong>
            {product.originalPrice ? <span>{formatCOP(product.originalPrice)}</span> : null}
          </div>
          <button type="button" className="btn btn--primary btn--sm" onClick={() => onAddToCart(product.id)}>
            Agregar
          </button>
        </div>
        {quantityInCart > 0 ? <p className="in-cart-note">En carrito: {quantityInCart}</p> : null}
      </div>
    </article>
  )
}

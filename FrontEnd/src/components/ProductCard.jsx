export default function ProductCard({
  product,
  highlighted = false,
  onAddToCart,
  quantityInCart = 0,
}) {
  return (
    <article className={`product-card ${highlighted ? 'product-card--highlighted' : ''}`}>
      <div className="product-card__media">
        <img src={product.image} alt={product.name} loading="lazy" />
      </div>
      <div className="product-card__content">
        <p className="product-card__category">{product.categoryLabel}</p>
        <h3>{product.name}</h3>
        <p className="product-card__tagline">{product.tagline}</p>
        <div className="product-card__bottom">
          <div className="product-card__price">
            <strong>${product.price}</strong>
            {product.originalPrice ? <span>${product.originalPrice}</span> : null}
          </div>
          <button type="button" className="btn btn--primary btn--sm" onClick={() => onAddToCart(product.id)}>
            Add to cart
          </button>
        </div>
        {quantityInCart > 0 ? <p className="in-cart-note">In cart: {quantityInCart}</p> : null}
      </div>
    </article>
  )
}

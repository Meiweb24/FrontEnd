import ProductCard from './ProductCard'

export default function ProductGrid({
  title,
  description,
  products,
  highlightAdmin = false,
  sectionId = 'products',
  onAddToCart,
  quantityById = {},
}) {
  return (
    <section className="section" id={sectionId}>
      <div className="container">
        <div className="section-heading">
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        <div className="product-grid">
          {products.length ? (
            products.map((item) => (
              <ProductCard
                key={item.id}
                product={item}
                highlighted={highlightAdmin && item.adminOnly}
                onAddToCart={onAddToCart}
                quantityInCart={quantityById[item.id] ?? 0}
              />
            ))
          ) : (
            <p className="empty-state">No products found for the selected filters.</p>
          )}
        </div>
      </div>
    </section>
  )
}

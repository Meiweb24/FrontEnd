export default function CategoryMenu({
  categories,
  activeCategory,
  onCategoryChange,
  sortOption,
  onSortChange,
}) {
  return (
    <section className="section section--compact">
      <div className="container">
        <div className="section-heading section-heading--row">
          <div>
            <h2>Navegacion por categorias</h2>
            <p>Filtra y organiza rapido para encontrar exactamente lo que tu setup necesita.</p>
          </div>
          <label className="sort-control" htmlFor="sort-products">
            Ordenar por
            <select
              id="sort-products"
              value={sortOption}
              onChange={(event) => onSortChange(event.target.value)}
            >
              <option value="featured">Destacados</option>
              <option value="az">A-Z</option>
              <option value="za">Z-A</option>
              <option value="price-asc">Precio menor</option>
              <option value="price-desc">Precio mayor</option>
              <option value="discount">Mayor descuento</option>
            </select>
          </label>
        </div>
        <div className="category-menu" role="tablist" aria-label="Categorias de productos">
          {categories.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`category-chip ${activeCategory === item.id ? 'category-chip--active' : ''}`}
              onClick={() => onCategoryChange(item.id)}
              role="tab"
              aria-selected={activeCategory === item.id}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function CategoryMenu({ categories, activeCategory, onCategoryChange }) {
  return (
    <section className="section section--compact">
      <div className="container">
        <div className="section-heading">
          <h2>Category Navigation</h2>
          <p>Jump quickly to exactly what your setup needs.</p>
        </div>
        <div className="category-menu" role="tablist" aria-label="Product categories">
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

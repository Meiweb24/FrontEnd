import { useAuth } from '../context/AuthContext'

function IconoBusqueda() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M10.5 3a7.5 7.5 0 1 0 4.74 13.3l4.73 4.73 1.06-1.06-4.73-4.73A7.5 7.5 0 0 0 10.5 3Zm0 1.5A6 6 0 1 1 4.5 10.5a6 6 0 0 1 6-6Z" />
    </svg>
  )
}

function IconoCarrito() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 4h14v2H8.6l-1 6h10.8l1.6-5h1.6l-2.1 6.6a1 1 0 0 1-1 .7H7.2l-.5 3H20v2H6a1 1 0 0 1-1-1.2L6.8 6H4V4h3Zm1 17a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm9 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z" />
    </svg>
  )
}

export default function Navbar({
  categories,
  activeCategory,
  onCategoryChange,
  searchTerm,
  onSearchChange,
  mobileOpen,
  setMobileOpen,
  cartCount,
  onCartToggle,
  cartOpen,
}) {
  const { isAdmin } = useAuth()
  const activeCategoryLabel = categories.find((item) => item.id === activeCategory)?.label ?? 'All'

  return (
    <header className="navbar" id="home">
      <div className="container navbar__inner">
        <a className="brand" href="#home">
          <span>Tech</span>
          <span className="brand__hub">Hub</span>
        </a>

        <nav className="desktop-nav" aria-label="Navegacion principal">
          <a href="#home" className="nav-link nav-link--active">
            Inicio
          </a>
          <div className="nav-dropdown">
            <button className="nav-link" type="button">
              Categorias: {activeCategoryLabel}
            </button>
            <div className="dropdown-panel">
              {categories.map((item) => (
                <button
                  type="button"
                  key={item.id}
                  className={`dropdown-item ${activeCategory === item.id ? 'dropdown-item--active' : ''}`}
                  onClick={() => onCategoryChange(item.id)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
          <a href="#deals" className="nav-link">
            Ofertas
          </a>
          <a href="#contact" className="nav-link">
            Contacto
          </a>
          {isAdmin ? (
            <a href="#admin" className="nav-link nav-link--admin">
              Panel Admin
            </a>
          ) : null}
        </nav>

        <div className="navbar-tools">
          <label className="search" htmlFor="search-products">
            <span className="search__icon">
              <IconoBusqueda />
            </span>
            <input
              id="search-products"
              type="search"
              placeholder="Buscar productos"
              value={searchTerm}
              onChange={(event) => onSearchChange(event.target.value)}
            />
          </label>

          <button
            className="icon-button"
            type="button"
            aria-label="Abrir carrito"
            onClick={onCartToggle}
            aria-expanded={cartOpen}
          >
            <IconoCarrito />
            <span className="cart-count">{cartCount}</span>
          </button>

          <a href="#admin" className="user-button">
            {isAdmin ? 'Admin' : 'Ingresar'}
          </a>

          <button
            type="button"
            className="menu-button"
            onClick={() => setMobileOpen((state) => !state)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-drawer"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <aside
        id="mobile-drawer"
        className={`mobile-drawer ${mobileOpen ? 'mobile-drawer--open' : ''}`}
        aria-hidden={!mobileOpen}
      >
        <nav className="mobile-drawer__content" aria-label="Navegacion movil">
          <a href="#home" onClick={() => setMobileOpen(false)}>
            Inicio
          </a>
          <a href="#deals" onClick={() => setMobileOpen(false)}>
            Ofertas
          </a>
          <a href="#contact" onClick={() => setMobileOpen(false)}>
            Contacto
          </a>
          {isAdmin ? (
            <a href="#admin" onClick={() => setMobileOpen(false)}>
              Panel Admin
            </a>
          ) : null}
          <div className="mobile-drawer__categories">
            {categories.map((item) => (
              <button
                key={item.id}
                className={activeCategory === item.id ? 'is-active' : ''}
                type="button"
                onClick={() => {
                  onCategoryChange(item.id)
                  setMobileOpen(false)
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        </nav>
      </aside>
    </header>
  )
}

import { useMemo, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import CategoryMenu from './components/CategoryMenu'
import ProductGrid from './components/ProductGrid'
import Login from './components/Login'
import AdminBanner from './components/AdminBanner'
import Footer from './components/Footer'
import DealsSection from './components/DealsSection'
import Recommendations from './components/Recommendations'
import CartDrawer from './components/CartDrawer'
import ProductModal from './components/ProductModal'
import { AuthProvider, useAuth } from './context/AuthContext'
import { categories, products } from './data/products'
import './App.css'

function Storefront() {
  const { isAdmin } = useAuth()
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState([])
  const [sortOption, setSortOption] = useState('featured')
  const [selectedProduct, setSelectedProduct] = useState(null)

  const allowedProducts = useMemo(
    () => products.filter((item) => (isAdmin ? true : !item.adminOnly)),
    [isAdmin],
  )

  const filteredProducts = useMemo(() => {
    return allowedProducts.filter((item) => {
      const passCategory = activeCategory === 'all' || item.category === activeCategory
      const passSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase().trim())

      return passCategory && passSearch
    })
  }, [activeCategory, allowedProducts, searchTerm])

  const visibleProducts = useMemo(() => {
    const sorted = [...filteredProducts]

    if (sortOption === 'az') {
      sorted.sort((first, second) => first.name.localeCompare(second.name, 'es-CO'))
      return sorted
    }

    if (sortOption === 'za') {
      sorted.sort((first, second) => second.name.localeCompare(first.name, 'es-CO'))
      return sorted
    }

    if (sortOption === 'price-asc') {
      sorted.sort((first, second) => first.price - second.price)
      return sorted
    }

    if (sortOption === 'price-desc') {
      sorted.sort((first, second) => second.price - first.price)
      return sorted
    }

    if (sortOption === 'discount') {
      sorted.sort((first, second) => {
        const firstDiscount =
          first.originalPrice && first.originalPrice > first.price
            ? (first.originalPrice - first.price) / first.originalPrice
            : 0
        const secondDiscount =
          second.originalPrice && second.originalPrice > second.price
            ? (second.originalPrice - second.price) / second.originalPrice
            : 0

        if (secondDiscount !== firstDiscount) {
          return secondDiscount - firstDiscount
        }

        return first.name.localeCompare(second.name, 'es-CO')
      })
      return sorted
    }

    sorted.sort((first, second) => {
      if (first.featured !== second.featured) {
        return Number(second.featured) - Number(first.featured)
      }

      return first.name.localeCompare(second.name, 'es-CO')
    })

    return sorted
  }, [filteredProducts, sortOption])

  const featuredProducts = useMemo(
    () => allowedProducts.filter((item) => item.featured).slice(0, 8),
    [allowedProducts],
  )

  const adminProducts = useMemo(() => products.filter((item) => item.adminOnly), [])

  const addToCart = (productId) => {
    const exists = allowedProducts.some((item) => item.id === productId)

    if (!exists) {
      return
    }

    setCartItems((prev) => {
      const current = prev.find((item) => item.id === productId)

      if (current) {
        return prev.map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity + 1 } : item,
        )
      }

      return [...prev, { id: productId, quantity: 1 }]
    })
    setCartOpen(true)
  }

  const removeOneFromCart = (productId) => {
    setCartItems((prev) => {
      return prev
        .map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity - 1 } : item,
        )
        .filter((item) => item.quantity > 0)
    })
  }

  const removeLineFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId))
  }

  const cartDetailItems = useMemo(() => {
    return cartItems
      .map((entry) => {
        const product = allowedProducts.find((item) => item.id === entry.id)

        if (!product) {
          return null
        }

        return {
          ...product,
          quantity: entry.quantity,
        }
      })
      .filter(Boolean)
  }, [allowedProducts, cartItems])

  const cartCount = useMemo(
    () => cartDetailItems.reduce((total, item) => total + item.quantity, 0),
    [cartDetailItems],
  )

  const cartSubtotal = useMemo(
    () => cartDetailItems.reduce((total, item) => total + item.price * item.quantity, 0),
    [cartDetailItems],
  )

  const cartCategoryWeights = useMemo(() => {
    return cartDetailItems.reduce((accumulator, item) => {
      const current = accumulator[item.category] ?? 0
      return { ...accumulator, [item.category]: current + item.quantity }
    }, {})
  }, [cartDetailItems])

  const cartIdSet = useMemo(
    () => new Set(cartDetailItems.map((item) => item.id)),
    [cartDetailItems],
  )

  const recommendedProducts = useMemo(() => {
    const sorted = allowedProducts
      .filter((item) => !cartIdSet.has(item.id))
      .sort((first, second) => {
        const firstWeight = cartCategoryWeights[first.category] ?? 0
        const secondWeight = cartCategoryWeights[second.category] ?? 0

        if (secondWeight !== firstWeight) {
          return secondWeight - firstWeight
        }

        if (second.featured !== first.featured) {
          return Number(second.featured) - Number(first.featured)
        }

        return first.price - second.price
      })

    return sorted.slice(0, 6)
  }, [allowedProducts, cartCategoryWeights, cartIdSet])

  const quantityById = useMemo(() => {
    return cartDetailItems.reduce((accumulator, item) => {
      return { ...accumulator, [item.id]: item.quantity }
    }, {})
  }, [cartDetailItems])

  return (
    <div className="app-shell">
      <Navbar
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        cartCount={cartCount}
        onCartToggle={() => setCartOpen((value) => !value)}
        cartOpen={cartOpen}
      />

      <CartDrawer
        open={cartOpen}
        items={cartDetailItems}
        subtotal={cartSubtotal}
        onClose={() => setCartOpen(false)}
        onAdd={addToCart}
        onRemove={removeOneFromCart}
        onDelete={removeLineFromCart}
      />

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={addToCart}
      />

      <main>
        <Hero />
        <DealsSection
          products={allowedProducts}
          onAddToCart={addToCart}
          onCategoryChange={setActiveCategory}
        />

        <section className="products-zone">
          <CategoryMenu
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            sortOption={sortOption}
            onSortChange={setSortOption}
          />

          <ProductGrid
            title="Productos destacados"
            description="Selecciones rapidas para comprar con confianza y rendimiento comprobado."
            products={featuredProducts}
            sectionId="featured"
            onAddToCart={addToCart}
            onOpenProduct={setSelectedProduct}
            quantityById={quantityById}
          />

          <ProductGrid
            title="Catalogo completo"
            description="Explora por categoria con tarjetas claras y acciones de compra rapidas."
            products={visibleProducts}
            sectionId="products"
            onAddToCart={addToCart}
            onOpenProduct={setSelectedProduct}
            quantityById={quantityById}
          />

          <Recommendations
            products={recommendedProducts}
            onAddToCart={addToCart}
            onOpenProduct={setSelectedProduct}
          />
        </section>

        {isAdmin ? <AdminBanner /> : null}

        {isAdmin ? (
          <ProductGrid
            title="Descuentos de administracion"
            description="Bloques ocultos para campanas privadas y clientes especiales."
            products={adminProducts}
            highlightAdmin
            sectionId="admin-discounts"
            onAddToCart={addToCart}
            onOpenProduct={setSelectedProduct}
            quantityById={quantityById}
          />
        ) : null}

        <section className="section promo-cta">
          <div className="container promo-cta__inner">
            <div>
              <h2>Necesitas recomendaciones personalizadas?</h2>
              <p>
                Cuentanos tu caso de uso y te preparamos un bundle de perifericos ideal
                para trabajo, estudio o gaming.
              </p>
            </div>
            <a href="#contact" className="btn btn--primary btn--md">
              Pedir asesoria
            </a>
          </div>
        </section>

        <Login />
      </main>

      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <Storefront />
    </AuthProvider>
  )
}

import { createContext, useContext, useState, useMemo } from 'react'
import { products as initialProducts } from '../data/products'

const ProductContext = createContext(null)

export function ProductProvider({ children }) {
  const [products, setProducts] = useState(initialProducts)

  const updateProduct = (productId, updates) => {
    setProducts(prevProducts =>
      prevProducts.map(product =>
        product.id === productId ? { ...product, ...updates } : product
      )
    )
  }

  const toggleFeatured = (productId) => {
    updateProduct(productId, {
      featured: !products.find(p => p.id === productId)?.featured,
    })
  }

  const updatePrice = (productId, newPrice) => {
    updateProduct(productId, { price: newPrice })
  }

  const updateStock = (productId, stock) => {
    updateProduct(productId, { stock })
  }

  const getProductStats = () => {
    const totalProducts = products.length
    const avgPrice = products.reduce((sum, p) => sum + p.price, 0) / totalProducts
    const onSale = products.filter(p => p.originalPrice && p.originalPrice > p.price).length
    const featured = products.filter(p => p.featured).length

    return { totalProducts, avgPrice, onSale, featured }
  }

  const value = useMemo(
    () => ({
      products,
      updateProduct,
      toggleFeatured,
      updatePrice,
      updateStock,
      getProductStats,
    }),
    [products]
  )

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
}

export function useProducts() {
  const context = useContext(ProductContext)
  if (!context) {
    throw new Error('useProducts debe usarse dentro de ProductProvider')
  }
  return context
}

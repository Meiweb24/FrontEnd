import { useState } from 'react'
import { useProducts } from '../context/ProductContext'
import '../styles/AdminProductTable.css'

export default function AdminProductTable() {
  const { products, updatePrice, toggleFeatured } = useProducts()
  const [editingId, setEditingId] = useState(null)
  const [editPrice, setEditPrice] = useState('')

  const handlePriceEdit = (product) => {
    setEditingId(product.id)
    setEditPrice(product.price)
  }

  const handleSavePrice = (productId) => {
    const newPrice = parseFloat(editPrice)
    if (!isNaN(newPrice) && newPrice > 0) {
      updatePrice(productId, newPrice)
      setEditingId(null)
    }
  }

  const handleCancel = () => {
    setEditingId(null)
    setEditPrice('')
  }

  return (
    <div className="admin-product-table">
      <h2>Inventario de productos</h2>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Producto</th>
              <th>Categoría</th>
              <th>Precio actual</th>
              <th>Precio original</th>
              <th>Destacado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id}>
                <td>
                  <div className="product-name">
                    <img src={product.image} alt={product.name} />
                    <span>{product.name}</span>
                  </div>
                </td>
                <td>{product.categoryLabel}</td>
                <td>
                  {editingId === product.id ? (
                    <input
                      type="number"
                      value={editPrice}
                      onChange={e => setEditPrice(e.target.value)}
                      className="price-input"
                      autoFocus
                    />
                  ) : (
                    <span className="price">${product.price.toLocaleString()}</span>
                  )}
                </td>
                <td>
                  {product.originalPrice ? (
                    <span className="discount">
                      ${product.originalPrice.toLocaleString()}
                    </span>
                  ) : (
                    <span className="no-discount">—</span>
                  )}
                </td>
                <td>
                  <button
                    className={`badge-toggle ${product.featured ? 'active' : ''}`}
                    onClick={() => toggleFeatured(product.id)}
                  >
                    {product.featured ? '⭐ Destacado' : 'Sin destacar'}
                  </button>
                </td>
                <td>
                  {editingId === product.id ? (
                    <div className="action-buttons">
                      <button
                        className="btn-small btn-save"
                        onClick={() => handleSavePrice(product.id)}
                      >
                        Guardar
                      </button>
                      <button
                        className="btn-small btn-cancel"
                        onClick={handleCancel}
                      >
                        Cancelar
                      </button>
                    </div>
                  ) : (
                    <button
                      className="btn-small btn-edit"
                      onClick={() => handlePriceEdit(product)}
                    >
                      Editar precio
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

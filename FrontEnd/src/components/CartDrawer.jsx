import { formatCOP } from '../utils/currency'

export default function CartDrawer({
  open,
  items,
  subtotal,
  onClose,
  onAdd,
  onRemove,
  onDelete,
}) {
  return (
    <>
      <div
        className={`cart-backdrop ${open ? 'cart-backdrop--open' : ''}`}
        onClick={onClose}
        aria-hidden={!open}
      />
      <aside className={`cart-drawer ${open ? 'cart-drawer--open' : ''}`} aria-hidden={!open}>
        <header className="cart-drawer__header">
          <h2>Tu carrito</h2>
          <button type="button" className="btn btn--secondary btn--sm" onClick={onClose}>
            Cerrar
          </button>
        </header>

        <div className="cart-drawer__body">
          {items.length ? (
            items.map((item) => (
              <article key={item.id} className="cart-item">
                <img
                  src={item.image}
                  alt={item.name}
                  onError={(event) => {
                    event.currentTarget.src = '/product-fallback.svg'
                  }}
                />
                <div>
                  <h3>{item.name}</h3>
                  <p>{formatCOP(item.price)} c/u</p>
                  <div className="cart-item__controls">
                    <button type="button" onClick={() => onRemove(item.id)}>
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button type="button" onClick={() => onAdd(item.id)}>
                      +
                    </button>
                    <button type="button" className="cart-item__remove" onClick={() => onDelete(item.id)}>
                      Quitar
                    </button>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <p className="empty-state">Tu carrito esta vacio.</p>
          )}
        </div>

        <footer className="cart-drawer__footer">
          <p>
            Subtotal <strong>{formatCOP(subtotal)}</strong>
          </p>
          <button type="button" className="btn btn--primary btn--md">
            Finalizar compra
          </button>
        </footer>
      </aside>
    </>
  )
}

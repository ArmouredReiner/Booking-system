import { useState } from 'react'

const products = [
  { id: 1, name: 'Espresso', price: 3, description: 'Rich and bold single shot' },
  { id: 2, name: 'Cappuccino', price: 4, description: 'Espresso with foamy milk' },
  { id: 3, name: 'Latte', price: 4.5, description: 'Smooth espresso with steamed milk' },
  { id: 4, name: 'Mocha', price: 5, description: 'Chocolate espresso delight' },
  { id: 5, name: 'Iced Coffee', price: 4, description: 'Chilled coffee over ice' },
]

function CoffeeCard({ product, onAddToCart }) {
  const [quantity, setQuantity] = useState(0)

  const handleAdd = () => {
    if (quantity > 0) {
      onAddToCart(product, quantity)
      setQuantity(0)
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="h-32 bg-gradient-to-br from-coffee-100 to-coffee-200 rounded-lg mb-4 flex items-center justify-center">
        <span className="text-4xl">☕</span>
      </div>
      <h3 className="text-xl font-semibold text-coffee-900">{product.name}</h3>
      <p className="text-coffee-600 text-sm mb-2">{product.description}</p>
      <p className="text-2xl font-bold text-coffee-700 mb-4">${product.price}</p>
      <div className="flex items-center gap-3">
        <button
          onClick={() => setQuantity(Math.max(0, quantity - 1))}
          className="w-10 h-10 rounded-full bg-coffee-100 text-coffee-700 font-bold hover:bg-coffee-200 transition-colors"
        >
          -
        </button>
        <span className="w-8 text-center font-semibold text-lg">{quantity}</span>
        <button
          onClick={() => setQuantity(quantity + 1)}
          className="w-10 h-10 rounded-full bg-coffee-100 text-coffee-700 font-bold hover:bg-coffee-200 transition-colors"
        >
          +
        </button>
        <button
          onClick={handleAdd}
          disabled={quantity === 0}
          className="ml-auto px-4 py-2 bg-coffee-600 text-white rounded-lg font-medium hover:bg-coffee-700 disabled:bg-coffee-300 disabled:cursor-not-allowed transition-colors"
        >
          Add
        </button>
      </div>
    </div>
  )
}

function Cart({ items, onRemoveItem, customerInfo, setCustomerInfo, onPlaceOrder, isSubmitting }) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div className="bg-white rounded-xl shadow-md p-6 sticky top-6">
      <h2 className="text-2xl font-bold text-coffee-900 mb-6">Your Order</h2>

      {items.length === 0 ? (
        <p className="text-coffee-500 text-center py-8">Your cart is empty</p>
      ) : (
        <>
          <div className="space-y-3 mb-6">
            {items.map((item, index) => (
              <div key={index} className="flex justify-between items-center border-b border-coffee-100 pb-3">
                <div>
                  <p className="font-medium text-coffee-800">{item.name}</p>
                  <p className="text-sm text-coffee-500">Qty: {item.quantity} × ${item.price}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-coffee-700">${(item.price * item.quantity).toFixed(2)}</span>
                  <button
                    onClick={() => onRemoveItem(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-coffee-200 pt-4 mb-6">
            <div className="flex justify-between text-xl font-bold text-coffee-900">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <div className="space-y-4 mb-6">
            <input
              type="text"
              placeholder="Your Name"
              value={customerInfo.name}
              onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
              className="w-full px-4 py-2 border border-coffee-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-coffee-400"
            />
            <input
              type="email"
              placeholder="Email Address"
              value={customerInfo.email}
              onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
              className="w-full px-4 py-2 border border-coffee-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-coffee-400"
            />
            <textarea
              placeholder="Special notes (optional)"
              value={customerInfo.notes}
              onChange={(e) => setCustomerInfo({ ...customerInfo, notes: e.target.value })}
              className="w-full px-4 py-2 border border-coffee-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-coffee-400 resize-none"
              rows="2"
            />
          </div>

          <button
            onClick={onPlaceOrder}
            disabled={items.length === 0 || !customerInfo.name || !customerInfo.email || isSubmitting}
            className="w-full py-3 bg-coffee-600 text-white rounded-lg font-semibold text-lg hover:bg-coffee-700 disabled:bg-coffee-300 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? 'Placing Order...' : 'Place Order'}
          </button>
        </>
      )}
    </div>
  )
}

function App() {
  const [cartItems, setCartItems] = useState([])
  const [customerInfo, setCustomerInfo] = useState({ name: '', email: '', notes: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [orderStatus, setOrderStatus] = useState(null)

  const handleAddToCart = (product, quantity) => {
    const existing = cartItems.find(item => item.id === product.id)
    if (existing) {
      setCartItems(cartItems.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
      ))
    } else {
      setCartItems([...cartItems, { ...product, quantity }])
    }
  }

  const handleRemoveItem = (index) => {
    setCartItems(cartItems.filter((_, i) => i !== index))
  }

  const handlePlaceOrder = async () => {
    setIsSubmitting(true)
    setOrderStatus(null)

    try {
      const response = await fetch('http://localhost:3001/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: cartItems, customer: customerInfo }),
      })

      if (response.ok) {
        setOrderStatus({ success: true, message: 'Order placed successfully!' })
        setCartItems([])
        setCustomerInfo({ name: '', email: '', notes: '' })
      } else {
        setOrderStatus({ success: false, message: 'Failed to place order. Please try again.' })
      }
    } catch (error) {
      setOrderStatus({ success: false, message: 'Error connecting to server.' })
    }

    setIsSubmitting(false)
    setTimeout(() => setOrderStatus(null), 5000)
  }

  return (
    <div className="min-h-screen bg-cream-50">
      <header className="bg-coffee-800 text-white py-6 shadow-lg">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">Brew & Bean Coffee Shop</h1>
          <p className="text-coffee-200">Fresh coffee, delivered to you</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {orderStatus && (
          <div className={`mb-6 p-4 rounded-lg ${orderStatus.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {orderStatus.message}
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          <section className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-coffee-900 mb-6">Our Menu</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map(product => (
                <CoffeeCard key={product.id} product={product} onAddToCart={handleAddToCart} />
              ))}
            </div>
          </section>

          <aside className="lg:col-span-1">
            <Cart
              items={cartItems}
              onRemoveItem={handleRemoveItem}
              customerInfo={customerInfo}
              setCustomerInfo={setCustomerInfo}
              onPlaceOrder={handlePlaceOrder}
              isSubmitting={isSubmitting}
            />
          </aside>
        </div>
      </main>

      <footer className="bg-coffee-900 text-coffee-200 py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>© 2024 Brew & Bean Coffee Shop. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default App

import React from 'react'
import { useApp } from '../context/AppContext'
import { formatPrice } from '../data/products'

export default function CartPage() {
    const { state, dispatch, navigate } = useApp()

    const subtotal = state.cart.reduce((sum, item) => sum + item.product.price * item.qty, 0)
    const deliveryFee = subtotal > 499 ? 0 : 49
    const total = subtotal + deliveryFee

    if (state.cart.length === 0) {
        return (
            <div className="page-enter max-w-content mx-auto px-4 py-20 text-center">
                <span className="text-7xl block mb-6">🛒</span>
                <h2 className={`text-2xl font-extrabold mb-3 ${state.darkMode ? 'text-white' : 'text-text-primary'}`}>Your cart is empty</h2>
                <p className="text-text-secondary mb-8">Looks like you haven't added anything to your cart yet.</p>
                <button onClick={() => navigate('home')} className="bg-primary text-white font-bold px-8 py-3 rounded-btn hover:bg-primary-light transition shadow-btn">
                    Explore Products
                </button>
            </div>
        )
    }

    return (
        <div className="page-enter max-w-content mx-auto px-4 py-8">
            <h1 className={`text-2xl font-extrabold mb-8 ${state.darkMode ? 'text-white' : 'text-text-primary'}`}>My Cart ({state.cart.reduce((s, i) => s + i.qty, 0)} items)</h1>

            <div className="grid lg:grid-cols-[1fr_380px] gap-8">
                {/* Items */}
                <div className="space-y-4">
                    {state.cart.map(item => (
                        <div key={item.productId} className={`p-5 rounded-card flex gap-5 ${state.darkMode ? 'bg-surface-dark' : 'bg-white'} shadow-sm`}>
                            <div className={`w-24 h-24 rounded-2xl flex items-center justify-center text-4xl shrink-0 ${state.darkMode ? 'bg-gray-800' : 'bg-bg-light'}`}>
                                {item.product.image}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className={`font-bold ${state.darkMode ? 'text-white' : 'text-text-primary'}`}>{item.product.name}</p>
                                        <p className="text-sm text-text-secondary">{[item.product.storage, item.product.color].filter(Boolean).join(' · ')}</p>
                                    </div>
                                    <button onClick={() => dispatch({ type: 'REMOVE_FROM_CART', payload: item.productId })} className="text-text-secondary hover:text-danger transition p-1">
                                        <span className="material-symbols-outlined">close</span>
                                    </button>
                                </div>
                                <div className="flex items-center justify-between mt-4">
                                    <div className="flex items-center gap-2">
                                        <button onClick={() => dispatch({ type: 'UPDATE_QTY', payload: { productId: item.productId, qty: item.qty - 1 } })} className={`w-9 h-9 rounded-btn flex items-center justify-center font-bold ${state.darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-text-primary'}`}>−</button>
                                        <span className={`w-10 text-center font-bold ${state.darkMode ? 'text-white' : 'text-text-primary'}`}>{item.qty}</span>
                                        <button onClick={() => dispatch({ type: 'UPDATE_QTY', payload: { productId: item.productId, qty: item.qty + 1 } })} className="w-9 h-9 rounded-btn flex items-center justify-center font-bold bg-primary text-white">+</button>
                                    </div>
                                    <p className="text-lg font-bold text-primary">{formatPrice(item.product.price * item.qty)}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Summary */}
                <div className={`sticky top-24 h-fit p-6 rounded-card ${state.darkMode ? 'bg-surface-dark' : 'bg-white'} shadow-sm space-y-4`}>
                    <h3 className={`font-bold text-lg ${state.darkMode ? 'text-white' : 'text-text-primary'}`}>Order Summary</h3>
                    <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                            <span className="text-text-secondary">Subtotal</span>
                            <span className={`font-semibold ${state.darkMode ? 'text-white' : 'text-text-primary'}`}>{formatPrice(subtotal)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-text-secondary">Delivery Fee</span>
                            <span className={deliveryFee === 0 ? 'text-success font-semibold' : ''}>{deliveryFee === 0 ? 'FREE' : formatPrice(deliveryFee)}</span>
                        </div>
                        <div className={`flex justify-between font-bold text-lg pt-3 border-t ${state.darkMode ? 'border-gray-700 text-white' : 'border-gray-200 text-text-primary'}`}>
                            <span>Total</span>
                            <span className="text-primary">{formatPrice(total)}</span>
                        </div>
                    </div>
                    <button onClick={() => navigate('checkout')} className="w-full bg-primary text-white font-bold py-3.5 rounded-btn hover:bg-primary-light transition shadow-btn text-sm">
                        Proceed to Checkout
                    </button>
                    <button onClick={() => navigate('home')} className="w-full text-center text-sm text-text-secondary hover:text-primary transition font-medium">
                        Continue Shopping
                    </button>
                </div>
            </div>
        </div>
    )
}

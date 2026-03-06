import React from 'react'
import { useApp } from '../context/AppContext'
import { formatPrice } from '../data/products'

export default function CartDrawer() {
    const { state, dispatch, navigate } = useApp()
    if (!state.cartDrawerOpen) return null

    const subtotal = state.cart.reduce((sum, item) => sum + item.product.price * item.qty, 0)
    const deliveryFee = subtotal > 499 ? 0 : 49
    const total = subtotal + deliveryFee

    return (
        <>
            {/* Overlay */}
            <div className="fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm" onClick={() => dispatch({ type: 'CLOSE_CART_DRAWER' })} />

            {/* Drawer */}
            <div className={`fixed right-0 top-0 h-full w-full max-w-md z-[70] drawer-enter ${state.darkMode ? 'bg-bg-dark' : 'bg-white'} shadow-2xl flex flex-col`}>
                {/* Header */}
                <div className={`px-6 py-5 border-b ${state.darkMode ? 'border-gray-800' : 'border-gray-100'} flex items-center justify-between`}>
                    <h2 className={`font-bold text-lg ${state.darkMode ? 'text-white' : 'text-text-primary'}`}>
                        My Cart ({state.cart.reduce((s, i) => s + i.qty, 0)} items)
                    </h2>
                    <button onClick={() => dispatch({ type: 'CLOSE_CART_DRAWER' })} className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                        <span className="material-symbols-outlined text-text-secondary">close</span>
                    </button>
                </div>

                {/* Items */}
                <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                    {state.cart.length === 0 ? (
                        <div className="text-center py-16">
                            <span className="text-6xl block mb-4">🛒</span>
                            <p className={`font-bold text-lg mb-2 ${state.darkMode ? 'text-white' : 'text-text-primary'}`}>Your cart is empty</p>
                            <p className="text-sm text-text-secondary mb-6">Explore our products and add something you love!</p>
                            <button onClick={() => { dispatch({ type: 'CLOSE_CART_DRAWER' }); navigate('home') }} className="bg-primary text-white px-6 py-2.5 rounded-btn text-sm font-semibold hover:bg-primary-light transition shadow-btn">
                                Explore Products
                            </button>
                        </div>
                    ) : (
                        state.cart.map(item => (
                            <div key={item.productId} className={`flex gap-4 p-4 rounded-2xl ${state.darkMode ? 'bg-surface-dark' : 'bg-bg-light'}`}>
                                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center text-3xl shrink-0">
                                    {item.product.image}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className={`text-sm font-semibold truncate ${state.darkMode ? 'text-white' : 'text-text-primary'}`}>{item.product.name}</p>
                                    <p className="text-xs text-text-secondary">{item.product.storage} · {item.product.color}</p>
                                    <p className="text-sm font-bold text-primary mt-1">{formatPrice(item.product.price)}</p>
                                </div>
                                <div className="flex flex-col items-end gap-2">
                                    <button onClick={() => dispatch({ type: 'REMOVE_FROM_CART', payload: item.productId })} className="text-text-secondary hover:text-danger transition">
                                        <span className="material-symbols-outlined text-lg">close</span>
                                    </button>
                                    <div className="flex items-center gap-1">
                                        <button onClick={() => dispatch({ type: 'UPDATE_QTY', payload: { productId: item.productId, qty: item.qty - 1 } })} className={`w-7 h-7 rounded-lg flex items-center justify-center text-sm font-bold ${state.darkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-text-primary'}`}>−</button>
                                        <span className={`w-7 text-center text-sm font-semibold ${state.darkMode ? 'text-white' : 'text-text-primary'}`}>{item.qty}</span>
                                        <button onClick={() => dispatch({ type: 'UPDATE_QTY', payload: { productId: item.productId, qty: item.qty + 1 } })} className="w-7 h-7 rounded-lg flex items-center justify-center text-sm font-bold bg-primary text-white">+</button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer */}
                {state.cart.length > 0 && (
                    <div className={`px-6 py-5 border-t ${state.darkMode ? 'border-gray-800' : 'border-gray-100'} space-y-3`}>
                        <div className="flex justify-between text-sm">
                            <span className="text-text-secondary">Subtotal</span>
                            <span className={`font-semibold ${state.darkMode ? 'text-white' : 'text-text-primary'}`}>{formatPrice(subtotal)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-text-secondary">Delivery</span>
                            <span className={deliveryFee === 0 ? 'text-success font-semibold' : `font-semibold ${state.darkMode ? 'text-white' : 'text-text-primary'}`}>
                                {deliveryFee === 0 ? 'FREE' : formatPrice(deliveryFee)}
                            </span>
                        </div>
                        <div className={`flex justify-between text-base font-bold pt-2 border-t ${state.darkMode ? 'border-gray-800 text-white' : 'border-gray-200 text-text-primary'}`}>
                            <span>Total</span>
                            <span className="text-primary">{formatPrice(total)}</span>
                        </div>
                        <button
                            onClick={() => { dispatch({ type: 'CLOSE_CART_DRAWER' }); navigate('checkout') }}
                            className="w-full bg-primary text-white py-3 rounded-btn font-bold text-sm hover:bg-primary-light transition shadow-btn"
                        >
                            Proceed to Checkout
                        </button>
                        <button onClick={() => { dispatch({ type: 'CLOSE_CART_DRAWER' }); navigate('home') }} className="w-full text-center text-sm text-text-secondary hover:text-primary transition font-medium py-1">
                            Continue Shopping
                        </button>
                    </div>
                )}
            </div>
        </>
    )
}

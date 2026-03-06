import React from 'react'
import { useApp } from '../context/AppContext'
import { formatPrice } from '../data/products'

export default function OrderConfirmedPage() {
    const { state, navigate } = useApp()
    const order = state.lastOrder || { id: '#BABA-99283', items: [], total: 0 }

    const steps = [
        { label: 'Order Placed', done: true },
        { label: 'Processing', done: true },
        { label: 'Out for Delivery', done: false, active: true },
        { label: 'Delivered', done: false },
    ]

    return (
        <div className="page-enter max-w-2xl mx-auto px-4 py-12 text-center">
            <div className="checkmark-circle w-24 h-24 bg-success rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path className="checkmark-path" d="M5 13l4 4L19 7" />
                </svg>
            </div>

            <h1 className={`text-3xl font-extrabold mb-2 ${state.darkMode ? 'text-white' : 'text-text-primary'}`}>Order Confirmed!</h1>
            <p className="text-text-secondary mb-6">High-speed delivery in progress. Your gadgets are on the move! 🚀</p>

            <div className="flex justify-center gap-3 mb-8 flex-wrap">
                <span className={`px-5 py-2.5 rounded-badge text-sm font-bold ${state.darkMode ? 'bg-surface-dark text-white' : 'bg-bg-light text-text-primary'}`}>
                    ORDER ID <span className="text-primary">{order.id || '#BABA-99283'}</span>
                </span>
                <span className={`px-5 py-2.5 rounded-badge text-sm font-bold ${state.darkMode ? 'bg-surface-dark text-white' : 'bg-bg-light text-text-primary'}`}>
                    ARRIVING IN <span className="text-primary">10 Mins ⏱</span>
                </span>
            </div>

            {/* Order Summary */}
            <div className={`rounded-card p-6 mb-8 text-left ${state.darkMode ? 'bg-surface-dark' : 'bg-white'} shadow-sm`}>
                <h3 className={`font-bold mb-4 ${state.darkMode ? 'text-white' : 'text-text-primary'}`}>Order Summary</h3>
                <div className="space-y-3 mb-4">
                    {order.items?.map(item => (
                        <div key={item.productId} className="flex items-center gap-3">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${state.darkMode ? 'bg-gray-800' : 'bg-bg-light'}`}>{item.product.image}</div>
                            <div className="flex-1">
                                <p className={`text-sm font-semibold ${state.darkMode ? 'text-white' : 'text-text-primary'}`}>{item.product.name}</p>
                                <p className="text-xs text-text-secondary">Qty: {item.qty}</p>
                            </div>
                            <p className={`text-sm font-bold ${state.darkMode ? 'text-white' : ''}`}>{formatPrice(item.product.price * item.qty)}</p>
                        </div>
                    ))}
                </div>
                <div className={`border-t pt-3 ${state.darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                    <div className="flex justify-between text-sm mb-1"><span className="text-text-secondary">Delivery</span><span className="text-success font-semibold">FREE</span></div>
                    <div className={`flex justify-between font-bold text-lg ${state.darkMode ? 'text-white' : ''}`}>
                        <span>Total</span><span className="text-primary">{formatPrice(order.total || 0)}</span>
                    </div>
                </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
                <button className="bg-primary text-white font-bold px-8 py-3 rounded-btn shadow-btn text-sm">📦 Track Order</button>
                <button className="border-2 border-primary text-primary font-bold px-8 py-3 rounded-btn text-sm">🧾 Download Invoice</button>
            </div>

            {/* Tracking Stepper */}
            <div className={`rounded-card p-6 mb-8 ${state.darkMode ? 'bg-surface-dark' : 'bg-white'} shadow-sm`}>
                <h3 className={`font-bold mb-6 text-left ${state.darkMode ? 'text-white' : ''}`}>📦 Order Tracking</h3>
                <div className="flex items-center justify-between">
                    {steps.map((step, i) => (
                        <React.Fragment key={step.label}>
                            <div className="flex flex-col items-center gap-2">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step.done ? 'bg-success text-white' : step.active ? 'bg-primary text-white stepper-active' : state.darkMode ? 'bg-gray-700 text-gray-500' : 'bg-gray-200 text-text-secondary'}`}>
                                    <span className="material-symbols-outlined text-lg">{step.done ? 'check' : 'circle'}</span>
                                </div>
                                <span className={`text-[10px] font-semibold ${step.done || step.active ? '' : 'text-text-secondary'}`}>{step.label}</span>
                            </div>
                            {i < steps.length - 1 && <div className={`flex-1 h-0.5 mx-2 ${step.done ? 'bg-success' : state.darkMode ? 'bg-gray-700' : 'bg-gray-200'}`} />}
                        </React.Fragment>
                    ))}
                </div>
            </div>

            <div className={`rounded-card p-5 text-left ${state.darkMode ? 'bg-surface-dark' : 'bg-white'} shadow-sm`}>
                <div className="flex items-center gap-2 mb-2">
                    <span className="material-symbols-outlined text-primary">location_on</span>
                    <h3 className={`font-bold ${state.darkMode ? 'text-white' : ''}`}>Delivery Address</h3>
                </div>
                <p className="text-sm text-text-secondary">{state.user.name} · {state.user.phone}</p>
                <p className="text-sm text-text-secondary">{state.user.address}</p>
            </div>

            <p className="text-sm text-text-secondary mt-8">Need help? <button className="text-primary font-semibold">Contact Support</button></p>
        </div>
    )
}

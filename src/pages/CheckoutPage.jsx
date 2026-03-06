import React, { useState } from 'react'
import { useApp } from '../context/AppContext'
import { formatPrice } from '../data/products'

export default function CheckoutPage() {
    const { state, dispatch, showNotification, navigate } = useApp()
    const [couponInput, setCouponInput] = useState('')
    const [upiId, setUpiId] = useState('')
    const [cardNumber, setCardNumber] = useState('')
    const [cardExpiry, setCardExpiry] = useState('')
    const [cardCvv, setCardCvv] = useState('')

    const subtotal = state.cart.reduce((sum, item) => sum + item.product.price * item.qty, 0)
    const deliveryFee = subtotal > 499 ? 0 : 49
    const discount = state.couponApplied ? Math.round(subtotal * 0.1) : 0
    const total = subtotal + deliveryFee - discount

    const steps = ['Address', 'Payment', 'Review']

    if (state.cart.length === 0) {
        return (
            <div className="page-enter max-w-content mx-auto px-4 py-20 text-center">
                <span className="text-6xl block mb-4">🛒</span>
                <p className={`font-bold text-lg mb-3 ${state.darkMode ? 'text-white' : 'text-text-primary'}`}>Your cart is empty</p>
                <button onClick={() => navigate('home')} className="bg-primary text-white px-6 py-2.5 rounded-btn text-sm font-semibold">Explore Products</button>
            </div>
        )
    }

    const handlePlaceOrder = () => {
        dispatch({ type: 'PLACE_ORDER', payload: total })
        showNotification('Order placed successfully! 🎉')
    }

    return (
        <div className="page-enter max-w-content mx-auto px-4 py-8">
            {/* Progress */}
            <div className="flex items-center justify-center mb-10 max-w-md mx-auto">
                {steps.map((step, i) => (
                    <React.Fragment key={step}>
                        <div className="flex items-center gap-2">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${i <= state.checkoutStep ? 'bg-primary text-white' : state.darkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-200 text-text-secondary'}`}>
                                {i < state.checkoutStep ? '✓' : i + 1}
                            </div>
                            <span className={`text-sm font-semibold ${i <= state.checkoutStep ? state.darkMode ? 'text-white' : 'text-text-primary' : 'text-text-secondary'}`}>{step}</span>
                        </div>
                        {i < steps.length - 1 && <div className={`flex-1 h-0.5 mx-3 ${i < state.checkoutStep ? 'bg-primary' : state.darkMode ? 'bg-gray-700' : 'bg-gray-200'}`} />}
                    </React.Fragment>
                ))}
            </div>

            <div className="grid lg:grid-cols-[1.5fr_1fr] gap-8">
                {/* Left Column */}
                <div className="space-y-6">
                    {/* Address */}
                    <div className={`p-6 rounded-card ${state.darkMode ? 'bg-surface-dark' : 'bg-white'} shadow-sm`}>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className={`font-bold text-lg ${state.darkMode ? 'text-white' : 'text-text-primary'}`}>📍 Delivery Address</h3>
                            <button className="text-primary text-sm font-semibold">Change Address</button>
                        </div>
                        <div className={`p-4 rounded-2xl ${state.darkMode ? 'bg-bg-dark' : 'bg-bg-light'}`}>
                            <p className={`font-bold text-sm ${state.darkMode ? 'text-white' : 'text-text-primary'}`}>{state.user.name}</p>
                            <p className="text-sm text-text-secondary mt-1">{state.user.address}</p>
                            <p className="text-sm text-text-secondary">{state.user.phone}</p>
                        </div>
                    </div>

                    {/* Payment */}
                    <div className={`p-6 rounded-card ${state.darkMode ? 'bg-surface-dark' : 'bg-white'} shadow-sm`}>
                        <h3 className={`font-bold text-lg mb-5 ${state.darkMode ? 'text-white' : 'text-text-primary'}`}>💳 Payment Method</h3>
                        <div className="space-y-3">
                            {[
                                { id: 'upi', icon: '📲', label: 'UPI', desc: 'Google Pay, PhonePe, Paytm' },
                                { id: 'card', icon: '💳', label: 'Credit / Debit Card', desc: 'Visa, Mastercard, RuPay' },
                                { id: 'netbanking', icon: '🏦', label: 'Net Banking', desc: 'All major banks supported' },
                                { id: 'cod', icon: '💵', label: 'Cash on Delivery', desc: 'Pay when you receive' },
                            ].map(m => (
                                <label key={m.id} className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition border-2 ${state.paymentMethod === m.id ? 'border-primary bg-primary-faint' : state.darkMode ? 'border-gray-700 hover:border-gray-600' : 'border-gray-200 hover:border-gray-300'}`}>
                                    <input type="radio" name="payment" checked={state.paymentMethod === m.id} onChange={() => dispatch({ type: 'SET_PAYMENT_METHOD', payload: m.id })} className="accent-primary" />
                                    <span className="text-2xl">{m.icon}</span>
                                    <div>
                                        <p className={`font-semibold text-sm ${state.darkMode ? 'text-white' : 'text-text-primary'}`}>{m.label}</p>
                                        <p className="text-xs text-text-secondary">{m.desc}</p>
                                    </div>
                                </label>
                            ))}
                        </div>

                        {/* UPI Input */}
                        {state.paymentMethod === 'upi' && (
                            <div className="mt-4 flex gap-2">
                                <input type="text" value={upiId} onChange={e => setUpiId(e.target.value)} placeholder="Enter UPI ID (e.g. name@upi)" className={`flex-1 px-4 py-3 rounded-btn text-sm outline-none border ${state.darkMode ? 'bg-bg-dark border-gray-700 text-white' : 'bg-bg-light border-gray-200'}`} />
                                <button className="bg-primary text-white text-sm font-semibold px-5 rounded-btn hover:bg-primary-light transition">Verify</button>
                            </div>
                        )}

                        {/* Card Input */}
                        {state.paymentMethod === 'card' && (
                            <div className="mt-4 space-y-3">
                                <input type="text" value={cardNumber} onChange={e => setCardNumber(e.target.value)} placeholder="Card Number" className={`w-full px-4 py-3 rounded-btn text-sm outline-none border ${state.darkMode ? 'bg-bg-dark border-gray-700 text-white' : 'bg-bg-light border-gray-200'}`} />
                                <div className="flex gap-3">
                                    <input type="text" value={cardExpiry} onChange={e => setCardExpiry(e.target.value)} placeholder="MM/YY" className={`flex-1 px-4 py-3 rounded-btn text-sm outline-none border ${state.darkMode ? 'bg-bg-dark border-gray-700 text-white' : 'bg-bg-light border-gray-200'}`} />
                                    <input type="text" value={cardCvv} onChange={e => setCardCvv(e.target.value)} placeholder="CVV" className={`w-28 px-4 py-3 rounded-btn text-sm outline-none border ${state.darkMode ? 'bg-bg-dark border-gray-700 text-white' : 'bg-bg-light border-gray-200'}`} />
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Column - Order Summary */}
                <div className={`sticky top-24 h-fit p-6 rounded-card ${state.darkMode ? 'bg-surface-dark' : 'bg-white'} shadow-sm`}>
                    <h3 className={`font-bold text-lg mb-5 ${state.darkMode ? 'text-white' : 'text-text-primary'}`}>Order Summary</h3>

                    {/* Items */}
                    <div className="space-y-3 mb-5">
                        {state.cart.map(item => (
                            <div key={item.productId} className="flex items-center gap-3">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${state.darkMode ? 'bg-gray-800' : 'bg-bg-light'}`}>{item.product.image}</div>
                                <div className="flex-1 min-w-0">
                                    <p className={`text-sm font-semibold truncate ${state.darkMode ? 'text-white' : 'text-text-primary'}`}>{item.product.name}</p>
                                    <p className="text-xs text-text-secondary">Qty: {item.qty}</p>
                                </div>
                                <p className={`text-sm font-bold ${state.darkMode ? 'text-white' : 'text-text-primary'}`}>{formatPrice(item.product.price * item.qty)}</p>
                            </div>
                        ))}
                    </div>

                    {/* Coupon */}
                    <div className={`flex gap-2 mb-5 p-3 rounded-2xl ${state.darkMode ? 'bg-bg-dark' : 'bg-bg-light'}`}>
                        <input type="text" value={couponInput} onChange={e => setCouponInput(e.target.value)} placeholder="Coupon code" className={`flex-1 px-3 py-2 rounded-lg text-sm outline-none ${state.darkMode ? 'bg-surface-dark text-white' : 'bg-white'}`} />
                        <button onClick={() => { dispatch({ type: 'APPLY_COUPON', payload: couponInput }); showNotification(couponInput.toUpperCase() === 'BABA10' ? 'Coupon applied! 10% discount' : 'Invalid coupon code', couponInput.toUpperCase() === 'BABA10' ? 'success' : 'error') }} className="bg-primary text-white text-xs font-bold px-4 rounded-lg hover:bg-primary-light transition">Apply</button>
                    </div>

                    {/* Totals */}
                    <div className="space-y-2 mb-5">
                        <div className="flex justify-between text-sm"><span className="text-text-secondary">Subtotal</span><span className={state.darkMode ? 'text-white' : ''}>{formatPrice(subtotal)}</span></div>
                        <div className="flex justify-between text-sm"><span className="text-text-secondary">Delivery</span><span className="text-success font-semibold">{deliveryFee === 0 ? 'FREE' : formatPrice(deliveryFee)}</span></div>
                        {state.couponApplied && <div className="flex justify-between text-sm"><span className="text-text-secondary">Discount (BABA10)</span><span className="text-success font-semibold">−{formatPrice(discount)}</span></div>}
                        <div className={`flex justify-between font-bold text-lg pt-3 border-t ${state.darkMode ? 'border-gray-700 text-white' : 'border-gray-200'}`}>
                            <span>Total</span><span className="text-primary">{formatPrice(total)}</span>
                        </div>
                    </div>

                    <button onClick={handlePlaceOrder} className="w-full bg-primary text-white font-bold py-3.5 rounded-btn hover:bg-primary-light transition shadow-btn text-sm">
                        Place Order
                    </button>

                    {/* Trust badges */}
                    <div className="flex justify-center gap-4 mt-5 text-xs text-text-secondary">
                        <span>🔒 Secure</span>
                        <span>↩ Easy Returns</span>
                        <span>⚡ Fast Delivery</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

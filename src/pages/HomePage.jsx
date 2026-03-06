import React from 'react'
import { useApp } from '../context/AppContext'
import { products, categories, formatPrice, getDiscount } from '../data/products'

export default function HomePage() {
    const { state, dispatch, addToCart, navigate } = useApp()

    const hotDeals = products.slice(0, 6)
    const searchResults = state.searchQuery
        ? products.filter(p => p.name.toLowerCase().includes(state.searchQuery.toLowerCase()))
        : null

    return (
        <div className="page-enter">
            {/* Search Results */}
            {searchResults ? (
                <div className="max-w-content mx-auto px-4 py-8">
                    <h2 className={`text-2xl font-extrabold mb-6 ${state.darkMode ? 'text-white' : 'text-text-primary'}`}>
                        Search Results for "{state.searchQuery}" ({searchResults.length})
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {searchResults.map(p => (
                            <ProductCard key={p.id} product={p} state={state} dispatch={dispatch} addToCart={addToCart} />
                        ))}
                    </div>
                    {searchResults.length === 0 && (
                        <div className="text-center py-16">
                            <span className="text-6xl block mb-4">🔍</span>
                            <p className="text-text-secondary">No products found. Try a different search term.</p>
                        </div>
                    )}
                </div>
            ) : (
                <>
                    {/* Hero */}
                    <section className="max-w-content mx-auto px-4 pt-6 pb-2">
                        <div className="grid md:grid-cols-2 gap-4 h-auto md:h-[320px]">
                            {/* Left - iPhone Banner */}
                            <div className="bg-gradient-to-br from-primary to-primary-light rounded-card p-8 flex flex-col justify-center relative overflow-hidden">
                                <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-xl" />
                                <span className="inline-block bg-white/20 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-badge w-fit mb-4">New Arrival</span>
                                <h2 className="text-white text-4xl md:text-5xl font-extrabold tracking-tight leading-none mb-2">iPhone 17 Pro.</h2>
                                <p className="text-white/70 text-sm mb-6">The future is here. Titanium design, A18 Pro chip.</p>
                                <button onClick={() => dispatch({ type: 'SET_PRODUCT', payload: products[0] })} className="bg-white text-primary font-bold text-sm px-6 py-3 rounded-btn w-fit hover:shadow-btn transition">
                                    Buy Now →
                                </button>
                            </div>
                            {/* Right - Exchange Banner */}
                            <div className={`rounded-card p-8 flex flex-col justify-center relative overflow-hidden ${state.darkMode ? 'bg-surface-dark' : 'bg-amber-50'}`}>
                                <div className="absolute -right-10 -top-10 w-32 h-32 bg-amber-200/30 rounded-full blur-xl" />
                                <span className="text-4xl mb-3">📱↔️📱</span>
                                <h3 className={`text-2xl font-extrabold mb-2 ${state.darkMode ? 'text-white' : 'text-text-primary'}`}>Exchange & Upgrade</h3>
                                <p className="text-text-secondary text-sm mb-5">Trade in your old phone and save up to ₹20,000 on your new device.</p>
                                <button className={`border-2 border-primary text-primary font-bold text-sm px-6 py-2.5 rounded-btn w-fit hover:bg-primary hover:text-white transition`}>
                                    Check Value →
                                </button>
                            </div>
                        </div>
                    </section>

                    {/* Category Pills */}
                    <section className="max-w-content mx-auto px-4 py-6">
                        <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2">
                            {categories.map(cat => (
                                <button
                                    key={cat.id}
                                    onClick={() => dispatch({ type: 'SET_CATEGORY', payload: cat.id })}
                                    className={`flex flex-col items-center gap-2 shrink-0 group`}
                                >
                                    <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl transition group-hover:shadow-card-hover ${state.darkMode ? 'bg-surface-dark group-hover:bg-gray-700' : 'bg-bg-light group-hover:bg-primary-faint'}`}>
                                        {cat.icon}
                                    </div>
                                    <span className={`text-xs font-semibold ${state.darkMode ? 'text-gray-300' : 'text-text-secondary'} group-hover:text-primary transition`}>{cat.name}</span>
                                </button>
                            ))}
                        </div>
                    </section>

                    {/* Hot Deals */}
                    <section className="max-w-content mx-auto px-4 pb-8">
                        <div className="flex items-center justify-between mb-5">
                            <div className="flex items-center gap-2">
                                <span className="text-2xl">🔥</span>
                                <h2 className={`text-xl font-extrabold ${state.darkMode ? 'text-white' : 'text-text-primary'}`}>Hot Deals Today</h2>
                            </div>
                            <button onClick={() => dispatch({ type: 'SET_CATEGORY', payload: 'iphones' })} className="text-sm text-primary font-semibold hover:underline">View All →</button>
                        </div>
                        <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2">
                            {hotDeals.map((p, i) => (
                                <div key={p.id} className={`shrink-0 w-[220px] product-card rounded-card overflow-hidden ${state.darkMode ? 'bg-surface-dark' : 'bg-white'} shadow-sm`}>
                                    <div className="relative">
                                        <div className={`h-40 flex items-center justify-center text-5xl ${state.darkMode ? 'bg-gray-800' : 'bg-bg-light'}`}>
                                            <span className="product-image">{p.image}</span>
                                        </div>
                                        {i === 0 && (
                                            <span className="absolute top-3 left-3 bg-danger text-white text-[10px] font-bold px-2 py-1 rounded-badge">Save ₹{((p.originalPrice - p.price) / 100).toFixed(0)}00</span>
                                        )}
                                    </div>
                                    <div className="p-4">
                                        <p className="text-[10px] font-bold uppercase tracking-wider text-primary mb-1">{p.brand}</p>
                                        <p className={`text-sm font-bold mb-0.5 truncate ${state.darkMode ? 'text-white' : 'text-text-primary'}`}>{p.name}</p>
                                        <p className="text-xs text-text-secondary mb-2">{p.storage}</p>
                                        <div className="flex items-center gap-2 mb-3">
                                            <span className="text-sm font-bold text-primary">{formatPrice(p.price)}</span>
                                            <span className="text-xs text-text-secondary line-through">{formatPrice(p.originalPrice)}</span>
                                        </div>
                                        <button onClick={() => addToCart(p)} className="w-full bg-primary text-white text-xs font-bold py-2.5 rounded-btn hover:bg-primary-light transition shadow-btn">
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Repair Services */}
                    <section className="bg-gradient-to-br from-bg-dark to-primary/90 py-14">
                        <div className="max-w-content mx-auto px-4">
                            <div className="text-center mb-8">
                                <span className="text-3xl block mb-3">🔧</span>
                                <h2 className="text-white text-3xl font-extrabold mb-2">Cracked screen? We'll fix it in 60 mins.</h2>
                                <p className="text-white/60 text-sm">Expert repair by certified technicians with genuine parts</p>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                                {[
                                    { icon: '📱', name: 'Screen Repair', price: 'From ₹2,499' },
                                    { icon: '🔋', name: 'Battery Swap', price: 'From ₹999' },
                                    { icon: '💧', name: 'Water Damage', price: 'From ₹1,499' },
                                    { icon: '📷', name: 'Camera Lens', price: 'From ₹1,199' },
                                ].map(s => (
                                    <div key={s.name} className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 text-center hover:bg-white/15 transition cursor-pointer">
                                        <span className="text-3xl block mb-2">{s.icon}</span>
                                        <p className="text-white font-bold text-sm mb-1">{s.name}</p>
                                        <p className="text-white/60 text-xs">{s.price}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                <button onClick={() => navigate('repair')} className="bg-white text-primary font-bold text-sm px-8 py-3 rounded-btn hover:shadow-btn transition">
                                    Estimate Repair Cost →
                                </button>
                                <button onClick={() => navigate('repair')} className="border-2 border-white/30 text-white font-bold text-sm px-8 py-3 rounded-btn hover:bg-white/10 transition">
                                    Track Status
                                </button>
                            </div>
                        </div>
                    </section>

                    {/* Newsletter */}
                    <section className="max-w-content mx-auto px-4 py-14">
                        <div className={`rounded-card p-8 text-center ${state.darkMode ? 'bg-surface-dark' : 'bg-primary-faint'}`}>
                            <span className="text-3xl block mb-3">📨</span>
                            <h2 className={`text-2xl font-extrabold mb-2 ${state.darkMode ? 'text-white' : 'text-text-primary'}`}>Stay in the loop</h2>
                            <p className="text-text-secondary text-sm mb-6">Get exclusive deals, new launches & tech tips straight to your inbox.</p>
                            <div className="flex max-w-md mx-auto gap-2">
                                <input type="email" placeholder="Your email address" className={`flex-1 px-4 py-3 rounded-btn text-sm outline-none border ${state.darkMode ? 'bg-bg-dark border-gray-700 text-white' : 'bg-white border-gray-200 text-text-primary'}`} />
                                <button className="bg-primary text-white font-bold text-sm px-6 py-3 rounded-btn hover:bg-primary-light transition shadow-btn shrink-0">
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </section>
                </>
            )}
        </div>
    )
}

function ProductCard({ product: p, state, dispatch, addToCart }) {
    return (
        <div className={`product-card rounded-card overflow-hidden cursor-pointer ${state.darkMode ? 'bg-surface-dark' : 'bg-white'} shadow-sm`} onClick={() => dispatch({ type: 'SET_PRODUCT', payload: p })}>
            <div className={`h-48 flex items-center justify-center text-6xl relative ${state.darkMode ? 'bg-gray-800' : 'bg-bg-light'}`}>
                <span className="product-image">{p.image}</span>
                {p.badge && (
                    <span className={`absolute top-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-badge text-white ${p.badge === 'New' ? 'bg-primary' : p.badge === 'Best Seller' ? 'bg-success' : 'bg-warning'}`}>{p.badge}</span>
                )}
            </div>
            <div className="p-4">
                <p className="text-[10px] font-bold uppercase tracking-wider text-primary mb-1">{p.brand}</p>
                <p className={`text-sm font-bold mb-1 ${state.darkMode ? 'text-white' : 'text-text-primary'}`}>{p.name}</p>
                <div className="flex items-center gap-2 mb-3">
                    <span className="text-sm font-bold text-primary">{formatPrice(p.price)}</span>
                    {p.originalPrice > p.price && <span className="text-xs text-text-secondary line-through">{formatPrice(p.originalPrice)}</span>}
                    {p.originalPrice > p.price && <span className="text-[10px] font-bold text-success">{getDiscount(p.originalPrice, p.price)}% OFF</span>}
                </div>
                <button onClick={e => { e.stopPropagation(); addToCart(p) }} className="w-full bg-primary text-white text-xs font-bold py-2.5 rounded-btn hover:bg-primary-light transition">
                    Add to Cart
                </button>
            </div>
        </div>
    )
}

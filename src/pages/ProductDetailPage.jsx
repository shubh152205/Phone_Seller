import React, { useState } from 'react'
import { useApp } from '../context/AppContext'
import { products, formatPrice, getDiscount, reviews } from '../data/products'

export default function ProductDetailPage() {
    const { state, dispatch, addToCart, navigate } = useApp()
    const product = state.currentProduct

    const [mainImageIdx, setMainImageIdx] = useState(0)

    if (!product) return <div className="text-center py-20"><p className="text-text-secondary">Product not found</p></div>

    const discount = getDiscount(product.originalPrice, product.price)
    const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 5)
    const thumbnails = [product.image, '📸', '🎯', '✨']

    const categoryName = product.category === 'iphones' ? 'iPhones' : product.category.charAt(0).toUpperCase() + product.category.slice(1)

    return (
        <div className="page-enter max-w-content mx-auto px-4 py-6">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm mb-6">
                <button onClick={() => navigate('home')} className="text-text-secondary hover:text-primary transition">Home</button>
                <span className="text-text-secondary">›</span>
                <button onClick={() => dispatch({ type: 'SET_CATEGORY', payload: product.category })} className="text-text-secondary hover:text-primary transition">{categoryName}</button>
                <span className="text-text-secondary">›</span>
                <span className={`font-semibold ${state.darkMode ? 'text-white' : 'text-text-primary'}`}>{product.name}</span>
            </div>

            {/* Main Section */}
            <div className="grid lg:grid-cols-2 gap-10 mb-14">
                {/* Images */}
                <div>
                    <div className={`rounded-card overflow-hidden mb-4 ${state.darkMode ? 'bg-gray-800' : 'bg-bg-light'} flex items-center justify-center h-[400px]`}>
                        <span className="text-[120px]">{thumbnails[mainImageIdx]}</span>
                    </div>
                    <div className="flex gap-3">
                        {thumbnails.map((t, i) => (
                            <button key={i} onClick={() => setMainImageIdx(i)} className={`w-20 h-20 rounded-2xl flex items-center justify-center text-3xl transition ${i === mainImageIdx ? 'ring-2 ring-primary bg-primary-faint' : state.darkMode ? 'bg-gray-800' : 'bg-bg-light'}`}>
                                {t}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Info */}
                <div>
                    {product.rating >= 4.5 && (
                        <span className="inline-block bg-primary-faint text-primary text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-badge mb-3">Top Rated</span>
                    )}
                    <h1 className={`text-3xl font-extrabold mb-2 ${state.darkMode ? 'text-white' : 'text-text-primary'}`}>
                        {product.name}{product.color ? `, ${product.color}` : ''}{product.storage ? `, ${product.storage}` : ''}
                    </h1>

                    {/* Rating */}
                    <div className="flex items-center gap-3 mb-4">
                        <div className="flex items-center gap-1 bg-success text-white text-sm font-bold px-2.5 py-1 rounded-lg">
                            <span>{product.rating}</span>
                            <span className="text-xs">★</span>
                        </div>
                        <span className="text-sm text-text-secondary">{product.reviews?.toLocaleString('en-IN')} Ratings & {product.ratings?.toLocaleString('en-IN')} Reviews</span>
                    </div>

                    {/* Delivery */}
                    <div className={`flex items-center gap-2 p-3 rounded-2xl mb-5 ${state.darkMode ? 'bg-surface-dark' : 'bg-amber-50'}`}>
                        <span className="text-lg">⚡</span>
                        <div>
                            <p className={`text-sm font-bold ${state.darkMode ? 'text-white' : 'text-text-primary'}`}>Delivery in 10 mins</p>
                            <p className="text-xs text-text-secondary">Superfast delivery to your doorstep</p>
                        </div>
                    </div>

                    {/* Price */}
                    <div className="mb-5">
                        <div className="flex items-baseline gap-3">
                            <span className={`text-3xl font-extrabold ${state.darkMode ? 'text-white' : 'text-text-primary'}`}>{formatPrice(product.price)}</span>
                            {product.originalPrice > product.price && (
                                <>
                                    <span className="text-lg text-text-secondary line-through">{formatPrice(product.originalPrice)}</span>
                                    <span className="text-sm font-bold text-success">{discount}% OFF</span>
                                </>
                            )}
                        </div>
                        <p className="text-xs text-text-secondary mt-1">Inclusive of all taxes</p>
                    </div>

                    {/* CTAs */}
                    <div className="flex gap-3 mb-8">
                        <button onClick={() => addToCart(product)} className="flex-1 bg-primary text-white font-bold py-3.5 rounded-btn text-sm hover:bg-primary-light transition shadow-btn flex items-center justify-center gap-2">
                            <span className="material-symbols-outlined text-lg">shopping_cart</span> Add to Cart
                        </button>
                        <button onClick={() => { addToCart(product); navigate('checkout') }} className="flex-1 border-2 border-primary text-primary font-bold py-3.5 rounded-btn text-sm hover:bg-primary hover:text-white transition flex items-center justify-center gap-2">
                            <span className="material-symbols-outlined text-lg">bolt</span> Buy Now
                        </button>
                    </div>

                    {/* Key Highlights */}
                    <div className="grid grid-cols-2 gap-3">
                        {[
                            { icon: 'memory', label: 'Processor', value: product.processor },
                            { icon: 'photo_camera', label: 'Camera', value: product.camera },
                            { icon: 'construction', label: 'Build', value: product.build },
                            { icon: 'bolt', label: 'Charging', value: product.charging },
                        ].filter(h => h.value).map(h => (
                            <div key={h.label} className={`p-4 rounded-2xl ${state.darkMode ? 'bg-surface-dark' : 'bg-bg-light'}`}>
                                <span className="material-symbols-outlined text-primary text-lg mb-1 block">{h.icon}</span>
                                <p className="text-[10px] text-text-secondary uppercase tracking-wider font-semibold">{h.label}</p>
                                <p className={`text-sm font-bold ${state.darkMode ? 'text-white' : 'text-text-primary'}`}>{h.value}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Description & Specs */}
            <div className="grid md:grid-cols-2 gap-8 mb-14">
                <div>
                    <h3 className={`text-lg font-extrabold mb-4 ${state.darkMode ? 'text-white' : 'text-text-primary'}`}>Product Description</h3>
                    <p className="text-sm text-text-secondary leading-relaxed mb-4">{product.description}</p>
                    <ul className="space-y-2">
                        {product.processor && <li className="text-sm text-text-secondary flex items-start gap-2"><span className="text-primary">•</span> Powered by {product.processor}</li>}
                        {product.camera && <li className="text-sm text-text-secondary flex items-start gap-2"><span className="text-primary">•</span> {product.camera} camera system</li>}
                        {product.build && <li className="text-sm text-text-secondary flex items-start gap-2"><span className="text-primary">•</span> {product.build} construction</li>}
                    </ul>
                </div>
                <div>
                    <h3 className={`text-lg font-extrabold mb-4 ${state.darkMode ? 'text-white' : 'text-text-primary'}`}>Technical Specifications</h3>
                    <div className={`rounded-2xl overflow-hidden border ${state.darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                        {product.specs && Object.entries(product.specs).map(([key, value], i) => (
                            <div key={key} className={`flex ${i > 0 ? `border-t ${state.darkMode ? 'border-gray-700' : 'border-gray-200'}` : ''}`}>
                                <span className={`w-36 px-4 py-3 text-xs font-semibold uppercase tracking-wider ${state.darkMode ? 'bg-gray-800 text-gray-400' : 'bg-bg-light text-text-secondary'}`}>{key}</span>
                                <span className={`flex-1 px-4 py-3 text-sm ${state.darkMode ? 'text-white' : 'text-text-primary'}`}>{value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Frequently Bought Together */}
            {relatedProducts.length > 0 && (
                <div className="mb-14">
                    <h3 className={`text-lg font-extrabold mb-5 ${state.darkMode ? 'text-white' : 'text-text-primary'}`}>Frequently Bought Together</h3>
                    <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2">
                        {relatedProducts.map(p => (
                            <div key={p.id} className={`shrink-0 w-[180px] product-card rounded-2xl overflow-hidden ${state.darkMode ? 'bg-surface-dark' : 'bg-white'} shadow-sm cursor-pointer`} onClick={() => { dispatch({ type: 'SET_PRODUCT', payload: p }); window.scrollTo(0, 0) }}>
                                <div className={`h-32 flex items-center justify-center text-4xl ${state.darkMode ? 'bg-gray-800' : 'bg-bg-light'}`}>
                                    <span className="product-image">{p.image}</span>
                                </div>
                                <div className="p-3">
                                    <p className={`text-xs font-bold truncate ${state.darkMode ? 'text-white' : 'text-text-primary'}`}>{p.name}</p>
                                    <p className="text-xs font-bold text-primary mt-1">{formatPrice(p.price)}</p>
                                    <button onClick={e => { e.stopPropagation(); addToCart(p) }} className="mt-2 w-full bg-primary/10 text-primary text-[10px] font-bold py-1.5 rounded-lg hover:bg-primary hover:text-white transition">Add</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Reviews */}
            <div>
                <h3 className={`text-lg font-extrabold mb-5 ${state.darkMode ? 'text-white' : 'text-text-primary'}`}>Customer Reviews</h3>
                <div className="grid md:grid-cols-[200px_1fr] gap-8">
                    <div className={`p-6 rounded-card text-center ${state.darkMode ? 'bg-surface-dark' : 'bg-bg-light'}`}>
                        <p className={`text-5xl font-extrabold ${state.darkMode ? 'text-white' : 'text-text-primary'}`}>{product.rating}</p>
                        <div className="flex justify-center text-warning text-lg my-1">{'★'.repeat(Math.floor(product.rating))}{'☆'.repeat(5 - Math.floor(product.rating))}</div>
                        <p className="text-xs text-text-secondary">{product.reviews?.toLocaleString('en-IN')} reviews</p>
                    </div>
                    <div className="space-y-4">
                        {reviews.map(r => (
                            <div key={r.id} className={`p-5 rounded-2xl ${state.darkMode ? 'bg-surface-dark' : 'bg-white'} shadow-sm`}>
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary text-xs font-bold">{r.name[0]}</div>
                                    <div>
                                        <p className={`text-sm font-semibold ${state.darkMode ? 'text-white' : 'text-text-primary'}`}>{r.name}</p>
                                        <div className="flex items-center gap-2">
                                            <span className="text-warning text-xs">{'★'.repeat(r.rating)}</span>
                                            <span className="text-[10px] text-text-secondary">{r.date}</span>
                                            {r.verified && <span className="text-[10px] text-success font-semibold">✓ Verified Purchase</span>}
                                        </div>
                                    </div>
                                </div>
                                <p className="text-sm text-text-secondary">{r.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

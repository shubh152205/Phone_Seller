import React, { useMemo, useState } from 'react'
import { useApp } from '../context/AppContext'
import { products, categories, formatPrice, getDiscount } from '../data/products'

export default function CategoryPage() {
    const { state, dispatch, addToCart, navigate } = useApp()
    const [showCount, setShowCount] = useState(12)

    const category = categories.find(c => c.id === state.currentCategory) || categories[0]
    const catProducts = products.filter(p => p.category === (state.currentCategory || 'iphones'))

    // Get unique values for filters
    const storageOptions = useMemo(() => [...new Set(catProducts.map(p => p.storage).filter(Boolean))], [state.currentCategory])
    const colorOptions = useMemo(() => {
        const colors = {}
        catProducts.forEach(p => { if (p.colorHex && p.color) colors[p.color] = p.colorHex })
        return Object.entries(colors)
    }, [state.currentCategory])
    const seriesOptions = useMemo(() => [...new Set(catProducts.map(p => p.series).filter(Boolean))], [state.currentCategory])

    // Apply filters
    const filtered = useMemo(() => {
        let result = catProducts
        const f = state.activeFilters
        if (f.storage.length > 0) result = result.filter(p => f.storage.includes(p.storage))
        if (f.colors.length > 0) result = result.filter(p => f.colors.includes(p.color))
        if (f.series.length > 0) result = result.filter(p => f.series.includes(p.series))
        result = result.filter(p => p.price >= f.priceRange[0] && p.price <= f.priceRange[1])

        // Sort
        switch (state.sortBy) {
            case 'price-low': return [...result].sort((a, b) => a.price - b.price)
            case 'price-high': return [...result].sort((a, b) => b.price - a.price)
            case 'newest': return [...result].sort((a, b) => (b.badge === 'New' ? 1 : 0) - (a.badge === 'New' ? 1 : 0))
            default: return result
        }
    }, [catProducts, state.activeFilters, state.sortBy])

    const cartQty = (productId) => {
        const item = state.cart.find(i => i.productId === productId)
        return item ? item.qty : 0
    }

    return (
        <div className="page-enter max-w-content mx-auto px-4 py-6">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm mb-6">
                <button onClick={() => navigate('home')} className="text-text-secondary hover:text-primary transition">Home</button>
                <span className="text-text-secondary">›</span>
                <span className="text-text-secondary">Categories</span>
                <span className="text-text-secondary">›</span>
                <span className={`font-semibold ${state.darkMode ? 'text-white' : 'text-text-primary'}`}>{category.name}</span>
            </div>

            <div className="flex gap-8">
                {/* Sidebar */}
                <aside className={`hidden lg:block w-64 shrink-0 sticky top-20 h-fit space-y-6 p-5 rounded-card ${state.darkMode ? 'bg-surface-dark' : 'bg-white'} shadow-sm`}>
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">tune</span>
                        <h3 className={`font-bold text-sm ${state.darkMode ? 'text-white' : 'text-text-primary'}`}>Filters</h3>
                    </div>

                    {/* Series */}
                    {seriesOptions.length > 0 && (
                        <div>
                            <h4 className={`font-semibold text-xs uppercase tracking-wider mb-3 ${state.darkMode ? 'text-gray-400' : 'text-text-secondary'}`}>Model Series</h4>
                            <div className="space-y-2">
                                {seriesOptions.map(s => (
                                    <label key={s} className="flex items-center gap-2 cursor-pointer">
                                        <input type="checkbox" checked={state.activeFilters.series.includes(s)} onChange={() => dispatch({ type: 'TOGGLE_FILTER_SERIES', payload: s })} className="w-4 h-4 accent-primary rounded" />
                                        <span className={`text-sm ${state.darkMode ? 'text-gray-300' : 'text-text-primary'}`}>{s}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Storage */}
                    {storageOptions.length > 0 && (
                        <div>
                            <h4 className={`font-semibold text-xs uppercase tracking-wider mb-3 ${state.darkMode ? 'text-gray-400' : 'text-text-secondary'}`}>Storage</h4>
                            <div className="grid grid-cols-2 gap-2">
                                {storageOptions.map(s => (
                                    <button key={s} onClick={() => dispatch({ type: 'TOGGLE_FILTER_STORAGE', payload: s })} className={`text-xs font-semibold py-2 rounded-btn transition ${state.activeFilters.storage.includes(s) ? 'bg-primary text-white' : state.darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-bg-light text-text-secondary hover:bg-gray-200'}`}>
                                        {s}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Colors */}
                    {colorOptions.length > 0 && (
                        <div>
                            <h4 className={`font-semibold text-xs uppercase tracking-wider mb-3 ${state.darkMode ? 'text-gray-400' : 'text-text-secondary'}`}>Color</h4>
                            <div className="flex flex-wrap gap-2">
                                {colorOptions.map(([name, hex]) => (
                                    <button key={name} onClick={() => dispatch({ type: 'TOGGLE_FILTER_COLOR', payload: name })} className={`w-8 h-8 rounded-full border-2 transition ${state.activeFilters.colors.includes(name) ? 'border-primary ring-2 ring-primary/30' : 'border-gray-200'}`} style={{ backgroundColor: hex }} title={name} />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Price Range */}
                    <div>
                        <h4 className={`font-semibold text-xs uppercase tracking-wider mb-3 ${state.darkMode ? 'text-gray-400' : 'text-text-secondary'}`}>Price Range</h4>
                        <input type="range" min="0" max="200000" step="1000" value={state.activeFilters.priceRange[1]} onChange={e => dispatch({ type: 'SET_PRICE_RANGE', payload: [0, parseInt(e.target.value)] })} className="w-full" />
                        <div className="flex justify-between text-xs text-text-secondary mt-1">
                            <span>₹0</span>
                            <span>{formatPrice(state.activeFilters.priceRange[1])}</span>
                        </div>
                    </div>
                </aside>

                {/* Main Grid */}
                <div className="flex-1">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h1 className={`text-2xl font-extrabold ${state.darkMode ? 'text-white' : 'text-text-primary'}`}>{category.name}</h1>
                            <p className="text-sm text-text-secondary">Showing {Math.min(showCount, filtered.length)} of {filtered.length} products</p>
                        </div>
                        <select value={state.sortBy} onChange={e => dispatch({ type: 'SET_SORT', payload: e.target.value })} className={`text-sm px-4 py-2 rounded-btn outline-none border ${state.darkMode ? 'bg-surface-dark border-gray-700 text-white' : 'bg-white border-gray-200 text-text-primary'}`}>
                            <option value="relevance">Relevance</option>
                            <option value="price-low">Price: Low → High</option>
                            <option value="price-high">Price: High → Low</option>
                            <option value="newest">Newest</option>
                        </select>
                    </div>

                    {/* Product Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                        {filtered.slice(0, showCount).map(p => (
                            <div key={p.id} className={`product-card rounded-card overflow-hidden cursor-pointer ${state.darkMode ? 'bg-surface-dark' : 'bg-white'} shadow-sm`} onClick={() => dispatch({ type: 'SET_PRODUCT', payload: p })}>
                                <div className={`h-48 flex items-center justify-center text-6xl relative ${state.darkMode ? 'bg-gray-800' : 'bg-bg-light'}`}>
                                    <span className="product-image">{p.image}</span>
                                    {p.badge && (
                                        <span className={`absolute top-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-badge text-white ${p.badge === 'New' ? 'bg-primary' : p.badge === 'Best Seller' ? 'bg-success' : 'bg-warning'}`}>{p.badge}</span>
                                    )}
                                    <button onClick={e => { e.stopPropagation(); dispatch({ type: 'TOGGLE_WISHLIST', payload: p.id }) }} className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition ${state.wishlist.includes(p.id) ? 'bg-danger text-white' : state.darkMode ? 'bg-gray-700 text-gray-400' : 'bg-white text-text-secondary'}`}>
                                        <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: state.wishlist.includes(p.id) ? "'FILL' 1" : "'FILL' 0" }}>favorite</span>
                                    </button>
                                </div>
                                <div className="p-4">
                                    <p className="text-[10px] font-bold uppercase tracking-wider text-primary mb-1">{p.brand}</p>
                                    <p className={`text-sm font-bold mb-0.5 ${state.darkMode ? 'text-white' : 'text-text-primary'}`}>{p.name}</p>
                                    <p className="text-xs text-text-secondary mb-2">{[p.storage, p.color].filter(Boolean).join(' · ')}</p>
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="text-sm font-bold text-primary">{formatPrice(p.price)}</span>
                                        {p.originalPrice > p.price && <span className="text-xs text-text-secondary line-through">{formatPrice(p.originalPrice)}</span>}
                                        {p.originalPrice > p.price && <span className="text-[10px] font-bold text-success">{getDiscount(p.originalPrice, p.price)}% OFF</span>}
                                    </div>
                                    {cartQty(p.id) > 0 ? (
                                        <div className="flex items-center gap-2">
                                            <button onClick={e => { e.stopPropagation(); dispatch({ type: 'UPDATE_QTY', payload: { productId: p.id, qty: cartQty(p.id) - 1 } }) }} className={`w-9 h-9 rounded-btn flex items-center justify-center font-bold ${state.darkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-text-primary'}`}>−</button>
                                            <span className={`flex-1 text-center font-bold text-sm ${state.darkMode ? 'text-white' : 'text-text-primary'}`}>{cartQty(p.id)}</span>
                                            <button onClick={e => { e.stopPropagation(); addToCart(p) }} className="w-9 h-9 rounded-btn flex items-center justify-center font-bold bg-primary text-white">+</button>
                                        </div>
                                    ) : (
                                        <button onClick={e => { e.stopPropagation(); addToCart(p) }} className="w-full bg-primary text-white text-xs font-bold py-2.5 rounded-btn hover:bg-primary-light transition">
                                            Add +
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Load More */}
                    {showCount < filtered.length && (
                        <div className="text-center mt-8">
                            <button onClick={() => setShowCount(s => s + 12)} className={`px-8 py-3 rounded-btn text-sm font-bold border-2 border-primary text-primary hover:bg-primary hover:text-white transition`}>
                                Load More
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

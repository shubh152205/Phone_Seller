import React, { useState } from 'react'
import { useApp } from '../context/AppContext'
import { products } from '../data/products'

export default function Header() {
    const { state, dispatch, navigate } = useApp()
    const [searchOpen, setSearchOpen] = useState(false)
    const cartCount = state.cart.reduce((sum, item) => sum + item.qty, 0)

    const filteredSearch = state.searchQuery
        ? products.filter(p => p.name.toLowerCase().includes(state.searchQuery.toLowerCase())).slice(0, 5)
        : []

    return (
        <header className={`sticky top-0 z-50 backdrop-blur-xl ${state.darkMode ? 'bg-bg-dark/95 border-gray-800' : 'bg-white/95 border-gray-100'} border-b`}>
            <div className="max-w-content mx-auto px-4 py-3 flex items-center gap-4">
                {/* Logo */}
                <button onClick={() => navigate('home')} className="flex items-center gap-2 shrink-0">
                    <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center">
                        <span className="text-white font-extrabold text-sm">B</span>
                    </div>
                    <div className="hidden sm:block">
                        <h1 className={`font-extrabold text-sm leading-tight ${state.darkMode ? 'text-white' : 'text-text-primary'}`}>Baba The Hi-Tech</h1>
                        <p className="text-[10px] text-text-secondary font-medium tracking-wider uppercase">Speed Redefined</p>
                    </div>
                </button>

                {/* Location pill */}
                <div className="hidden md:flex items-center gap-1.5 bg-primary-faint text-primary text-xs font-semibold px-3 py-1.5 rounded-badge shrink-0">
                    <span className="material-symbols-outlined text-sm">bolt</span>
                    <span>DELIVERY IN 10 MINS</span>
                    <span className="text-text-secondary font-normal">· Bangalore</span>
                </div>

                {/* Search */}
                <div className="flex-1 relative">
                    <div className={`flex items-center rounded-input border ${state.darkMode ? 'bg-surface-dark border-gray-700' : 'bg-bg-light border-gray-200'} px-3 py-2`}>
                        <span className="material-symbols-outlined text-text-secondary text-xl mr-2">search</span>
                        <input
                            type="text"
                            placeholder="Search phones, accessories, repairs..."
                            className={`bg-transparent outline-none text-sm w-full ${state.darkMode ? 'text-white placeholder:text-gray-500' : 'text-text-primary placeholder:text-text-secondary'}`}
                            value={state.searchQuery}
                            onChange={e => dispatch({ type: 'SET_SEARCH', payload: e.target.value })}
                            onFocus={() => setSearchOpen(true)}
                            onBlur={() => setTimeout(() => setSearchOpen(false), 200)}
                        />
                    </div>
                    {/* Search dropdown */}
                    {searchOpen && filteredSearch.length > 0 && (
                        <div className={`absolute top-full mt-2 left-0 right-0 rounded-2xl shadow-xl border ${state.darkMode ? 'bg-surface-dark border-gray-700' : 'bg-white border-gray-100'} overflow-hidden z-50`}>
                            {filteredSearch.map(p => (
                                <button
                                    key={p.id}
                                    className={`w-full px-4 py-3 flex items-center gap-3 text-left ${state.darkMode ? 'hover:bg-gray-800' : 'hover:bg-bg-light'} transition`}
                                    onClick={() => { dispatch({ type: 'SET_PRODUCT', payload: p }); dispatch({ type: 'SET_SEARCH', payload: '' }) }}
                                >
                                    <span className="text-2xl">{p.image}</span>
                                    <div>
                                        <p className={`text-sm font-semibold ${state.darkMode ? 'text-white' : 'text-text-primary'}`}>{p.name}</p>
                                        <p className="text-xs text-text-secondary">₹{p.price.toLocaleString('en-IN')}</p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Dark mode toggle */}
                <button
                    onClick={() => dispatch({ type: 'TOGGLE_DARK_MODE' })}
                    className={`p-2 rounded-xl ${state.darkMode ? 'hover:bg-gray-800 text-gray-300' : 'hover:bg-gray-100 text-text-secondary'} transition`}
                >
                    <span className="material-symbols-outlined">{state.darkMode ? 'light_mode' : 'dark_mode'}</span>
                </button>

                {/* Login */}
                <button className={`hidden sm:flex items-center gap-1.5 text-sm font-semibold px-3 py-2 rounded-btn ${state.darkMode ? 'text-gray-300 hover:bg-gray-800' : 'text-text-primary hover:bg-gray-100'} transition`}>
                    <span className="material-symbols-outlined text-xl">person</span>
                    <span>Login</span>
                </button>

                {/* Cart */}
                <button
                    onClick={() => dispatch({ type: 'TOGGLE_CART_DRAWER' })}
                    className="relative p-2 rounded-xl bg-primary text-white hover:bg-primary-light transition shadow-btn"
                >
                    <span className="material-symbols-outlined">shopping_cart</span>
                    {cartCount > 0 && (
                        <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-danger text-white text-[10px] font-bold rounded-full flex items-center justify-center badge-bounce">
                            {cartCount}
                        </span>
                    )}
                </button>
            </div>
        </header>
    )
}

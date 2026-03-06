import React, { createContext, useContext, useReducer, useCallback, useEffect } from 'react'

const AppContext = createContext()

const initialState = {
    currentView: 'home',
    currentProduct: null,
    currentCategory: null,
    cart: [],
    wishlist: [],
    user: {
        name: 'Siddharth Sharma',
        phone: '+91 98765 43210',
        address: 'Flat 402, Tech Heights, Electronic City Phase 1, Bangalore - 560100',
    },
    orders: [],
    isAdminMode: false,
    darkMode: false,
    searchQuery: '',
    activeFilters: { storage: [], colors: [], priceRange: [0, 200000], series: [] },
    sortBy: 'relevance',
    notification: null,
    cartDrawerOpen: false,
    currentAdminView: 'dashboard',
    checkoutStep: 0,
    paymentMethod: 'upi',
    couponCode: '',
    couponApplied: false,
}

function appReducer(state, action) {
    switch (action.type) {
        case 'NAVIGATE':
            return { ...state, currentView: action.payload, searchQuery: '' }
        case 'SET_CATEGORY':
            return { ...state, currentView: 'category', currentCategory: action.payload, activeFilters: { storage: [], colors: [], priceRange: [0, 200000], series: [] }, sortBy: 'relevance' }
        case 'SET_PRODUCT':
            return { ...state, currentView: 'product', currentProduct: action.payload }
        case 'SET_ADMIN_VIEW':
            return { ...state, currentAdminView: action.payload }
        case 'TOGGLE_ADMIN':
            return { ...state, isAdminMode: !state.isAdminMode, currentView: state.isAdminMode ? 'home' : 'admin', currentAdminView: 'dashboard' }
        case 'TOGGLE_DARK_MODE':
            return { ...state, darkMode: !state.darkMode }
        case 'SET_SEARCH':
            return { ...state, searchQuery: action.payload }
        case 'SET_SORT':
            return { ...state, sortBy: action.payload }
        case 'TOGGLE_FILTER_STORAGE': {
            const s = state.activeFilters.storage
            const val = action.payload
            return { ...state, activeFilters: { ...state.activeFilters, storage: s.includes(val) ? s.filter(x => x !== val) : [...s, val] } }
        }
        case 'TOGGLE_FILTER_COLOR': {
            const c = state.activeFilters.colors
            const val = action.payload
            return { ...state, activeFilters: { ...state.activeFilters, colors: c.includes(val) ? c.filter(x => x !== val) : [...c, val] } }
        }
        case 'TOGGLE_FILTER_SERIES': {
            const s = state.activeFilters.series
            const val = action.payload
            return { ...state, activeFilters: { ...state.activeFilters, series: s.includes(val) ? s.filter(x => x !== val) : [...s, val] } }
        }
        case 'SET_PRICE_RANGE':
            return { ...state, activeFilters: { ...state.activeFilters, priceRange: action.payload } }
        case 'ADD_TO_CART': {
            const existing = state.cart.find(item => item.productId === action.payload.id)
            if (existing) {
                return { ...state, cart: state.cart.map(item => item.productId === action.payload.id ? { ...item, qty: item.qty + 1 } : item) }
            }
            return { ...state, cart: [...state.cart, { productId: action.payload.id, qty: 1, product: action.payload }] }
        }
        case 'REMOVE_FROM_CART':
            return { ...state, cart: state.cart.filter(item => item.productId !== action.payload) }
        case 'UPDATE_QTY':
            if (action.payload.qty <= 0) {
                return { ...state, cart: state.cart.filter(item => item.productId !== action.payload.productId) }
            }
            return { ...state, cart: state.cart.map(item => item.productId === action.payload.productId ? { ...item, qty: action.payload.qty } : item) }
        case 'CLEAR_CART':
            return { ...state, cart: [] }
        case 'TOGGLE_WISHLIST': {
            const w = state.wishlist
            const id = action.payload
            return { ...state, wishlist: w.includes(id) ? w.filter(x => x !== id) : [...w, id] }
        }
        case 'TOGGLE_CART_DRAWER':
            return { ...state, cartDrawerOpen: !state.cartDrawerOpen }
        case 'CLOSE_CART_DRAWER':
            return { ...state, cartDrawerOpen: false }
        case 'SET_NOTIFICATION':
            return { ...state, notification: action.payload }
        case 'CLEAR_NOTIFICATION':
            return { ...state, notification: null }
        case 'SET_CHECKOUT_STEP':
            return { ...state, checkoutStep: action.payload }
        case 'SET_PAYMENT_METHOD':
            return { ...state, paymentMethod: action.payload }
        case 'APPLY_COUPON':
            if (action.payload.toUpperCase() === 'BABA10') {
                return { ...state, couponCode: action.payload, couponApplied: true }
            }
            return { ...state, couponCode: action.payload, couponApplied: false }
        case 'PLACE_ORDER': {
            const orderId = 'BABA-' + Math.floor(10000 + Math.random() * 90000)
            const order = { id: orderId, items: [...state.cart], total: action.payload, date: new Date().toISOString() }
            return { ...state, orders: [...state.orders, order], cart: [], currentView: 'order-confirmed', cartDrawerOpen: false, couponCode: '', couponApplied: false, checkoutStep: 0, lastOrder: order }
        }
        default:
            return state
    }
}

export function AppProvider({ children }) {
    const [state, dispatch] = useReducer(appReducer, initialState)

    // --- Browser history integration ---
    const pushHistory = useCallback((view, extra = {}) => {
        const historyState = { view, ...extra }
        window.history.pushState(historyState, '', '')
    }, [])

    // Listen for browser back/forward
    useEffect(() => {
        // Set initial history entry
        window.history.replaceState({ view: 'home' }, '', '')

        const handlePopState = (e) => {
            const histState = e.state
            if (!histState) return

            // Restore the view from history without pushing a new entry
            if (histState.view === 'admin-page' && histState.adminView) {
                // Navigating within admin panel
                dispatch({ type: 'SET_ADMIN_VIEW', payload: histState.adminView })
            } else if (histState.view === 'admin') {
                dispatch({ type: 'SET_ADMIN_VIEW', payload: 'dashboard' })
                if (!state.isAdminMode) dispatch({ type: 'TOGGLE_ADMIN' })
            } else if (histState.view === 'category' && histState.category) {
                if (state.isAdminMode) dispatch({ type: 'TOGGLE_ADMIN' })
                dispatch({ type: 'SET_CATEGORY', payload: histState.category })
            } else if (histState.view === 'product' && histState.product) {
                if (state.isAdminMode) dispatch({ type: 'TOGGLE_ADMIN' })
                dispatch({ type: 'SET_PRODUCT', payload: histState.product })
            } else {
                if (state.isAdminMode) dispatch({ type: 'TOGGLE_ADMIN' })
                dispatch({ type: 'NAVIGATE', payload: histState.view || 'home' })
            }
            window.scrollTo(0, 0)
        }

        window.addEventListener('popstate', handlePopState)
        return () => window.removeEventListener('popstate', handlePopState)
    }, [])

    const showNotification = useCallback((message, type = 'success') => {
        dispatch({ type: 'SET_NOTIFICATION', payload: { message, type } })
        setTimeout(() => dispatch({ type: 'CLEAR_NOTIFICATION' }), 3000)
    }, [])

    const navigate = useCallback((view) => {
        dispatch({ type: 'NAVIGATE', payload: view })
        pushHistory(view)
        window.scrollTo(0, 0)
    }, [pushHistory])

    // Wrap dispatch to intercept navigation actions and push history
    const enhancedDispatch = useCallback((action) => {
        dispatch(action)
        if (action.type === 'SET_CATEGORY') {
            pushHistory('category', { category: action.payload })
            window.scrollTo(0, 0)
        } else if (action.type === 'SET_PRODUCT') {
            pushHistory('product', { product: action.payload })
            window.scrollTo(0, 0)
        } else if (action.type === 'TOGGLE_ADMIN') {
            pushHistory('admin')
        } else if (action.type === 'SET_ADMIN_VIEW') {
            pushHistory('admin-page', { adminView: action.payload })
        } else if (action.type === 'PLACE_ORDER') {
            pushHistory('order-confirmed')
        }
    }, [pushHistory])

    const addToCart = useCallback((product) => {
        dispatch({ type: 'ADD_TO_CART', payload: product })
        showNotification(`${product.name} added to cart!`)
    }, [showNotification])

    const value = { state, dispatch: enhancedDispatch, showNotification, navigate, addToCart }

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
    const context = useContext(AppContext)
    if (!context) throw new Error('useApp must be used within AppProvider')
    return context
}

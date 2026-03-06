import React, { useEffect } from 'react'
import { AppProvider, useApp } from './context/AppContext'
import Header from './components/Header'
import Footer from './components/Footer'
import Toast from './components/Toast'
import CartDrawer from './components/CartDrawer'
import HomePage from './pages/HomePage'
import CategoryPage from './pages/CategoryPage'
import ProductDetailPage from './pages/ProductDetailPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import OrderConfirmedPage from './pages/OrderConfirmedPage'
import RepairPage from './pages/RepairPage'
import AdminLayout from './pages/admin/AdminLayout'
import AdminDashboard from './pages/admin/AdminDashboard'
import InventoryPage from './pages/admin/InventoryPage'
import RepairOrdersPage from './pages/admin/RepairOrdersPage'
import CustomerDirectoryPage from './pages/admin/CustomerDirectoryPage'
import AnalyticsPage from './pages/admin/AnalyticsPage'
import DeploymentPage from './pages/admin/DeploymentPage'

function AppContent() {
    const { state } = useApp()

    useEffect(() => {
        if (state.darkMode) {
            document.documentElement.classList.add('dark')
            document.body.className = 'font-sans antialiased bg-bg-dark text-white'
        } else {
            document.documentElement.classList.remove('dark')
            document.body.className = 'font-sans antialiased bg-bg-light text-text-primary'
        }
    }, [state.darkMode])

    // Admin pages
    if (state.isAdminMode) {
        const adminPage = () => {
            switch (state.currentAdminView) {
                case 'inventory': return <InventoryPage />
                case 'repair-orders': return <RepairOrdersPage />
                case 'customers': return <CustomerDirectoryPage />
                case 'analytics': return <AnalyticsPage />
                case 'deployment': return <DeploymentPage />
                default: return <AdminDashboard />
            }
        }

        return (
            <>
                <AdminLayout>{adminPage()}</AdminLayout>
                <Toast />
            </>
        )
    }

    // Customer pages
    const renderPage = () => {
        switch (state.currentView) {
            case 'category': return <CategoryPage />
            case 'product': return <ProductDetailPage />
            case 'cart': return <CartPage />
            case 'checkout': return <CheckoutPage />
            case 'order-confirmed': return <OrderConfirmedPage />
            case 'repair': return <RepairPage />
            default: return <HomePage />
        }
    }

    return (
        <div className={state.darkMode ? 'bg-bg-dark min-h-screen' : 'bg-bg-light min-h-screen'}>
            <Header />
            <main>{renderPage()}</main>
            <Footer />
            <CartDrawer />
            <Toast />
        </div>
    )
}

export default function App() {
    return (
        <AppProvider>
            <AppContent />
        </AppProvider>
    )
}

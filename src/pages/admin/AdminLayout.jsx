import React from 'react'
import { useApp } from '../../context/AppContext'

const navItems = [
    { id: 'dashboard', icon: 'dashboard', label: 'Dashboard' },
    { id: 'inventory', icon: 'inventory_2', label: 'Inventory' },
    { id: 'repair-orders', icon: 'build', label: 'Repair Orders' },
    { id: 'customers', icon: 'group', label: 'Customers' },
    { id: 'analytics', icon: 'analytics', label: 'Analytics' },
    { id: 'deployment', icon: 'rocket_launch', label: 'Deployment' },
]

export default function AdminLayout({ children }) {
    const { state, dispatch, showNotification } = useApp()

    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <aside className="w-56 bg-gradient-to-b from-bg-dark to-primary/90 text-white shrink-0 flex flex-col fixed h-full z-40">
                <div className="p-5 border-b border-white/10">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                            <span className="font-extrabold text-xs">B</span>
                        </div>
                        <div>
                            <p className="font-bold text-xs leading-tight">Baba The Hi-Tech</p>
                            <p className="text-[9px] text-white/50 uppercase tracking-widest">Admin Dashboard</p>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 py-4 px-3 space-y-1">
                    {navItems.map(item => (
                        <button
                            key={item.id}
                            onClick={() => dispatch({ type: 'SET_ADMIN_VIEW', payload: item.id })}
                            className={`admin-nav-item w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition ${state.currentAdminView === item.id ? 'active bg-white/10 text-white' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
                        >
                            <span className="material-symbols-outlined text-lg">{item.icon}</span>
                            {item.label}
                        </button>
                    ))}
                </nav>

                <div className="p-4">
                    <button
                        onClick={() => { showNotification('Deploying to production... 🚀'); setTimeout(() => showNotification('Deployment successful! ✅'), 2000) }}
                        className="w-full bg-white/20 hover:bg-white/30 text-white font-bold text-sm py-2.5 rounded-btn transition flex items-center justify-center gap-2"
                    >
                        <span className="material-symbols-outlined text-lg">rocket_launch</span>
                        Deploy Site
                    </button>
                </div>
            </aside>

            {/* Main */}
            <div className="flex-1 ml-56">
                {/* Top Bar */}
                <div className={`sticky top-0 z-30 px-6 py-3 flex items-center justify-between border-b ${state.darkMode ? 'bg-bg-dark/95 border-gray-800' : 'bg-white/95 border-gray-100'} backdrop-blur-xl`}>
                    <div className={`flex items-center gap-2 px-3 py-2 rounded-xl ${state.darkMode ? 'bg-surface-dark' : 'bg-bg-light'} w-72`}>
                        <span className="material-symbols-outlined text-text-secondary text-lg">search</span>
                        <input placeholder="Search admin..." className={`bg-transparent outline-none text-sm w-full ${state.darkMode ? 'text-white' : ''}`} />
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="relative p-2"><span className="material-symbols-outlined text-text-secondary">notifications</span><span className="absolute top-1 right-1 w-2 h-2 bg-danger rounded-full" /></button>
                        <button className="p-2"><span className="material-symbols-outlined text-text-secondary">settings</span></button>
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">A</div>
                            <div className="hidden sm:block">
                                <p className={`text-sm font-semibold ${state.darkMode ? 'text-white' : ''}`}>Admin User</p>
                                <p className="text-[10px] text-text-secondary">Super Admin</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className={`p-6 min-h-screen ${state.darkMode ? 'bg-bg-dark' : 'bg-bg-light'}`}>
                    {children}
                </div>
            </div>
        </div>
    )
}

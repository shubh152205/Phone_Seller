import React from 'react'
import { useApp } from '../context/AppContext'

export default function Footer() {
    const { state, dispatch } = useApp()

    return (
        <footer className={`${state.darkMode ? 'bg-bg-dark border-gray-800' : 'bg-gray-50 border-gray-200'} border-t mt-16`}>
            <div className="max-w-content mx-auto px-4 py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center">
                                <span className="text-white font-extrabold text-sm">B</span>
                            </div>
                            <div>
                                <h3 className={`font-extrabold text-sm ${state.darkMode ? 'text-white' : 'text-text-primary'}`}>Baba The Hi-Tech</h3>
                                <p className="text-[10px] text-text-secondary uppercase tracking-wider">Speed Redefined</p>
                            </div>
                        </div>
                        <p className="text-sm text-text-secondary leading-relaxed">India's fastest tech store. Premium smartphones, gadgets & expert repair services with 10-minute delivery.</p>
                    </div>

                    {/* Shopping */}
                    <div>
                        <h4 className={`font-bold text-sm mb-4 ${state.darkMode ? 'text-white' : 'text-text-primary'}`}>Shopping</h4>
                        <ul className="space-y-2.5">
                            {['iPhones', 'Android', 'Audio', 'Watches', 'Chargers', 'Cases'].map(cat => (
                                <li key={cat}>
                                    <button
                                        onClick={() => dispatch({ type: 'SET_CATEGORY', payload: cat.toLowerCase() === 'androids' ? 'android' : cat.toLowerCase() })}
                                        className="text-sm text-text-secondary hover:text-primary transition"
                                    >{cat}</button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className={`font-bold text-sm mb-4 ${state.darkMode ? 'text-white' : 'text-text-primary'}`}>Support</h4>
                        <ul className="space-y-2.5">
                            <li><button onClick={() => dispatch({ type: 'NAVIGATE', payload: 'repair' })} className="text-sm text-text-secondary hover:text-primary transition">Repair Services</button></li>
                            <li><span className="text-sm text-text-secondary">Track Order</span></li>
                            <li><span className="text-sm text-text-secondary">Return Policy</span></li>
                            <li><span className="text-sm text-text-secondary">FAQ</span></li>
                            <li><span className="text-sm text-text-secondary">Contact Us</span></li>
                        </ul>
                    </div>

                    {/* Connect */}
                    <div>
                        <h4 className={`font-bold text-sm mb-4 ${state.darkMode ? 'text-white' : 'text-text-primary'}`}>Connect</h4>
                        <ul className="space-y-2.5">
                            <li><span className="text-sm text-text-secondary">📧 support@babathehistech.in</span></li>
                            <li><span className="text-sm text-text-secondary">📞 1800-BABA-TECH</span></li>
                            <li><span className="text-sm text-text-secondary">📍 Electronic City, Bangalore</span></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom */}
                <div className={`mt-10 pt-6 border-t ${state.darkMode ? 'border-gray-800' : 'border-gray-200'} flex flex-col sm:flex-row justify-between items-center gap-4`}>
                    <p className="text-xs text-text-secondary">© 2024 Baba The Hi-Tech. All rights reserved. Speed redefined. 🚀</p>
                    <button
                        onClick={() => dispatch({ type: 'TOGGLE_ADMIN' })}
                        className="text-xs text-text-secondary hover:text-primary transition font-medium"
                    >
                        {state.isAdminMode ? '← Back to Store' : 'Admin Portal →'}
                    </button>
                </div>
            </div>
        </footer>
    )
}

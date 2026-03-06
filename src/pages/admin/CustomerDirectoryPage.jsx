import React, { useState } from 'react'
import { useApp } from '../../context/AppContext'
import { customers } from '../../data/adminData'
import { formatPrice } from '../../data/products'

export default function CustomerDirectoryPage() {
    const { state } = useApp()
    const [search, setSearch] = useState('')

    const filtered = search ? customers.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase())) : customers

    return (
        <div className="page-enter space-y-6">
            <div className="flex items-center justify-between">
                <h2 className={`text-xl font-extrabold ${state.darkMode ? 'text-white' : ''}`}>Customer Directory</h2>
                <button className="border-2 border-primary text-primary font-bold text-sm px-5 py-2 rounded-btn flex items-center gap-2 hover:bg-primary hover:text-white transition">
                    <span className="material-symbols-outlined text-lg">download</span> Export CSV
                </button>
            </div>

            <div className={`flex items-center gap-2 px-4 py-2.5 rounded-xl ${state.darkMode ? 'bg-surface-dark' : 'bg-white'} shadow-sm max-w-md`}>
                <span className="material-symbols-outlined text-text-secondary text-lg">search</span>
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search customers..." className={`bg-transparent outline-none text-sm w-full ${state.darkMode ? 'text-white' : ''}`} />
            </div>

            <div className={`rounded-card overflow-hidden ${state.darkMode ? 'bg-surface-dark' : 'bg-white'} shadow-sm`}>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className={state.darkMode ? 'bg-gray-800' : 'bg-bg-light'}>
                                {['Customer', 'Phone', 'Email', 'Orders', 'Total Spent', 'Last Active', 'Actions'].map(h => (
                                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-text-secondary">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map(c => (
                                <tr key={c.id} className={`border-t ${state.darkMode ? 'border-gray-700 hover:bg-gray-800/50' : 'border-gray-100 hover:bg-bg-light/50'} transition`}>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xs font-bold">{c.avatar}</div>
                                            <span className={`font-semibold ${state.darkMode ? 'text-white' : ''}`}>{c.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-text-secondary">{c.phone}</td>
                                    <td className="px-4 py-3 text-text-secondary">{c.email}</td>
                                    <td className={`px-4 py-3 ${state.darkMode ? 'text-white' : ''}`}>{c.orders}</td>
                                    <td className={`px-4 py-3 font-semibold ${state.darkMode ? 'text-white' : ''}`}>{formatPrice(c.totalSpent)}</td>
                                    <td className="px-4 py-3 text-text-secondary">{c.lastActive}</td>
                                    <td className="px-4 py-3">
                                        <div className="flex gap-1">
                                            <button className="p-1.5 rounded-lg hover:bg-primary/10 text-text-secondary hover:text-primary transition"><span className="material-symbols-outlined text-lg">visibility</span></button>
                                            <button className="p-1.5 rounded-lg hover:bg-primary/10 text-text-secondary hover:text-primary transition"><span className="material-symbols-outlined text-lg">edit</span></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

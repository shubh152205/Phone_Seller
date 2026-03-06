import React, { useState } from 'react'
import { useApp } from '../../context/AppContext'
import { repairOrders } from '../../data/adminData'

export default function RepairOrdersPage() {
    const { state } = useApp()
    const [filter, setFilter] = useState('All')

    const tabs = ['All', 'Pending', 'In Progress', 'Completed', 'Cancelled']
    const filtered = filter === 'All' ? repairOrders : repairOrders.filter(r => r.status === filter)

    const statusCounts = { Pending: 0, 'In Progress': 0, Completed: 0, Cancelled: 0 }
    repairOrders.forEach(r => { if (statusCounts[r.status] !== undefined) statusCounts[r.status]++ })

    const badge = (s) => {
        const c = { Pending: 'bg-warning/10 text-warning', 'In Progress': 'bg-blue-500/10 text-blue-500', Completed: 'bg-success/10 text-success', Cancelled: 'bg-danger/10 text-danger' }
        return <span className={`text-[10px] font-bold px-2.5 py-1 rounded-badge ${c[s]}`}>{s}</span>
    }

    return (
        <div className="page-enter space-y-6">
            <h2 className={`text-xl font-extrabold ${state.darkMode ? 'text-white' : ''}`}>Repair Orders</h2>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className={`p-4 rounded-2xl ${state.darkMode ? 'bg-surface-dark' : 'bg-white'} shadow-sm`}>
                    <p className="text-xs text-text-secondary">Total Repairs</p>
                    <p className={`text-2xl font-extrabold ${state.darkMode ? 'text-white' : ''}`}>{repairOrders.length}</p>
                </div>
                {Object.entries(statusCounts).slice(0, 3).map(([k, v]) => (
                    <div key={k} className={`p-4 rounded-2xl ${state.darkMode ? 'bg-surface-dark' : 'bg-white'} shadow-sm`}>
                        <p className="text-xs text-text-secondary">{k}</p>
                        <p className={`text-2xl font-extrabold ${state.darkMode ? 'text-white' : ''}`}>{v}</p>
                    </div>
                ))}
            </div>

            {/* Tabs */}
            <div className="flex gap-2 overflow-x-auto hide-scrollbar">
                {tabs.map(t => (
                    <button key={t} onClick={() => setFilter(t)} className={`px-4 py-2 rounded-badge text-sm font-semibold transition whitespace-nowrap ${filter === t ? 'bg-primary text-white' : state.darkMode ? 'bg-surface-dark text-gray-300' : 'bg-white text-text-secondary'}`}>{t}</button>
                ))}
            </div>

            {/* Table */}
            <div className={`rounded-card overflow-hidden ${state.darkMode ? 'bg-surface-dark' : 'bg-white'} shadow-sm`}>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className={state.darkMode ? 'bg-gray-800' : 'bg-bg-light'}>
                                {['Ticket ID', 'Customer', 'Device', 'Issue', 'Technician', 'Status', 'ETA', 'Actions'].map(h => (
                                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-text-secondary">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map(r => (
                                <tr key={r.id} className={`border-t ${state.darkMode ? 'border-gray-700 hover:bg-gray-800/50' : 'border-gray-100 hover:bg-bg-light/50'} transition`}>
                                    <td className={`px-4 py-3 font-mono font-semibold text-primary`}>{r.id}</td>
                                    <td className={`px-4 py-3 ${state.darkMode ? 'text-white' : ''}`}>{r.customer}</td>
                                    <td className="px-4 py-3 text-text-secondary">{r.device}</td>
                                    <td className="px-4 py-3 text-text-secondary">{r.issue}</td>
                                    <td className="px-4 py-3 text-text-secondary">{r.tech}</td>
                                    <td className="px-4 py-3">{badge(r.status)}</td>
                                    <td className={`px-4 py-3 ${state.darkMode ? 'text-white' : ''}`}>{r.eta}</td>
                                    <td className="px-4 py-3">
                                        <button className="text-primary text-xs font-semibold hover:underline">View</button>
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

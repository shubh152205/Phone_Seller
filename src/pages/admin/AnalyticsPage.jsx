import React, { useState } from 'react'
import { useApp } from '../../context/AppContext'
import { revenueChartData, categoryBreakdown, topProducts, repairVolumeData } from '../../data/adminData'
import { formatPrice } from '../../data/products'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts'

export default function AnalyticsPage() {
    const { state } = useApp()
    const [dateRange, setDateRange] = useState('30d')

    const kpis = [
        { label: 'Revenue', value: '₹26,48,000', icon: 'payments' },
        { label: 'Orders', value: '342', icon: 'shopping_bag' },
        { label: 'Avg Order Value', value: '₹7,742', icon: 'monitoring' },
        { label: 'Repair Revenue', value: '₹4,85,000', icon: 'build' },
    ]

    return (
        <div className="page-enter space-y-6">
            <div className="flex items-center justify-between">
                <h2 className={`text-xl font-extrabold ${state.darkMode ? 'text-white' : ''}`}>Business Analytics</h2>
                <select value={dateRange} onChange={e => setDateRange(e.target.value)} className={`px-4 py-2 rounded-xl text-sm border ${state.darkMode ? 'bg-surface-dark border-gray-700 text-white' : 'bg-white border-gray-200'}`}>
                    <option value="7d">Last 7 Days</option>
                    <option value="30d">Last 30 Days</option>
                    <option value="90d">Last 90 Days</option>
                </select>
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {kpis.map(k => (
                    <div key={k.label} className={`p-5 rounded-card ${state.darkMode ? 'bg-surface-dark' : 'bg-white'} shadow-sm`}>
                        <span className={`material-symbols-outlined text-primary mb-2 block`}>{k.icon}</span>
                        <p className="text-xs text-text-secondary">{k.label}</p>
                        <p className={`text-xl font-extrabold ${state.darkMode ? 'text-white' : ''}`}>{k.value}</p>
                    </div>
                ))}
            </div>

            {/* Revenue Chart */}
            <div className={`p-5 rounded-card ${state.darkMode ? 'bg-surface-dark' : 'bg-white'} shadow-sm`}>
                <h3 className={`font-bold mb-5 ${state.darkMode ? 'text-white' : ''}`}>Revenue Over Time</h3>
                <ResponsiveContainer width="100%" height={280}>
                    <AreaChart data={revenueChartData}>
                        <defs>
                            <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#4b1d95" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#4b1d95" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke={state.darkMode ? '#374151' : '#f0f0f0'} />
                        <XAxis dataKey="date" tick={{ fontSize: 12, fill: '#64748b' }} />
                        <YAxis tick={{ fontSize: 12, fill: '#64748b' }} />
                        <Tooltip />
                        <Area type="monotone" dataKey="revenue" stroke="#4b1d95" fill="url(#colorRev)" strokeWidth={2.5} />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {/* Pie Chart */}
                <div className={`p-5 rounded-card ${state.darkMode ? 'bg-surface-dark' : 'bg-white'} shadow-sm`}>
                    <h3 className={`font-bold mb-5 ${state.darkMode ? 'text-white' : ''}`}>Category Breakdown</h3>
                    <ResponsiveContainer width="100%" height={240}>
                        <PieChart>
                            <Pie data={categoryBreakdown} cx="50%" cy="50%" innerRadius={60} outerRadius={90} dataKey="value" label={({ name, value }) => `${name} ${value}%`}>
                                {categoryBreakdown.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Repair Volume */}
                <div className={`p-5 rounded-card ${state.darkMode ? 'bg-surface-dark' : 'bg-white'} shadow-sm`}>
                    <h3 className={`font-bold mb-5 ${state.darkMode ? 'text-white' : ''}`}>Repair Volume by Type</h3>
                    <ResponsiveContainer width="100%" height={240}>
                        <BarChart data={repairVolumeData}>
                            <CartesianGrid strokeDasharray="3 3" stroke={state.darkMode ? '#374151' : '#f0f0f0'} />
                            <XAxis dataKey="type" tick={{ fontSize: 11, fill: '#64748b' }} />
                            <YAxis tick={{ fontSize: 12, fill: '#64748b' }} />
                            <Tooltip />
                            <Bar dataKey="count" fill="#4b1d95" radius={[6, 6, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Top Products */}
            <div className={`rounded-card overflow-hidden ${state.darkMode ? 'bg-surface-dark' : 'bg-white'} shadow-sm`}>
                <div className="p-5"><h3 className={`font-bold ${state.darkMode ? 'text-white' : ''}`}>Top Selling Products</h3></div>
                <table className="w-full text-sm">
                    <thead>
                        <tr className={state.darkMode ? 'bg-gray-800' : 'bg-bg-light'}>
                            {['Rank', 'Product', 'Units Sold', 'Revenue'].map(h => (
                                <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-text-secondary">{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {topProducts.map(p => (
                            <tr key={p.rank} className={`border-t ${state.darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                                <td className="px-4 py-3">
                                    <span className={`w-7 h-7 rounded-full inline-flex items-center justify-center text-xs font-bold ${p.rank <= 3 ? 'bg-primary text-white' : state.darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200'}`}>#{p.rank}</span>
                                </td>
                                <td className={`px-4 py-3 font-semibold ${state.darkMode ? 'text-white' : ''}`}>{p.name}</td>
                                <td className={`px-4 py-3 ${state.darkMode ? 'text-white' : ''}`}>{p.units}</td>
                                <td className="px-4 py-3 font-semibold text-primary">{formatPrice(p.revenue)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

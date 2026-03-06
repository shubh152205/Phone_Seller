import React from 'react'
import { useApp } from '../../context/AppContext'
import { salesChartData, activityFeed } from '../../data/adminData'
import { formatPrice } from '../../data/products'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

export default function AdminDashboard() {
    const { state } = useApp()

    const stats = [
        { label: 'Total Sales', value: '₹12,84,000', change: '+12.5%', positive: true, icon: 'trending_up' },
        { label: 'Active Repairs', value: '42 Units', change: '+5%', positive: true, icon: 'build' },
        { label: 'Pending Shipments', value: '15 Orders', change: '-2.3%', positive: false, icon: 'local_shipping' },
    ]

    return (
        <div className="page-enter space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {stats.map(s => (
                    <div key={s.label} className={`p-5 rounded-card ${state.darkMode ? 'bg-surface-dark' : 'bg-white'} shadow-sm`}>
                        <div className="flex items-center justify-between mb-3">
                            <span className={`w-10 h-10 rounded-xl flex items-center justify-center ${state.darkMode ? 'bg-primary/20' : 'bg-primary-faint'}`}>
                                <span className="material-symbols-outlined text-primary">{s.icon}</span>
                            </span>
                            <span className={`text-xs font-bold px-2 py-1 rounded-badge ${s.positive ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'}`}>{s.change}</span>
                        </div>
                        <p className="text-sm text-text-secondary">{s.label}</p>
                        <p className={`text-2xl font-extrabold ${state.darkMode ? 'text-white' : 'text-text-primary'}`}>{s.value}</p>
                    </div>
                ))}
            </div>

            {/* Charts & Activity */}
            <div className="grid lg:grid-cols-[1fr_340px] gap-6">
                {/* Chart */}
                <div className={`p-5 rounded-card ${state.darkMode ? 'bg-surface-dark' : 'bg-white'} shadow-sm`}>
                    <div className="flex items-center justify-between mb-5">
                        <h3 className={`font-bold ${state.darkMode ? 'text-white' : ''}`}>Sales & Repair Trends</h3>
                        <select className={`text-xs px-3 py-1.5 rounded-lg border ${state.darkMode ? 'bg-bg-dark border-gray-700 text-white' : 'bg-bg-light border-gray-200'}`}>
                            <option>Last 30 Days</option>
                            <option>Last 7 Days</option>
                            <option>Last 90 Days</option>
                        </select>
                    </div>
                    <ResponsiveContainer width="100%" height={280}>
                        <LineChart data={salesChartData}>
                            <CartesianGrid strokeDasharray="3 3" stroke={state.darkMode ? '#374151' : '#f0f0f0'} />
                            <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#64748b' }} />
                            <YAxis tick={{ fontSize: 12, fill: '#64748b' }} />
                            <Tooltip contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', background: state.darkMode ? '#1e1b2e' : '#fff' }} />
                            <Legend />
                            <Line type="monotone" dataKey="sales" stroke="#4b1d95" strokeWidth={2.5} dot={{ r: 4 }} name="Sales Revenue" />
                            <Line type="monotone" dataKey="repairs" stroke="#a78bfa" strokeWidth={2} dot={{ r: 3 }} name="Repair Volume" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Activity Feed */}
                <div className={`p-5 rounded-card ${state.darkMode ? 'bg-surface-dark' : 'bg-white'} shadow-sm`}>
                    <h3 className={`font-bold mb-4 ${state.darkMode ? 'text-white' : ''}`}>Recent Activity</h3>
                    <div className="space-y-4">
                        {activityFeed.map((a, i) => (
                            <div key={i} className="flex gap-3">
                                <div className={`w-9 h-9 rounded-xl ${a.color} text-white flex items-center justify-center shrink-0`}>
                                    <span className="material-symbols-outlined text-sm">{a.icon}</span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className={`text-sm font-semibold truncate ${state.darkMode ? 'text-white' : ''}`}>{a.title}</p>
                                    <p className="text-xs text-text-secondary truncate">{a.subtitle}</p>
                                </div>
                                <span className="text-[10px] text-text-secondary shrink-0">{a.time}</span>
                            </div>
                        ))}
                    </div>
                    <button className="w-full mt-4 text-primary text-sm font-semibold hover:underline">View All Activity →</button>
                </div>
            </div>

            {/* System Status */}
            <div className={`p-4 rounded-2xl flex items-center justify-between ${state.darkMode ? 'bg-surface-dark' : 'bg-white'} shadow-sm`}>
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-success rounded-full" />
                    <span className={`text-sm font-medium ${state.darkMode ? 'text-white' : ''}`}>All services operational</span>
                </div>
                <span className="text-xs text-text-secondary">Last Deployment: 14 minutes ago</span>
            </div>
        </div>
    )
}

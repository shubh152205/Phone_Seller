import React, { useState } from 'react'
import { useApp } from '../../context/AppContext'
import { inventoryItems } from '../../data/adminData'
import { formatPrice } from '../../data/products'

export default function InventoryPage() {
    const { state } = useApp()
    const [search, setSearch] = useState('')
    const [filterCat, setFilterCat] = useState('all')
    const [filterStock, setFilterStock] = useState('all')
    const [page, setPage] = useState(1)
    const perPage = 10

    let items = inventoryItems
    if (search) items = items.filter(i => i.name.toLowerCase().includes(search.toLowerCase()) || i.sku.toLowerCase().includes(search.toLowerCase()))
    if (filterCat !== 'all') items = items.filter(i => i.category === filterCat)
    if (filterStock !== 'all') items = items.filter(i => i.status === filterStock)

    const total = items.length
    const paged = items.slice((page - 1) * perPage, page * perPage)
    const totalPages = Math.ceil(total / perPage)

    const statusBadge = (s) => {
        const colors = { 'In Stock': 'bg-success/10 text-success', 'Low Stock': 'bg-warning/10 text-warning', 'Out of Stock': 'bg-danger/10 text-danger' }
        return <span className={`text-[10px] font-bold px-2.5 py-1 rounded-badge ${colors[s]}`}>{s}</span>
    }

    return (
        <div className="page-enter space-y-6">
            <div className="flex items-center justify-between">
                <h2 className={`text-xl font-extrabold ${state.darkMode ? 'text-white' : ''}`}>Inventory Management</h2>
                <button className="bg-primary text-white font-bold text-sm px-5 py-2.5 rounded-btn shadow-btn flex items-center gap-2">
                    <span className="material-symbols-outlined text-lg">add</span> Add Product
                </button>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3">
                <div className={`flex items-center gap-2 px-3 py-2 rounded-xl ${state.darkMode ? 'bg-surface-dark' : 'bg-white'} flex-1 min-w-[200px]`}>
                    <span className="material-symbols-outlined text-text-secondary text-lg">search</span>
                    <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products..." className={`bg-transparent outline-none text-sm w-full ${state.darkMode ? 'text-white' : ''}`} />
                </div>
                <select value={filterCat} onChange={e => setFilterCat(e.target.value)} className={`px-4 py-2 rounded-xl text-sm border ${state.darkMode ? 'bg-surface-dark border-gray-700 text-white' : 'bg-white border-gray-200'}`}>
                    <option value="all">All Categories</option>
                    <option value="iphones">iPhones</option>
                    <option value="android">Android</option>
                    <option value="audio">Audio</option>
                    <option value="watches">Watches</option>
                    <option value="chargers">Chargers</option>
                    <option value="cases">Cases</option>
                </select>
                <select value={filterStock} onChange={e => setFilterStock(e.target.value)} className={`px-4 py-2 rounded-xl text-sm border ${state.darkMode ? 'bg-surface-dark border-gray-700 text-white' : 'bg-white border-gray-200'}`}>
                    <option value="all">All Status</option>
                    <option value="In Stock">In Stock</option>
                    <option value="Low Stock">Low Stock</option>
                    <option value="Out of Stock">Out of Stock</option>
                </select>
            </div>

            {/* Table */}
            <div className={`rounded-card overflow-hidden ${state.darkMode ? 'bg-surface-dark' : 'bg-white'} shadow-sm`}>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className={state.darkMode ? 'bg-gray-800' : 'bg-bg-light'}>
                                {['Product', 'SKU', 'Category', 'Price', 'Stock', 'Status', 'Actions'].map(h => (
                                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-text-secondary">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {paged.map(item => (
                                <tr key={item.id} className={`border-t ${state.darkMode ? 'border-gray-700 hover:bg-gray-800/50' : 'border-gray-100 hover:bg-bg-light/50'} transition`}>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-3">
                                            <span className="text-2xl">{item.image}</span>
                                            <span className={`font-semibold ${state.darkMode ? 'text-white' : ''}`}>{item.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-text-secondary font-mono text-xs">{item.sku}</td>
                                    <td className="px-4 py-3 text-text-secondary capitalize">{item.category}</td>
                                    <td className={`px-4 py-3 font-semibold ${state.darkMode ? 'text-white' : ''}`}>{formatPrice(item.price)}</td>
                                    <td className={`px-4 py-3 ${state.darkMode ? 'text-white' : ''}`}>{item.stock}</td>
                                    <td className="px-4 py-3">{statusBadge(item.status)}</td>
                                    <td className="px-4 py-3">
                                        <div className="flex gap-1">
                                            <button className="p-1.5 rounded-lg hover:bg-primary/10 text-text-secondary hover:text-primary transition"><span className="material-symbols-outlined text-lg">edit</span></button>
                                            <button className="p-1.5 rounded-lg hover:bg-danger/10 text-text-secondary hover:text-danger transition"><span className="material-symbols-outlined text-lg">delete</span></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {totalPages > 1 && (
                    <div className={`px-4 py-3 flex items-center justify-between border-t ${state.darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                        <span className="text-xs text-text-secondary">Page {page} of {totalPages}</span>
                        <div className="flex gap-1">
                            {Array.from({ length: totalPages }, (_, i) => (
                                <button key={i} onClick={() => setPage(i + 1)} className={`w-8 h-8 rounded-lg text-xs font-bold ${page === i + 1 ? 'bg-primary text-white' : 'text-text-secondary hover:bg-gray-100'}`}>{i + 1}</button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

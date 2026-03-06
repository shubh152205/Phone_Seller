import React from 'react'
import { useApp } from '../context/AppContext'

export default function Toast() {
    const { state } = useApp()
    if (!state.notification) return null

    const colors = {
        success: 'bg-success',
        error: 'bg-danger',
        warning: 'bg-warning',
        info: 'bg-primary',
    }

    const icons = {
        success: 'check_circle',
        error: 'error',
        warning: 'warning',
        info: 'info',
    }

    return (
        <div className="fixed top-20 right-4 z-[100] toast-enter">
            <div className={`${colors[state.notification.type] || colors.success} text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 min-w-[280px]`}>
                <span className="material-symbols-outlined">{icons[state.notification.type] || icons.success}</span>
                <p className="text-sm font-semibold">{state.notification.message}</p>
            </div>
        </div>
    )
}

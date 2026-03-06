import React, { useState } from 'react'
import { useApp } from '../../context/AppContext'
import { deploymentHistory } from '../../data/adminData'

export default function DeploymentPage() {
    const { state, showNotification } = useApp()
    const [deploying, setDeploying] = useState(null)

    const environments = [
        { name: 'Production', url: 'babathehistech.in', status: 'Live', lastDeploy: '14 minutes ago', color: 'bg-success' },
        { name: 'Staging', url: 'staging.babathehistech.in', status: 'Live', lastDeploy: '2 hours ago', color: 'bg-blue-500' },
        { name: 'Development', url: 'dev.babathehistech.in', status: 'Live', lastDeploy: '30 minutes ago', color: 'bg-warning' },
    ]

    const handleDeploy = (env) => {
        setDeploying(env)
        setTimeout(() => { setDeploying(null); showNotification(`Deployed to ${env} successfully! ✅`) }, 2500)
    }

    return (
        <div className="page-enter space-y-6">
            <h2 className={`text-xl font-extrabold ${state.darkMode ? 'text-white' : ''}`}>Deployment Settings</h2>

            {/* Environment Cards */}
            <div className="grid md:grid-cols-3 gap-5">
                {environments.map(env => (
                    <div key={env.name} className={`p-5 rounded-card ${state.darkMode ? 'bg-surface-dark' : 'bg-white'} shadow-sm`}>
                        <div className="flex items-center justify-between mb-3">
                            <h3 className={`font-bold ${state.darkMode ? 'text-white' : ''}`}>{env.name}</h3>
                            <span className={`flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-badge ${env.color}/10`}>
                                <span className={`w-2 h-2 rounded-full ${env.color}`} />{env.status}
                            </span>
                        </div>
                        <p className="text-xs text-text-secondary mb-1">{env.url}</p>
                        <p className="text-xs text-text-secondary mb-4">Last deployed: {env.lastDeploy}</p>
                        <button
                            onClick={() => handleDeploy(env.name)}
                            disabled={deploying === env.name}
                            className={`w-full py-2.5 rounded-btn text-sm font-bold transition ${deploying === env.name ? 'bg-gray-300 text-gray-500' : 'bg-primary text-white hover:bg-primary-light shadow-btn'} flex items-center justify-center gap-2`}
                        >
                            {deploying === env.name ? (
                                <><span className="material-symbols-outlined text-lg animate-spin-slow">refresh</span> Deploying...</>
                            ) : (
                                <><span className="material-symbols-outlined text-lg">rocket_launch</span> Deploy</>
                            )}
                        </button>
                    </div>
                ))}
            </div>

            {/* Deployment History */}
            <div className={`rounded-card overflow-hidden ${state.darkMode ? 'bg-surface-dark' : 'bg-white'} shadow-sm`}>
                <div className="p-5"><h3 className={`font-bold ${state.darkMode ? 'text-white' : ''}`}>Deployment History</h3></div>
                <table className="w-full text-sm">
                    <thead>
                        <tr className={state.darkMode ? 'bg-gray-800' : 'bg-bg-light'}>
                            {['Timestamp', 'Deployer', 'Environment', 'Commit', 'Status'].map(h => (
                                <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-text-secondary">{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {deploymentHistory.map(d => (
                            <tr key={d.id} className={`border-t ${state.darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                                <td className="px-4 py-3 text-text-secondary">{d.timestamp}</td>
                                <td className={`px-4 py-3 ${state.darkMode ? 'text-white' : ''}`}>{d.deployer}</td>
                                <td className="px-4 py-3 text-text-secondary">{d.environment}</td>
                                <td className="px-4 py-3 font-mono text-xs text-primary">{d.commit}</td>
                                <td className="px-4 py-3">
                                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-badge ${d.status === 'Success' ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'}`}>{d.status}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* System Health */}
            <div className={`p-5 rounded-card ${state.darkMode ? 'bg-surface-dark' : 'bg-white'} shadow-sm`}>
                <h3 className={`font-bold mb-4 ${state.darkMode ? 'text-white' : ''}`}>System Health</h3>
                <div className="grid grid-cols-3 gap-4">
                    {['API Status', 'DB Status', 'CDN Status'].map(s => (
                        <div key={s} className={`p-4 rounded-2xl flex items-center gap-3 ${state.darkMode ? 'bg-bg-dark' : 'bg-bg-light'}`}>
                            <span className="w-3 h-3 bg-success rounded-full" />
                            <div>
                                <p className={`text-sm font-semibold ${state.darkMode ? 'text-white' : ''}`}>{s}</p>
                                <p className="text-xs text-success font-medium">Operational</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

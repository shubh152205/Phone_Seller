import React, { useState } from 'react'
import { useApp } from '../context/AppContext'
import { repairBrands, repairModels, repairIssues } from '../data/adminData'
import { formatPrice } from '../data/products'

export default function RepairPage() {
    const { state, showNotification } = useApp()
    const [trackId, setTrackId] = useState('')
    const [trackResult, setTrackResult] = useState(null)
    const [brand, setBrand] = useState('')
    const [model, setModel] = useState('')
    const [issue, setIssue] = useState('')
    const [showBooking, setShowBooking] = useState(false)
    const [bookingStep, setBookingStep] = useState(0)

    const estimatedCost = () => {
        if (!brand || !model || !issue) return null
        const issueData = repairIssues.find(i => i.name === issue)
        const brandMultiplier = brand === 'Apple' ? 2.5 : brand === 'Samsung' ? 1.8 : 1.2
        const rawCost = Math.round(issueData.basePrice * brandMultiplier)
        const gst = Math.round(rawCost * 0.18)
        return rawCost + gst
    }

    const handleTrack = () => {
        if (trackId.toUpperCase().startsWith('BTC')) {
            setTrackResult({ status: 'In Progress', detail: 'Screen replacement', eta: '30 mins' })
        } else {
            setTrackResult({ status: 'Not Found', detail: 'Please check your ticket ID', eta: '' })
        }
    }

    const cost = estimatedCost()

    return (
        <div className="page-enter">
            {/* Hero */}
            <section className="bg-gradient-to-br from-bg-dark via-primary/80 to-primary relative overflow-hidden py-20">
                <div className="absolute inset-0 bg-black/20" />
                <div className="max-w-content mx-auto px-4 relative z-10 text-center">
                    <span className="text-5xl block mb-4">🔧</span>
                    <h1 className="text-white text-4xl md:text-5xl font-extrabold mb-3">Smartphone Repair Services</h1>
                    <p className="text-white/70 text-lg mb-8">Expert technicians. Genuine parts. 60-minute guarantee.</p>
                    <button onClick={() => setShowBooking(true)} className="bg-white text-primary font-bold px-8 py-3.5 rounded-btn shadow-btn text-sm hover:shadow-xl transition">
                        Book a Repair Now →
                    </button>
                </div>
            </section>

            <div className="max-w-content mx-auto px-4 py-10 space-y-10">
                {/* Track Repair */}
                <div className={`p-6 rounded-card ${state.darkMode ? 'bg-surface-dark' : 'bg-white'} shadow-sm`}>
                    <h3 className={`font-bold text-lg mb-4 ${state.darkMode ? 'text-white' : ''}`}>🔍 Track Your Repair</h3>
                    <div className="flex gap-3">
                        <input value={trackId} onChange={e => setTrackId(e.target.value)} placeholder="e.g. BTC-123456" className={`flex-1 px-4 py-3 rounded-btn text-sm outline-none border ${state.darkMode ? 'bg-bg-dark border-gray-700 text-white' : 'bg-bg-light border-gray-200'}`} />
                        <button onClick={handleTrack} className="bg-primary text-white font-bold px-6 rounded-btn text-sm shadow-btn">Track Now</button>
                    </div>
                    {trackResult && (
                        <div className={`mt-4 p-4 rounded-2xl ${trackResult.status === 'Not Found' ? 'bg-danger/10 text-danger' : 'bg-success/10 text-success'}`}>
                            <p className="font-bold text-sm">{trackResult.status}</p>
                            <p className="text-sm">{trackResult.detail}{trackResult.eta ? ` — ETA ${trackResult.eta}` : ''}</p>
                        </div>
                    )}
                </div>

                {/* Cost Estimator */}
                <div className={`p-6 rounded-card ${state.darkMode ? 'bg-surface-dark' : 'bg-white'} shadow-sm`}>
                    <h3 className={`font-bold text-lg mb-5 ${state.darkMode ? 'text-white' : ''}`}>💰 Repair Cost Estimator</h3>
                    <div className="grid sm:grid-cols-3 gap-4 mb-6">
                        <select value={brand} onChange={e => { setBrand(e.target.value); setModel('') }} className={`px-4 py-3 rounded-btn text-sm outline-none border ${state.darkMode ? 'bg-bg-dark border-gray-700 text-white' : 'bg-bg-light border-gray-200'}`}>
                            <option value="">Select Brand</option>
                            {repairBrands.map(b => <option key={b}>{b}</option>)}
                        </select>
                        <select value={model} onChange={e => setModel(e.target.value)} className={`px-4 py-3 rounded-btn text-sm outline-none border ${state.darkMode ? 'bg-bg-dark border-gray-700 text-white' : 'bg-bg-light border-gray-200'}`}>
                            <option value="">Select Model</option>
                            {brand && repairModels[brand]?.map(m => <option key={m}>{m}</option>)}
                        </select>
                        <select value={issue} onChange={e => setIssue(e.target.value)} className={`px-4 py-3 rounded-btn text-sm outline-none border ${state.darkMode ? 'bg-bg-dark border-gray-700 text-white' : 'bg-bg-light border-gray-200'}`}>
                            <option value="">Type of Issue</option>
                            {repairIssues.map(i => <option key={i.name}>{i.name}</option>)}
                        </select>
                    </div>
                    {cost && (
                        <div className={`p-5 rounded-2xl text-center ${state.darkMode ? 'bg-primary/20' : 'bg-primary-faint'}`}>
                            <p className="text-sm text-text-secondary mb-1">Estimated Cost</p>
                            <p className="text-3xl font-extrabold text-primary number-smooth">{formatPrice(cost)}</p>
                            <p className="text-xs text-text-secondary mt-1">(Incl. GST)</p>
                            <button onClick={() => { setShowBooking(true); showNotification('Booking initiated!') }} className="mt-4 bg-primary text-white font-bold px-8 py-3 rounded-btn text-sm shadow-btn">Confirm Booking</button>
                        </div>
                    )}
                </div>

                {/* Popular Repairs */}
                <div>
                    <h3 className={`font-bold text-lg mb-5 ${state.darkMode ? 'text-white' : ''}`}>⚡ Most Popular Repairs</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { icon: '📱', name: 'Screen Replacement', price: 'From ₹2,499', desc: 'OLED & LCD screens' },
                            { icon: '🔋', name: 'Battery Swap', price: 'From ₹999', desc: 'Original batteries' },
                            { icon: '💧', name: 'Water Damage', price: 'From ₹1,499', desc: 'Full restoration' },
                            { icon: '📷', name: 'Camera Repair', price: 'From ₹1,199', desc: 'Lens & module' },
                        ].map(s => (
                            <div key={s.name} className={`p-5 rounded-card ${state.darkMode ? 'bg-surface-dark' : 'bg-white'} shadow-sm hover:shadow-card-hover transition cursor-pointer`}>
                                <span className="text-3xl block mb-3">{s.icon}</span>
                                <p className={`font-bold text-sm mb-1 ${state.darkMode ? 'text-white' : ''}`}>{s.name}</p>
                                <p className="text-xs text-text-secondary mb-1">{s.desc}</p>
                                <p className="text-sm font-bold text-primary">{s.price}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Promise Section */}
                <section className="bg-gradient-to-br from-bg-dark to-primary/90 rounded-card py-12 px-8">
                    <h2 className="text-white text-2xl font-extrabold text-center mb-8">Our Hi-Tech Promise ✨</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            { icon: '⏱', title: '60-Minute Repair Guarantee', desc: 'Most repairs completed in under an hour or your money back.' },
                            { icon: '✅', title: 'Genuine Parts Only', desc: 'We only use manufacturer-certified original components.' },
                            { icon: '🛡️', title: '6-Month Service Warranty', desc: 'All repairs backed by our comprehensive 180-day warranty.' },
                        ].map(p => (
                            <div key={p.title} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
                                <span className="text-3xl block mb-3">{p.icon}</span>
                                <p className="text-white font-bold mb-2">{p.title}</p>
                                <p className="text-white/60 text-sm">{p.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Bottom CTAs */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button onClick={() => setShowBooking(true)} className="bg-primary text-white font-bold px-8 py-3 rounded-btn shadow-btn text-sm">Book Free Home Pickup</button>
                    <button className="border-2 border-primary text-primary font-bold px-8 py-3 rounded-btn text-sm">Find a Store Near Me</button>
                    <span className={`flex items-center justify-center gap-2 text-sm font-semibold ${state.darkMode ? 'text-white' : ''}`}>📞 1800-BABA-TECH</span>
                </div>
            </div>

            {/* Booking Modal */}
            {showBooking && (
                <>
                    <div className="fixed inset-0 bg-black/50 z-[80] backdrop-blur-sm" onClick={() => setShowBooking(false)} />
                    <div className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-[90] rounded-card p-6 ${state.darkMode ? 'bg-bg-dark' : 'bg-white'} shadow-2xl`}>
                        <div className="flex justify-between items-center mb-5">
                            <h3 className={`font-bold text-lg ${state.darkMode ? 'text-white' : ''}`}>Book a Repair</h3>
                            <button onClick={() => setShowBooking(false)} className="text-text-secondary"><span className="material-symbols-outlined">close</span></button>
                        </div>
                        {bookingStep === 0 && (
                            <div className="space-y-3">
                                <h4 className="text-sm font-semibold text-text-secondary">Contact Details</h4>
                                <input placeholder="Full Name" className={`w-full px-4 py-3 rounded-btn text-sm outline-none border ${state.darkMode ? 'bg-surface-dark border-gray-700 text-white' : 'bg-bg-light border-gray-200'}`} />
                                <input placeholder="Phone Number" className={`w-full px-4 py-3 rounded-btn text-sm outline-none border ${state.darkMode ? 'bg-surface-dark border-gray-700 text-white' : 'bg-bg-light border-gray-200'}`} />
                                <button onClick={() => setBookingStep(1)} className="w-full bg-primary text-white font-bold py-3 rounded-btn text-sm">Next →</button>
                            </div>
                        )}
                        {bookingStep === 1 && (
                            <div className="space-y-3">
                                <h4 className="text-sm font-semibold text-text-secondary">Device Details</h4>
                                <input placeholder="Device Brand & Model" className={`w-full px-4 py-3 rounded-btn text-sm outline-none border ${state.darkMode ? 'bg-surface-dark border-gray-700 text-white' : 'bg-bg-light border-gray-200'}`} />
                                <input placeholder="Issue Description" className={`w-full px-4 py-3 rounded-btn text-sm outline-none border ${state.darkMode ? 'bg-surface-dark border-gray-700 text-white' : 'bg-bg-light border-gray-200'}`} />
                                <div className="flex gap-2">
                                    <button onClick={() => setBookingStep(0)} className="flex-1 border-2 border-gray-300 rounded-btn py-3 text-sm font-bold">← Back</button>
                                    <button onClick={() => setBookingStep(2)} className="flex-1 bg-primary text-white font-bold py-3 rounded-btn text-sm">Next →</button>
                                </div>
                            </div>
                        )}
                        {bookingStep === 2 && (
                            <div className="space-y-3">
                                <h4 className="text-sm font-semibold text-text-secondary">Schedule Pickup</h4>
                                <input type="date" className={`w-full px-4 py-3 rounded-btn text-sm outline-none border ${state.darkMode ? 'bg-surface-dark border-gray-700 text-white' : 'bg-bg-light border-gray-200'}`} />
                                <select className={`w-full px-4 py-3 rounded-btn text-sm outline-none border ${state.darkMode ? 'bg-surface-dark border-gray-700 text-white' : 'bg-bg-light border-gray-200'}`}>
                                    <option>Morning (9 AM - 12 PM)</option>
                                    <option>Afternoon (12 PM - 3 PM)</option>
                                    <option>Evening (3 PM - 6 PM)</option>
                                </select>
                                <div className="flex gap-2">
                                    <button onClick={() => setBookingStep(1)} className="flex-1 border-2 border-gray-300 rounded-btn py-3 text-sm font-bold">← Back</button>
                                    <button onClick={() => { setShowBooking(false); setBookingStep(0); showNotification('Repair booked! We\'ll contact you shortly. 🔧') }} className="flex-1 bg-primary text-white font-bold py-3 rounded-btn text-sm">Confirm</button>
                                </div>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    )
}

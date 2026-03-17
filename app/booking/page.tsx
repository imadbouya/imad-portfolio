'use client'
import { useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

const TIMES = ['09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '05:00 PM', '05:30 PM']

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay()
}

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export default function BookingPage() {
  const today = new Date()
  const [step, setStep] = useState(1)
  const [month, setMonth] = useState(today.getMonth())
  const [year, setYear] = useState(today.getFullYear())
  const [selectedDay, setSelectedDay] = useState<number | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [form, setForm] = useState({ full_name: '', email: '', phone: '', notes: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const daysInMonth = getDaysInMonth(year, month)
  const firstDay = getFirstDayOfMonth(year, month)

  const prevMonth = () => { if (month === 0) { setMonth(11); setYear(y => y - 1) } else setMonth(m => m - 1) }
  const nextMonth = () => { if (month === 11) { setMonth(0); setYear(y => y + 1) } else setMonth(m => m + 1) }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleConfirm = async () => {
    if (!form.full_name || !form.email) return
    setStatus('loading')
    const bookingDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(selectedDay).padStart(2, '0')}`
    const { error } = await supabase.from('leads').insert([{
      full_name: form.full_name,
      email: form.email,
      business_name: form.phone,
      service_interest: `BOOKING: ${bookingDate} at ${selectedTime} — ${form.notes}`,
    }])
    if (error) { setStatus('error'); return }
    setStatus('success')
  }

  const c = { bg: '#000', card: '#0d0d0d', border: 'rgba(255,255,255,0.08)', cyan: '#00E5C8', text: '#fff', muted: 'rgba(255,255,255,0.4)' }

  if (status === 'success') return (
    <main style={{ background: c.bg, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Sora, sans-serif' }}>
      <div style={{ textAlign: 'center', maxWidth: 480, padding: 40 }}>
        <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'rgba(0,229,200,0.1)', border: '2px solid #00E5C8', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: 28 }}>✓</div>
        <h2 style={{ fontSize: 28, fontWeight: 700, color: c.text, marginBottom: 12 }}>Call booked!</h2>
        <p style={{ fontSize: 15, color: c.muted, lineHeight: 1.7, marginBottom: 8 }}>
          <strong style={{ color: c.cyan }}>{MONTHS[month]} {selectedDay}, {year} at {selectedTime}</strong>
        </p>
        <p style={{ fontSize: 14, color: c.muted, marginBottom: 32 }}>I'll send you a confirmation. See you then.</p>
        <Link href="/" style={{ background: c.cyan, color: '#000', padding: '14px 36px', borderRadius: 100, fontSize: 14, fontWeight: 700, textDecoration: 'none' }}>Back to home</Link>
      </div>
    </main>
  )

  return (
    <main style={{ background: c.bg, minHeight: '100vh', fontFamily: 'Sora, sans-serif', color: c.text }}>
      {/* Navbar */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 48px', borderBottom: `1px solid ${c.border}` }}>
        <Link href="/" style={{ fontSize: 15, fontWeight: 600, color: c.text, textDecoration: 'none' }}>Imad Bouya</Link>
        <span style={{ fontSize: 13, color: c.muted }}>Booking</span>
      </nav>

      <div style={{ maxWidth: 800, margin: '0 auto', padding: '48px 40px' }}>
        {/* Step indicator */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 48 }}>
          {[1, 2].map(s => (
            <div key={s} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: step >= s ? c.cyan : 'rgba(255,255,255,0.08)', color: step >= s ? '#000' : c.muted, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700 }}>{s}</div>
              <span style={{ fontSize: 11, color: step >= s ? c.cyan : c.muted }}>{s === 1 ? 'Pick a time' : 'Confirm'}</span>
            </div>
          ))}
          <div style={{ width: 60, height: 1, background: step >= 2 ? c.cyan : 'rgba(255,255,255,0.1)', marginBottom: 16 }} />
        </div>

        {/* Badges */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ display: 'inline-block', background: 'rgba(0,229,200,0.1)', border: '1px solid rgba(0,229,200,0.25)', color: c.cyan, fontSize: 12, fontWeight: 600, padding: '5px 16px', borderRadius: 100, marginBottom: 20 }}>100% free consultation</div>
          <h1 style={{ fontSize: 'clamp(24px, 3.5vw, 38px)', fontWeight: 700, lineHeight: 1.2, marginBottom: 12 }}>Choose the day and time that works for you</h1>
          <p style={{ fontSize: 14, color: c.muted, marginBottom: 20 }}>During this call I'll understand your business and suggest the best strategy to grow it.</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 20 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,80,80,0.1)', border: '1px solid rgba(255,80,80,0.25)', color: '#ff6060', fontSize: 12, padding: '6px 14px', borderRadius: 100 }}>
              <span style={{ width: 6, height: 6, background: '#ff6060', borderRadius: '50%', display: 'inline-block' }} />
              Only 3 spots left this week
            </div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(0,229,200,0.08)', border: '1px solid rgba(0,229,200,0.2)', color: c.cyan, fontSize: 12, padding: '6px 14px', borderRadius: 100 }}>
              👥 20+ businesses trust me
            </div>
          </div>
        </div>

        {step === 1 && (
          <div style={{ background: c.card, border: `1px solid ${c.border}`, borderRadius: 16, padding: 32 }}>
            {/* Duration */}
            <div style={{ display: 'flex', gap: 24, marginBottom: 32, fontSize: 13, color: c.muted }}>
              <span>⏱ 30 min</span>
              <span>📅 {selectedDay ? `${MONTHS[month]} ${selectedDay}, ${year}` : 'Select a date'}</span>
              <span>🌍 Europe/Paris (GMT+1)</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
              {/* Calendar */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                  <button onClick={prevMonth} style={{ background: 'none', border: `1px solid ${c.border}`, color: c.text, width: 32, height: 32, borderRadius: '50%', cursor: 'pointer', fontSize: 16 }}>‹</button>
                  <span style={{ fontSize: 15, fontWeight: 600 }}>{MONTHS[month]} {year}</span>
                  <button onClick={nextMonth} style={{ background: 'none', border: `1px solid ${c.border}`, color: c.text, width: 32, height: 32, borderRadius: '50%', cursor: 'pointer', fontSize: 16 }}>›</button>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, marginBottom: 8 }}>
                  {DAYS.map(d => <div key={d} style={{ textAlign: 'center', fontSize: 11, color: c.muted, padding: '4px 0' }}>{d}</div>)}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4 }}>
                  {Array(firstDay).fill(null).map((_, i) => <div key={`e${i}`} />)}
                  {Array(daysInMonth).fill(null).map((_, i) => {
                    const day = i + 1
                    const isPast = new Date(year, month, day) < new Date(today.getFullYear(), today.getMonth(), today.getDate())
                    const isSelected = selectedDay === day
                    const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear()
                    return (
                      <button key={day} disabled={isPast} onClick={() => setSelectedDay(day)} style={{
                        background: isSelected ? c.cyan : isToday ? 'rgba(0,229,200,0.1)' : 'transparent',
                        color: isSelected ? '#000' : isPast ? 'rgba(255,255,255,0.15)' : c.text,
                        border: isToday && !isSelected ? `1px solid ${c.cyan}` : '1px solid transparent',
                        borderRadius: '50%', width: 36, height: 36, fontSize: 13, cursor: isPast ? 'not-allowed' : 'pointer', fontFamily: 'Sora, sans-serif',
                      }}>{day}</button>
                    )
                  })}
                </div>
              </div>
              {/* Times */}
              <div>
                <p style={{ fontSize: 13, color: c.muted, marginBottom: 16 }}>{selectedDay ? `Available times for ${MONTHS[month]} ${selectedDay}` : 'Select a date first'}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxHeight: 320, overflowY: 'auto' }}>
                  {selectedDay && TIMES.map(t => (
                    <button key={t} onClick={() => setSelectedTime(t)} style={{ background: selectedTime === t ? c.cyan : 'rgba(255,255,255,0.04)', color: selectedTime === t ? '#000' : c.text, border: `1px solid ${selectedTime === t ? c.cyan : c.border}`, padding: '12px 20px', borderRadius: 8, fontSize: 14, fontFamily: 'Sora, sans-serif', cursor: 'pointer', textAlign: 'left', fontWeight: selectedTime === t ? 700 : 400 }}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div style={{ marginTop: 32, textAlign: 'right' }}>
              <button disabled={!selectedDay || !selectedTime} onClick={() => setStep(2)} style={{ background: selectedDay && selectedTime ? c.cyan : 'rgba(255,255,255,0.1)', color: selectedDay && selectedTime ? '#000' : c.muted, border: 'none', padding: '14px 40px', borderRadius: 100, fontSize: 14, fontWeight: 700, fontFamily: 'Sora, sans-serif', cursor: selectedDay && selectedTime ? 'pointer' : 'not-allowed' }}>
                Next →
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div style={{ background: c.card, border: `1px solid ${c.border}`, borderRadius: 16, padding: 32 }}>
            <div style={{ background: 'rgba(0,229,200,0.05)', border: `1px solid rgba(0,229,200,0.15)`, borderRadius: 10, padding: '16px 20px', marginBottom: 32, fontSize: 14, color: c.muted }}>
              📅 <strong style={{ color: c.text }}>{MONTHS[month]} {selectedDay}, {year}</strong> at <strong style={{ color: c.cyan }}>{selectedTime}</strong> · 30 min · Free
            </div>
            <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 24 }}>Your details</h3>
            {[
              { name: 'full_name', label: 'Full name', placeholder: 'Your name', type: 'text' },
              { name: 'email', label: 'Email', placeholder: 'you@email.com', type: 'email' },
              { name: 'phone', label: 'Phone (optional)', placeholder: '+33 6 12 34 56 78', type: 'text' },
            ].map(f => (
              <div key={f.name} style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: c.muted, marginBottom: 8 }}>{f.label}</label>
                <input name={f.name} type={f.type} value={(form as any)[f.name]} onChange={handleChange} placeholder={f.placeholder}
                  style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: `1px solid ${c.border}`, color: c.text, padding: '12px 16px', fontSize: 14, fontFamily: 'Sora, sans-serif', borderRadius: 8, outline: 'none' }} />
              </div>
            ))}
            <div style={{ marginBottom: 28 }}>
              <label style={{ display: 'block', fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: c.muted, marginBottom: 8 }}>Anything I should know beforehand?</label>
              <input name="notes" value={form.notes} onChange={handleChange} placeholder="My budget, my current situation..."
                style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: `1px solid ${c.border}`, color: c.text, padding: '12px 16px', fontSize: 14, fontFamily: 'Sora, sans-serif', borderRadius: 8, outline: 'none' }} />
            </div>
            <div style={{ display: 'flex', gap: 16 }}>
              <button onClick={() => setStep(1)} style={{ background: 'transparent', color: c.muted, border: `1px solid ${c.border}`, padding: '14px 28px', borderRadius: 100, fontSize: 14, fontFamily: 'Sora, sans-serif', cursor: 'pointer' }}>← Back</button>
              <button onClick={handleConfirm} disabled={status === 'loading'} style={{ flex: 1, background: c.cyan, color: '#000', border: 'none', padding: '14px 28px', borderRadius: 100, fontSize: 14, fontWeight: 700, fontFamily: 'Sora, sans-serif', cursor: 'pointer' }}>
                {status === 'loading' ? 'Confirming...' : 'Confirm Booking ✓'}
              </button>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginTop: 20 }}>
              {['No commitment', '15–25 minutes', 'Your info is safe'].map(t => (
                <span key={t} style={{ fontSize: 12, color: c.muted }}>✓ {t}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

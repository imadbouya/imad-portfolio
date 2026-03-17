'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function LeadForm() {
  const [form, setForm] = useState({ full_name: '', business_name: '', email: '', service_interest: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    if (!form.full_name || !form.email) return
    setStatus('loading')
    const { error } = await supabase.from('leads').insert([form])
    if (error) { setStatus('error'); return }
    setStatus('success')
    setForm({ full_name: '', business_name: '', email: '', service_interest: '' })
  }

  return (
    <div style={{ background: '#0d0d0d', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: 40 }}>
      {status === 'success' ? (
        <div style={{ textAlign: 'center', padding: '40px 0' }}>
          <div style={{ fontSize: 40, marginBottom: 16 }}>✓</div>
          <p style={{ fontSize: 18, fontWeight: 600, color: '#00E5C8', marginBottom: 8 }}>Message received!</p>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)' }}>I'll get back to you within 24 hours.</p>
        </div>
      ) : (
        <>
          {(['full_name', 'business_name', 'email', 'service_interest'] as const).map((field) => (
            <div key={field} style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 8 }}>
                {field === 'full_name' ? 'Full name' : field === 'business_name' ? 'Business name' : field === 'email' ? 'Email' : 'What are you looking for?'}
              </label>
              <input
                name={field}
                type={field === 'email' ? 'email' : 'text'}
                value={form[field]}
                onChange={handleChange}
                placeholder={field === 'full_name' ? 'Your name' : field === 'business_name' ? 'Your business' : field === 'email' ? 'you@email.com' : 'Lead gen, paid ads, strategy...'}
                style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', padding: '12px 16px', fontSize: 14, fontFamily: 'Sora, sans-serif', borderRadius: 8, outline: 'none' }}
              />
            </div>
          ))}
          <button
            onClick={handleSubmit}
            disabled={status === 'loading'}
            style={{ width: '100%', background: '#00E5C8', color: '#000', border: 'none', padding: '16px', fontSize: 14, fontWeight: 700, fontFamily: 'Sora, sans-serif', borderRadius: 100, cursor: 'pointer', marginBottom: 12 }}
          >
            {status === 'loading' ? 'Sending...' : 'Send Message'}
          </button>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', textAlign: 'center', lineHeight: 1.6 }}>
            No spam. No pitch calls unless you want one. I read every message personally.
          </p>
          <div style={{ marginTop: 20, padding: '18px 20px', background: 'rgba(0,229,200,0.05)', border: '1px solid rgba(0,229,200,0.2)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)' }}>Prefer to talk directly?</span>
            <a href="/booking" style={{ fontSize: 12, fontWeight: 600, color: '#00E5C8', textDecoration: 'none', letterSpacing: '0.05em' }}>Book a free call →</a>
          </div>
        </>
      )}
    </div>
  )
}

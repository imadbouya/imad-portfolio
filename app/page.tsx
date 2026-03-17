import LeadForm from '@/components/LeadForm'
import Link from 'next/link'

const stats = [
  { icon: '⏱', num: '24/7', label: 'Always available' },
  { icon: '📦', num: '3+', label: 'Years experience' },
  { icon: '👥', num: '20+', label: 'Happy clients' },
  { icon: '📈', num: '4.8×', label: 'ROI delivered' },
]

const services = [
  { name: 'Meta Ads Management', desc: 'Full campaign setup, CBO/ABO structure, audience targeting, creative briefing, and ongoing optimization for Facebook & Instagram.' },
  { name: 'Lead Generation', desc: 'Qualified lead systems for clinics and local businesses. Leads delivered directly to your inbox or CRM, ready to close.' },
  { name: 'Growth Strategy', desc: 'Market research, competitor analysis, audience profiling, and a data-driven plan to scale your ad spend profitably.' },
]

export default function Home() {
  return (
    <main style={{ background: '#000', color: '#fff', fontFamily: 'Sora, sans-serif', minHeight: '100vh' }}>

      {/* Navbar */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 48px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <span style={{ fontSize: 15, fontWeight: 600 }}>Imad Bouya</span>
        <div style={{ display: 'flex', gap: 32 }}>
          {['Services', 'Results', 'Contact'].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>{l}</a>
          ))}
        </div>
        <Link href="/booking" style={{ background: '#00E5C8', color: '#000', border: 'none', padding: '10px 24px', fontSize: 13, fontWeight: 700, borderRadius: 100, textDecoration: 'none' }}>
          Book a Call
        </Link>
      </nav>

      {/* Hero */}
      <section style={{ maxWidth: 860, margin: '0 auto', padding: '64px 40px 48px', textAlign: 'center' }}>
        <div style={{ display: 'inline-block', background: 'rgba(0,229,200,0.1)', border: '1px solid rgba(0,229,200,0.25)', color: '#00E5C8', fontSize: 12, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', padding: '6px 18px', borderRadius: 100, marginBottom: 28 }}>
          Media Buyer · Paid Ads Specialist
        </div>
        <h1 style={{ fontSize: 'clamp(32px, 4.5vw, 52px)', fontWeight: 700, lineHeight: 1.15, marginBottom: 16 }}>
          I scale businesses with<br />
          <span style={{ color: '#00E5C8' }}>paid ads that actually work</span>
        </h1>
        <p style={{ fontSize: 16, fontWeight: 300, color: 'rgba(255,255,255,0.55)', lineHeight: 1.75, maxWidth: 560, margin: '0 auto 40px' }}>
          Lead generation, Meta Ads strategy, and full-funnel systems for clinics, e-commerce brands, and businesses ready to grow beyond their market.
        </p>

        {/* VSL */}
        <div style={{ maxWidth: 780, margin: '0 auto 44px', borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(0,229,200,0.2)' }}>
          <div style={{ background: '#0a0a0a', aspectRatio: '16/9', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16, position: 'relative' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(0,229,200,0.06) 0%, transparent 70%)' }} />
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(0,229,200,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,200,0.03) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            <div style={{ width: 72, height: 72, borderRadius: '50%', border: '2px solid #00E5C8', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,229,200,0.1)', position: 'relative', zIndex: 2 }}>
              <div style={{ width: 0, height: 0, borderStyle: 'solid', borderWidth: '11px 0 11px 20px', borderColor: 'transparent transparent transparent #00E5C8', marginLeft: 5 }} />
            </div>
            <span style={{ fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', position: 'relative', zIndex: 2 }}>Watch — 2 min intro</span>
          </div>
        </div>

        {/* CTA */}
        <Link href="/booking" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: '#00E5C8', color: '#000', padding: '18px 52px', fontSize: 16, fontWeight: 700, borderRadius: 100, textDecoration: 'none', marginBottom: 20 }}>
          Book a Free Call <span>→</span>
        </Link>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 28 }}>
          {['100% free consultation', 'No commitment', 'Results or we talk'].map(t => (
            <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>
              <div style={{ width: 14, height: 14, borderRadius: '50%', border: '1.5px solid rgba(0,229,200,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: 6, height: 6, background: '#00E5C8', borderRadius: '50%' }} />
              </div>
              {t}
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section style={{ maxWidth: 780, margin: '0 auto 80px', padding: '0 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, background: 'rgba(255,255,255,0.06)', borderRadius: 12, overflow: 'hidden' }}>
          {stats.map(s => (
            <div key={s.num} style={{ background: '#0a0a0a', padding: '28px 20px', textAlign: 'center' }}>
              <div style={{ fontSize: 22, marginBottom: 10 }}>{s.icon}</div>
              <div style={{ fontSize: 30, fontWeight: 700, color: '#00E5C8', lineHeight: 1, marginBottom: 6 }}>{s.num}</div>
              <div style={{ fontSize: 12, fontWeight: 300, color: 'rgba(255,255,255,0.4)' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section id="services" style={{ maxWidth: 860, margin: '0 auto', padding: '0 40px 80px' }}>
        <div style={{ textAlign: 'center', fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#00E5C8', marginBottom: 12 }}>What I offer</div>
        <h2 style={{ textAlign: 'center', fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Services built to grow your business</h2>
        <p style={{ textAlign: 'center', fontSize: 14, fontWeight: 300, color: 'rgba(255,255,255,0.4)', marginBottom: 40 }}>Everything you need to get more leads, more clients, and more revenue.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {services.map(s => (
            <div key={s.name} style={{ background: '#0d0d0d', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, padding: '32px 24px' }}>
              <div style={{ width: 48, height: 48, background: 'rgba(0,229,200,0.08)', borderRadius: 12, marginBottom: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: 20, height: 20, background: 'rgba(0,229,200,0.5)', borderRadius: 4 }} />
              </div>
              <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 10 }}>{s.name}</div>
              <p style={{ fontSize: 13, fontWeight: 300, lineHeight: 1.7, color: 'rgba(255,255,255,0.4)' }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" style={{ maxWidth: 860, margin: '0 auto', padding: '0 40px 80px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'start' }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#00E5C8', marginBottom: 20 }}>Let's talk</div>
          <h2 style={{ fontSize: 36, fontWeight: 700, lineHeight: 1.2, marginBottom: 16 }}>Ready to grow your business?</h2>
          <p style={{ fontSize: 14, fontWeight: 300, color: 'rgba(255,255,255,0.5)', lineHeight: 1.8 }}>
            Leave your details and I'll get back to you within 24 hours. Or skip straight to booking a call — either way, I'll review your situation before we speak.
          </p>
        </div>
        <LeadForm />
      </section>

      {/* Bottom CTA */}
      <section style={{ padding: '64px 40px', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.05)', background: 'linear-gradient(to bottom, #000, #050d0c)' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,80,80,0.1)', border: '1px solid rgba(255,80,80,0.25)', color: '#ff6060', fontSize: 12, fontWeight: 500, padding: '7px 16px', borderRadius: 100, marginBottom: 24 }}>
          <span style={{ width: 6, height: 6, background: '#ff6060', borderRadius: '50%', display: 'inline-block' }} />
          Only 3 spots available this month
        </div>
        <h2 style={{ fontSize: 30, fontWeight: 700, marginBottom: 12 }}>Ready to scale your business?</h2>
        <p style={{ fontSize: 15, fontWeight: 300, color: 'rgba(255,255,255,0.45)', marginBottom: 32 }}>Book a free 30-min strategy call. I'll review your situation before we speak.</p>
        <Link href="/booking" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: '#00E5C8', color: '#000', padding: '18px 52px', fontSize: 16, fontWeight: 700, borderRadius: 100, textDecoration: 'none' }}>
          Book Your Free Call Now <span>→</span>
        </Link>
      </section>

      {/* Footer */}
      <footer style={{ padding: '32px 48px', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)' }}>© 2026 Imad Bouya · Media Buyer</span>
        <div style={{ display: 'flex', gap: 28 }}>
          {['Instagram', 'LinkedIn', 'Email'].map(l => (
            <a key={l} href="#" style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', textDecoration: 'none' }}>{l}</a>
          ))}
        </div>
      </footer>

    </main>
  )
}

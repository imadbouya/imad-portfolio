import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Imad Bouya — Media Buyer & Growth Strategist',
  description: 'I scale businesses with paid ads that actually work. Lead generation, Meta Ads strategy, and full-funnel systems for clinics, e-commerce brands, and businesses ready to grow.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

import './globals.css'
import { Instrument_Serif, Space_Grotesk } from 'next/font/google'
const display = Instrument_Serif({ subsets: ['latin'], weight: '400', style: ['normal', 'italic'], variable: '--font-display' })
const body = Space_Grotesk({ subsets: ['latin'], variable: '--font-body' })
export const metadata = { title: 'Nivaas Studio', description: 'Architecture and interiors, Kochi.' }
export const viewport = { width: 'device-width', initialScale: 1, viewportFit: 'cover', themeColor: '#D9D8D3' }
export default function RootLayout({ children }) {
  return (<html lang="en" className={`${display.variable} ${body.variable}`}><body>{children}</body></html>)
}

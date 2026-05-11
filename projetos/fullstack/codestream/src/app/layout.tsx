import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
  weight: ['400', '500', '700'],
})

export const metadata: Metadata = { title: 'CodeStream — Online IDE' }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <link rel="dns-prefetch" href="https://cdn.jsdelivr.net" />
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="" />
      </head>
      <body style={{ margin: 0, padding: 0, background: '#09090B', color: '#F4F4F5' }}>
        {children}
      </body>
    </html>
  )
}

import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './firebaseApp'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Caravan',
  description: 'portfolio site',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="jp">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

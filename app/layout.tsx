import './globals.css'
import type { Metadata } from 'next'
import { Zen_Kaku_Gothic_Antique } from 'next/font/google'
import './firebaseApp'
import { GoogleAnalytics } from '@next/third-parties/google'

const zenKakuGothicAntique = Zen_Kaku_Gothic_Antique({ weight: '400', subsets: ['latin'] })

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
      <body className={zenKakuGothicAntique.className}>{children}</body>
      <GoogleAnalytics gaId="G-BTDWXL1FC2" />
    </html>
  )
}

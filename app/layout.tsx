import './globals.css'
import type { Metadata } from 'next'
import { Zen_Kaku_Gothic_Antique } from 'next/font/google'
import { initializeFirebaseApp } from '@/app/lib/firebase/init'
import { ToastProvider } from '@/app/context/ToastContext'
import { UserProvider } from '@/app/context/UserContext'
import { Navigation } from '@/app/components/Navigation'
import PrelineScript from '@/app/components/PrelineScript'
import { UserObserver } from '@/app/components/UserObserver'

initializeFirebaseApp()
const zenKakuGothicAntique = Zen_Kaku_Gothic_Antique({ weight: '400', subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Caravan",
  description: "portfolio site",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${zenKakuGothicAntique.className} bg-base`}>
      <UserProvider>
        <ToastProvider>
          <UserObserver />
          <Navigation />
          <main className="m-4">
            {children}
          </main>
        </ToastProvider>
      </UserProvider>
      </body>
    <PrelineScript />
    </html>
  );
}

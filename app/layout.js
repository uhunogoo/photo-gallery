import './globals.css'
import { Inter } from 'next/font/google'
import Navigation from './nav'
import { Suspense } from 'react'
import Scene from './webgl/Scene'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({children}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="relative z-10">
          <Suspense fallback={'Navigation loading...'}>
            <Navigation />
          </Suspense>
          <main className="flex min-h-screen flex-col items-center justify-between p-24">
            { children }
          </main>
        </div>

        <div className="fixed top-0 w-full h-full z-20">
          <Scene/>
        </div>

      </body>
    </html>
  )
}

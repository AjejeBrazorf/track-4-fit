import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import { Navbar } from '@/components/navbar'
import { AuthProvider } from '@/app/plugin/AuthContext'
import { verifySession } from '@/lib/session'
import { siteConfig } from '@/config/siteConfig'

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: '/favicon.ico',
  },
}

export default async function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  // TODO: implementare async Auth()
  const state = await verifySession()

  return (
    <html suppressHydrationWarning lang='en'>
      <head />
      <body>
        <AuthProvider
          value={{
            logged: !!state,
            authUserInfo: state ? { ...state } : null,
          }}>
          <Navbar />
          <main>{children}</main>
          <footer>footer</footer>
        </AuthProvider>
      </body>
    </html>
  )
}

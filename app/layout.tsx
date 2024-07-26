import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import { verifySession } from '@/app/plugin/AuthContext/session'
import { Navbar } from '@/components/navbar'
import { AuthProvider } from '@/app/plugin/AuthContext'
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

const RootLayout = async ({ children }: { children: ReactNode }) => {
  // TODO: implementare async Auth()
  const state = await verifySession()

  return (
    <html suppressHydrationWarning lang='en'>
      <head title={siteConfig.name} />
      <body>
        <AuthProvider
          value={{
            logged: !!state,
            authUserInfo: state?.user ?? null,
          }}>
          <Navbar />
          <main>{children}</main>
          <footer>footer</footer>
        </AuthProvider>
      </body>
    </html>
  )
}

export default RootLayout

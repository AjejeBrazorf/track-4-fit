import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import clsx from 'clsx'

import { verifySession } from '@/app/plugin/AuthContext/session'
import { Navbar } from '@/components/navbar'
import { AuthProvider } from '@/app/plugin/AuthContext'
import { siteConfig } from '@/config/siteConfig'

import '@/styles/globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import satoshi from '@/config/fonts'

import style from './layout.module.scss'

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
  const session = await verifySession()

  return (
    <html suppressHydrationWarning lang='en'>
      <head title={siteConfig.name} />
      <body className={clsx(style.fontSatoshi, satoshi.variable)}>
        <AuthProvider
          value={{
            logged: !!session,
            authUserInfo: session,
          }}>
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            enableColorScheme>
            <Navbar />
            <main className={clsx(style.main, style.fullScreen)}>
              {children}
            </main>
            <footer>footer</footer>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}

export default RootLayout

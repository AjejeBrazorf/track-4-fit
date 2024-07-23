import { PATHS } from '@/config/PATHS'

export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: 'Track 4 Fit',
  description: '',
  navItems: [
    {
      label: 'Home',
      href: PATHS.home,
    },
    {
      label: 'Dashboard',
      href: PATHS.dashboard.index,
    },
  ],
  navMenuItems: [
    {
      label: 'Home',
      href: PATHS.home,
    },
    {
      label: 'Dashboard',
      href: PATHS.dashboard.index,
    },
  ],
  authSecretKey: process.env.AUTH_SECRET,
  authDomain: process.env.AUTH_COOKIE_STORAGE_DOMAIN,
  authCookieName: process.env.AUTH_COOKIE_NAME,
} as const

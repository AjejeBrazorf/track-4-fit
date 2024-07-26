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
  auth: {
    secretKey: process.env.AUTH_SECRET,
    domain: process.env.AUTH_COOKIE_STORAGE_DOMAIN,
    cookieName: process.env.AUTH_COOKIE_NAME,
  },
  apiUrl: process.env.NEXT_PUBLIC_API_URL,
} as const

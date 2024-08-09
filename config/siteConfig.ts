import type { PathName } from '@/config/PATHS'

export type SiteConfig = typeof siteConfig

type NavItem = {
  label: string
  href: PathName
}
export const siteConfig = {
  name: 'Track 4 Fit',
  description: '',
  navItems: [] as NavItem[],
  navMenuItems: [] as NavItem[],
  auth: {
    secretKey: process.env.AUTH_SECRET,
    domain: process.env.AUTH_COOKIE_STORAGE_DOMAIN,
    cookieName: process.env.AUTH_COOKIE_NAME,
  },
  apiUrl: process.env.NEXT_PUBLIC_API_URL,
  graphQLUrl: process.env.NEXT_PUBLIC_GRAPHQL_API_URL ?? '',
} as const

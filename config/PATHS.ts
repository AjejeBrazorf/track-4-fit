import type { PathName } from './PATHS.d'

export type { PathName } from './PATHS.d'
export const PATHS = {
  home: '/',
  signIn: 'sign-in',
  signUp: 'sign-up',
  signOut: 'sign-out',
  dashboard: {
    index: '/dashboard',
  },
} as const

// TODO: implementare middleware Authorization
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const PROTECTED_PATHS: PathName[] = ['/dashboard']

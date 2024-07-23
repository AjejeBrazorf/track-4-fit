'use client'

import { useAuth } from '@/app/plugin/AuthContext'

export function SignInForm({ onSubmit }: { onSubmit?: () => void }) {
  // TODO: Rivedere la gestione degli errori
  // TODO: Rivedere definizione metodi useAuth
  const { signIn } = useAuth()

  return (
    <form action={signIn} onSubmit={onSubmit}>
      <input name='email' type='text' />

      <input name='password' type='password' />

      <button type='submit'>Sign In</button>
    </form>
  )
}

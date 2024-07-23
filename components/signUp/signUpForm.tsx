'use client'

import { useAuth } from '@/app/plugin/AuthContext'

export function SignUpForm() {
  const { signUp } = useAuth()
  return (
    <form action={signUp}>
      <input name='email' type='text' />
      <input name='password' type='password' />
      <button type='submit'>Sign Up</button>
    </form>
  )
}

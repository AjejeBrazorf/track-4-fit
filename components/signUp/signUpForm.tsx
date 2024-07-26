'use client'

import { useAuth } from '@/app/plugin/AuthContext'

export const SignUpForm = ({ onSubmit }: { onSubmit?: () => void }) => {
  const { signUp } = useAuth()
  return (
    <form action={signUp} onSubmit={onSubmit}>
      <input name='email' type='text' />
      <input name='password' type='password' />
      <button type='submit'>Sign Up</button>
    </form>
  )
}

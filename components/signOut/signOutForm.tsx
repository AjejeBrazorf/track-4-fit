'use client'

import { useFormState } from 'react-dom'

import { useAuth } from '@/app/plugin/AuthContext'

export const SignOutForm = () => {
  const { signOut: _signOut } = useAuth()
  const signOut = async () => {
    return _signOut()
  }
  const [_state, action, pending] = useFormState(signOut, undefined)

  return (
    <form action={action}>
      <button aria-disabled={pending} type='submit'>
        {pending ? 'submitting ...' : 'Sign out'}
      </button>
    </form>
  )
}

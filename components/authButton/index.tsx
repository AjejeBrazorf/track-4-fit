'use client'

import { useAuth } from '@/app/plugin/AuthContext'
import { SignOutForm } from '@/components/signOut'
import { SignInModal } from '@/components/signIn/signInModal'

const AuthButton = () => {
  const { state } = useAuth()

  return state.logged ? <SignOutForm /> : <SignInModal />
}

export { AuthButton }

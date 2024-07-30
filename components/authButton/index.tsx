'use client'

import { useAuth } from '@/app/plugin/AuthContext'
import { SignOutForm } from '@/components/signOut'
import { AuthModal } from '@/components/authButton/authModal'

const AuthButton = () => {
  const { state } = useAuth()

  return state.logged ? <SignOutForm /> : <AuthModal />
}

export { AuthButton }

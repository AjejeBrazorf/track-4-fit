'use client'

import { useState } from 'react'

import { SignInForm } from '@/components/signIn/signInForm'

export const SignInModal = () => {
  const [openModal, setOpenModal] = useState(false)

  return (
    <div>
      <button type='button' onClick={() => setOpenModal(true)}>
        Sign In
      </button>
      <dialog open={openModal} onClose={() => setOpenModal(false)}>
        <SignInForm
          onSubmit={() => {
            setOpenModal(false)
          }}
        />
      </dialog>
    </div>
  )
}

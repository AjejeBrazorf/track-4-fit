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
      <dialog
        open={openModal}
        onClose={() => setOpenModal(false)}
        id='sign-in-modal'>
        <form>
          <button
            type='submit'
            aria-label='close'
            formMethod='sign-in-modal'
            formNoValidate>
            X
          </button>
        </form>
        <SignInForm
          onSubmit={() => {
            setOpenModal(false)
          }}
        />
      </dialog>
    </div>
  )
}

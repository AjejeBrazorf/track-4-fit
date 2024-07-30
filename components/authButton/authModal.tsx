'use client'

import { useState } from 'react'

import { SignInForm } from '@/components/signIn/signInForm'
import { TabSwitch } from '@/components/tabSwitch'
import { SignUpForm } from '@/components/signUp'

type AuthMode = 'sign-in' | 'sing-up'

export const AuthModal = () => {
  const [openModal, setOpenModal] = useState(false)
  const [mode, setMode] = useState<AuthMode>('sign-in')
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

        <TabSwitch<AuthMode>
          onChange={setMode}
          options={[
            {
              value: 'sign-in',
              label: 'sign in',
              tabView: (
                <SignInForm
                  onSubmit={() => {
                    setOpenModal(false)
                  }}
                />
              ),
            },
            {
              value: 'sing-up',
              label: 'sign up',
              tabView: (
                <SignUpForm
                  onSubmit={() => {
                    setOpenModal(false)
                  }}
                />
              ),
            },
          ]}
          value={mode}
          variant='primary'
        />
      </dialog>
    </div>
  )
}

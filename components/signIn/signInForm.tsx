'use client'

import type { ObjectSchema } from 'yup'
import * as yup from 'yup'

import { useAuth } from '@/app/plugin/AuthContext'
import type { SignInFormType } from '@/components/signIn/types'

export const SignInFormSchema = yup.object({
  email: yup.string().email({ message: 'Please enter a valid email.' }).trim(),
  password: yup
    .string()
    .min(8, { message: 'Be at least 8 characters long' })
    .matches(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
    .matches(/[0-9]/, { message: 'Contain at least one number.' })
    .matches(/[^a-zA-Z0-9]/, {
      message: 'Contain at least one special character.',
    })
    .trim(),
}) as ObjectSchema<SignInFormType>
export const SignInForm = ({ onSubmit }: { onSubmit?: () => void }) => {
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

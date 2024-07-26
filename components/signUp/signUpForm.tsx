'use client'

// TODO: capire se usare yup o altro
import type { ObjectSchema } from 'yup'
import * as yup from 'yup'

import { useAuth } from '@/app/plugin/AuthContext'
import type { SignUpFormType } from '@/components/signUp/types'

export const SignUpFormSchema = yup.object({
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
}) as ObjectSchema<SignUpFormType>

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

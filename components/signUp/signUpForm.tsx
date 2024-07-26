'use client'

// TODO: capire se usare yup o altro
import type { ObjectSchema } from 'yup'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { useMemo } from 'react'

import { useAuth } from '@/app/plugin/AuthContext'
import type { SignUpFormType } from '@/components/signUp/types'

export const SignUpFormSchema = yup.object({
  email: yup.string().email('Please enter a valid email.').trim(),
  password: yup
    .string()
    .min(6, 'Be at least 6 characters long')
    // .matches(/[a-zA-Z]/, 'Contain at least one letter.')
    .matches(/[0-9]/, 'Contain at least one number.')
    // .matches(/[^a-zA-Z0-9]/, 'Contain at least one special character.')
    .trim(),
}) as ObjectSchema<SignUpFormType>

export const SignUpForm = ({ onSubmit }: { onSubmit?: () => void }) => {
  const { signUp } = useAuth()
  const {
    values,
    handleChange,
    handleSubmit,
    errors,
    isValid,
    isValidating,
    isSubmitting,
  } = useFormik<SignUpFormType>({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: SignUpFormSchema,
    onSubmit: async (values) => {
      debugger
      if (inactive) return
      await signUp(values)
      onSubmit?.()
    },
  })

  const busy = useMemo(() => isValidating || isSubmitting, [])
  const inactive = useMemo(() => !isValid || isValidating || isSubmitting, [])

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        handleSubmit()
      }}
      aria-disabled={inactive}>
      {busy && <div> loader</div>}
      <input
        name='email'
        value={values.email}
        onChange={handleChange}
        type='text'
        aria-errormessage={errors?.email}
      />
      {errors?.email}
      <input
        name='password'
        value={values.password}
        onChange={handleChange}
        type='password'
        aria-errormessage={errors?.password}
      />
      {errors?.password}
      <button type='submit' disabled={inactive}>
        Sign Up
      </button>
    </form>
  )
}

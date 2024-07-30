'use client'

import type { ObjectSchema } from 'yup'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { useMemo, useState } from 'react'

import { useAuth } from '@/app/plugin/AuthContext'
import type { SignInFormType } from '@/components/signIn/types'

export const SignInFormSchema = yup.object({
  email: yup.string().email('Please enter a valid email.').trim(),
  password: yup
    .string()
    .min(6, 'Be at least 6 characters long')
    // .matches(/[a-zA-Z]/, 'Contain at least one letter.')
    .matches(/[0-9]/, 'Contain at least one number.')
    // .matches(/[^a-zA-Z0-9]/, 'Contain at least one special character.')
    .trim(),
}) as ObjectSchema<SignInFormType>

export const SignInForm = ({ onSubmit }: { onSubmit?: () => void }) => {
  const { signIn } = useAuth()
  const [asyncError, setAsyncError] = useState('')
  const {
    values,
    handleChange,
    handleSubmit,
    errors,
    isValid,
    isValidating,
    isSubmitting,
  } = useFormik<SignInFormType>({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: SignInFormSchema,
    onSubmit: async (values) => {
      if (!isValid || isValidating) return
      const { error } = await signIn(values)
      if (error) {
        setAsyncError(error.message)
      }
      if (!error) {
        onSubmit?.()
      }
    },
  })

  const busy = useMemo(
    () => isValidating || isSubmitting,
    [isValidating, isSubmitting]
  )
  const inactive = useMemo(
    () => !isValid || isValidating || isSubmitting,
    [isValid, isValidating, isSubmitting]
  )

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        handleSubmit()
      }}>
      {busy && <div> loader</div>}
      <input
        name='email'
        value={values.email}
        onChange={handleChange}
        type='text'
        aria-errormessage={errors?.email}
      />
      {errors?.email && <div>{errors.email}</div>}
      <input
        name='password'
        value={values.password}
        onChange={handleChange}
        type='password'
        aria-errormessage={errors?.password}
      />
      {errors?.password && <div>{errors.password}</div>}
      <button type='submit' disabled={inactive}>
        Sign In
      </button>
      {asyncError}
    </form>
  )
}

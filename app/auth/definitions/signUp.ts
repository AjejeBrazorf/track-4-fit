import * as yup from 'yup'
// TODO: capire se usare yup o altro
import type { ObjectSchema } from 'yup'

export type SignUpFormType = {
  email: string
  password: string
}

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

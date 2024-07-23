import type { FC } from 'react'

import { SignInForm } from '@/components/signIn/signInForm'

const SignInPage: FC = () => {
  return (
    <section>
      Login
      <SignInForm />
    </section>
  )
}
export default SignInPage

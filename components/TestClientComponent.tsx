'use client'

import type { FC } from 'react'

import { useAuth } from '@/app/plugin/AuthContext'

export const TestClientComponent: FC = () => {
  const { state } = useAuth()
  return (
    <>
      <p>{state.authUserInfo?.localId}</p>
      <p>{state.authUserInfo?.email}</p>
    </>
  )
}

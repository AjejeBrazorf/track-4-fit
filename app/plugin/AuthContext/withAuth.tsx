'use client'

import type { FC } from 'react'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { PATHS } from '@/config/PATHS'
import { verifySession } from '@/app/plugin/AuthContext/session'

export const withAuth = (WrappedComponent: FC) => {
  const AuthComponent: FC = () => {
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
      const checkSession = async () => {
        const session = await verifySession()

        if (!session) {
          await router.push(PATHS.signIn)
        } else {
          setLoading(false)
        }
      }

      checkSession()
    }, [router])

    if (loading) {
      return <div>Loading...</div>
    }

    return <WrappedComponent />
  }

  return AuthComponent
}

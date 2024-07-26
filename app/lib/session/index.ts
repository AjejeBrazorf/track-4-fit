'use server'

// export * from "./index.d";

import { jwtVerify, SignJWT } from 'jose'
import { cookies } from 'next/headers'

import { siteConfig } from '@/config/siteConfig'

import type { Session, SessionPayload } from './types.d'

const { secretKey } = siteConfig.auth
const key = new TextEncoder().encode(secretKey)
const { domain } = siteConfig.auth
const cookieName = siteConfig.auth.cookieName ?? 'session'

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1h')
    .sign(key)
}

export async function decrypt(session: string | undefined = '') {
  try {
    const { payload } = await jwtVerify(session, key, {
      algorithms: ['HS256'],
    })

    return payload
  } catch (error) {
    return null
  }
}

export async function createSession(payload: SessionPayload) {
  const expiresIn = new Date(Date.now() + 60 * 60 * 1000)
  const session = await encrypt(payload)

  cookies().set(cookieName, session, {
    domain,
    httpOnly: process.env.NODE_ENV === 'production',
    secure: process.env.NODE_ENV === 'production',
    expires: expiresIn,
    sameSite: 'lax',
    path: '/',
  })
}

export async function verifySession() {
  const cookie = cookies().get(cookieName)?.value
  const session = (await decrypt(cookie)) as SessionPayload

  if (!cookie || !session) {
    return null
  }

  return (
    session.userId
      ? {
          userId: Number(session.userId),
          email: session.email,
        }
      : null
  ) as Session
}

export async function updateSession() {
  const session = cookies().get(cookieName)?.value
  const payload = await decrypt(session)

  if (!session || !payload) {
    return
  }

  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)

  cookies().set(cookieName, session, {
    httpOnly: true,
    secure: true,
    expires,
    sameSite: 'lax',
    path: '/',
  })
}

export async function deleteSession() {
  cookies().delete(cookieName)
}

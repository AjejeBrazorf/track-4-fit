'use client'

import { SWRConfig } from 'swr'
import type { ReactNode } from 'react'

import { graphQLFetcher } from '@/app/plugin/SWR/index'

export const SWRProvider = ({ children }: { children: ReactNode }) => {
  return (
    <SWRConfig
      value={{
        fetcher: graphQLFetcher,
      }}>
      {children}
    </SWRConfig>
  )
}

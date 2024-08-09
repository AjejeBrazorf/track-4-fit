import React from 'react'

import { Dashboard } from '@/components/pages/dashboard'
import { SWRProvider } from '@/app/plugin/SWR/swr-provider'

const DashboardPage = async () => {
  return (
    <SWRProvider>
      <Dashboard />
    </SWRProvider>
  )
}

export default DashboardPage

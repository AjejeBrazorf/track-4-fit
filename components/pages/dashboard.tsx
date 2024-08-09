'use client'

import React from 'react'
import useSWR from 'swr'

import { DASHBOARD } from './queries'

interface DashboardData {
  getUserByEmail: {
    id: string
  }
}

interface DashboardVariables {
  userMail: string
}

export const Dashboard = () => {
  const { data, error } = useSWR([DASHBOARD, { userMail: 'test@gmail.com' }])

  if (error) return <span>Error: {error.message}</span>
  if (!data) return <span>Loading...</span>

  return <span>Dashboard ID: {data.getUserByEmail.id}</span>
}

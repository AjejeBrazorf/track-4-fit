export const DASHBOARD = `
  query DashboardPage($userMail: String!) {
    getUserByEmail(email: $userMail) {
      id
    }
  }
`

export async function SignOut() {
  const res = await fetch('api/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  })
  if (!res.ok) {
    console.error('Network response was not ok:', res.statusText)
    const errorDetails = await res.text()
    console.error('Error details:', errorDetails)
    return { error: errorDetails }
  }

  return { data: await res.json() }
}

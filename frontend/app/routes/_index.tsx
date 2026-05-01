import { useLoaderData } from 'react-router'
import type { HelloMessage } from '@app/shared'

export async function loader() {
  const res = await fetch('/api/hello')
  const data: HelloMessage = await res.json()
  return data
}

export default function Home() {
  const { message } = useLoaderData<typeof loader>()
  return <h1>{message}</h1>
}

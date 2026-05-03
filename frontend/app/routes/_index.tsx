import { useLoaderData } from 'react-router'
import { fetchApi } from '@/lib/api'

export { ErrorBoundary } from '@/components/ErrorBoundary'

export function HydrateFallback() {
  return <p>Loading…</p>
}

export async function clientLoader() {
  return fetchApi<HelloMessage>('/api/hello')
}

export default function Home() {
  const result = useLoaderData<typeof clientLoader>()

  if (result.error) {
    return <p>Error: {result.error.message}</p>
  }

  return <h1>{result.data.message}</h1>
}

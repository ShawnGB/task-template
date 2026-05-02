import { isRouteErrorResponse, useLoaderData, useRouteError } from 'react-router'
import type { HelloMessage } from '@app/shared'
import { fetchApi } from '@/lib/api'

export async function loader() {
  return fetchApi<HelloMessage>('/api/hello')
}

export function ErrorBoundary() {
  const error = useRouteError()
  const message = isRouteErrorResponse(error)
    ? (error.data?.message ?? error.statusText)
    : error instanceof Error
      ? error.message
      : 'Something went wrong'
  return <p>Error: {message}</p>
}

export default function Home() {
  const result = useLoaderData<typeof loader>()

  if (result.error) {
    return <p>Error: {result.error.message}</p>
  }

  return <h1>{result.data.message}</h1>
}

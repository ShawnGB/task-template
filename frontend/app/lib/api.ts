import type { ApiResponse } from '@app/shared'
import { isApiError } from './errors'

export async function fetchApi<T>(url: string): Promise<ApiResponse<T>> {
  const res = await fetch(url)

  if (res.ok) {
    const data: T = await res.json()
    return { data, error: null }
  }

  try {
    const body: unknown = await res.json()
    if (isApiError(body)) return { data: null, error: body }
  } catch {
    // unparseable body falls through
  }

  return {
    data: null,
    error: {
      message: 'Unexpected error',
      code: 'UNKNOWN',
      statusCode: res.status,
    },
  }
}

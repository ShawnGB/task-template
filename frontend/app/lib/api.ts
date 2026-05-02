import type { ApiError, ApiResponse } from '@app/shared'

export async function fetchApi<T>(url: string): Promise<ApiResponse<T>> {
  const res = await fetch(url)

  if (res.ok) {
    const data: T = await res.json()
    return { data, error: null }
  }

  try {
    const error: ApiError = await res.json()
    return { data: null, error }
  } catch {
    return {
      data: null,
      error: {
        message: 'Unexpected error',
        code: 'UNKNOWN',
        statusCode: res.status,
      },
    }
  }
}

import { isApiError } from './errors'

export async function fetchApi<T>(url: string): Promise<ApiResponse<T>> {
  let res: Response
  try {
    res = await fetch(url)
  } catch {
    return { data: null, error: { message: 'Network error', code: 'UNKNOWN', statusCode: 0 } }
  }

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

import { describe, it, expect, vi } from 'vitest'
import { renderHook } from '@testing-library/react'

vi.mock('react-router', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router')>()
  return { ...actual, useRouteError: vi.fn() }
})

import { useRouteError } from 'react-router'
import { useRouteErrorMessage } from '@/hooks/useRouteErrorMessage'

describe('useRouteErrorMessage', () => {
  it('returns message from an Error instance', () => {
    vi.mocked(useRouteError).mockReturnValue(new Error('oops'))
    const { result } = renderHook(() => useRouteErrorMessage())
    expect(result.current).toBe('oops')
  })

  it('returns data.message from a route error response', () => {
    vi.mocked(useRouteError).mockReturnValue({
      status: 404,
      statusText: 'Not Found',
      data: { message: 'Resource not found' },
      internal: false,
    })
    const { result } = renderHook(() => useRouteErrorMessage())
    expect(result.current).toBe('Resource not found')
  })

  it('falls back to statusText when data.message is absent', () => {
    vi.mocked(useRouteError).mockReturnValue({
      status: 500,
      statusText: 'Server Error',
      data: null,
      internal: false,
    })
    const { result } = renderHook(() => useRouteErrorMessage())
    expect(result.current).toBe('Server Error')
  })

  it('returns fallback string for unknown error shapes', () => {
    vi.mocked(useRouteError).mockReturnValue('something weird')
    const { result } = renderHook(() => useRouteErrorMessage())
    expect(result.current).toBe('Something went wrong')
  })
})

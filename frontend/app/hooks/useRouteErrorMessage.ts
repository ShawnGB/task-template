import { isRouteErrorResponse, useRouteError } from 'react-router'

export function useRouteErrorMessage(): string {
  const error = useRouteError()
  if (isRouteErrorResponse(error)) {
    return error.data?.message ?? error.statusText
  }
  if (error instanceof Error) {
    return error.message
  }
  return 'Something went wrong'
}

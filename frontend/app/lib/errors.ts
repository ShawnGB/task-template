export function isApiError(value: unknown): value is ApiError {
  return (
    typeof value === 'object' &&
    value !== null &&
    'message' in value &&
    'code' in value &&
    'statusCode' in value
  )
}

export type HelloMessage = {
  message: string
}

export type ApiErrorCode =
  | 'NOT_FOUND'
  | 'VALIDATION_ERROR'
  | 'INTERNAL_ERROR'
  | 'UNAUTHORIZED'
  | 'UNKNOWN'

export type ApiError = {
  message: string
  code: ApiErrorCode
  statusCode: number
}

export type ApiResponse<T> =
  | { data: T; error: null }
  | { data: null; error: ApiError }

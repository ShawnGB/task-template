export type HelloMessage = {
  message: string
}

export type ApiError = {
  message: string
  code: string
  statusCode: number
}

export type ApiResponse<T> =
  | { data: T; error: null }
  | { data: null; error: ApiError }

import { AppError } from '../../middleware/AppError.js'

export function getHelloMessage(name?: string): HelloMessage {
  if (name === 'error') {
    throw new AppError(400, 'VALIDATION_ERROR', 'Invalid name')
  }
  return { message: 'Hello from Express' }
}

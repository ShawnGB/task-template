import type { HelloMessage } from '@app/shared'

export function getHelloMessage(): HelloMessage {
  return { message: 'Hello from Express' }
}

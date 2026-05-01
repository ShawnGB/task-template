import type { Request, Response } from 'express'
import { getHelloMessage } from './hello.service.js'

export function getHello(_req: Request, res: Response): void {
  res.json(getHelloMessage())
}

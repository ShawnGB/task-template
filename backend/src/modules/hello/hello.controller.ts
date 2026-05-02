import type { Request, Response } from 'express'
import { getHelloMessage } from './hello.service.js'

export function getHello(req: Request, res: Response): void {
  const name = req.query.name as string | undefined
  res.json(getHelloMessage(name))
}

import express from 'express'
import type { HelloMessage } from '@app/shared'

const app = express()
const port = 3001

app.get('/', (_req, res) => {
  const body: HelloMessage = { message: 'Hello from Express' }
  res.json(body)
})

app.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`)
})

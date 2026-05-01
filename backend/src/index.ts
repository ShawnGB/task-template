import express from 'express'
import { PORT } from './config/env.js'
import helloRouter from './modules/hello/hello.routes.js'
import { notFound } from './middleware/notFound.js'

const app = express()

app.use(express.json())
app.use('/hello', helloRouter)
app.use(notFound)

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`)
})

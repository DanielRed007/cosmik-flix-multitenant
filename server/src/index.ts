import express, { Request, Response } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors({
  origin: ["http://localhost:3000"], // Next.js dev
  credentials: true,
}))

app.use(express.json())

app.get('/api/test', (req, res) => {
  res.json({ success: true, data: { message: "Hello from Express → Next.js!" } })
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
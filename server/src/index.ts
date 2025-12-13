import express, { Request, Response } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/auth.routes'
import connectDB from './config/db'
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger'; 

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

connectDB()

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(cors({
  origin: ["http://localhost:3000"],
  credentials: true,
}))

app.use(express.json())
app.use(cookieParser())

app.get('/api/test', (req, res) => {
  res.json({ success: true, data: { message: "Hello from Express → Next.js!" } })
})

app.get('/api-spec', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

app.use("/api/auth", authRoutes)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
import './db/models/user.js'
import express from 'express'
import { postsRoutes } from './routes/posts.js'
import { userRoutes } from './routes/users.js'
import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
import recipesRouter from './routes/recipes.js'

const app = express()
console.log('FRONTEND_URL:', process.env.FRONTEND_URL)
app.use(bodyParser.json())
// Flexible CORS setup: allow all origins unless credentials are required
const allowCredentials = cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
})
const allowAll = cors()

// CORS and authentication debug middleware
app.use((req, res, next) => {
  const hasCredentials =
    req.headers.cookie || req.headers.authorization || req.method !== 'GET'
  if (hasCredentials) {
    allowCredentials(req, res, next)
  } else {
    allowAll(req, res, next)
  }
})

// Use JWT middleware for protected routes
import { requireAuth } from './middleware/jwt.js'

// Apply requireAuth for protected methods globally
app.use((req, res, next) => {
  if (['POST', 'PUT', 'DELETE'].includes(req.method)) {
    return requireAuth(req, res, next)
  }
  next()
})

postsRoutes(app)
userRoutes(app)
app.use('/api/v1/recipes', recipesRouter)

app.get('/', (req, res) => {
  res.send('Hello from Express Nodemon!')
})

// Listen on all interfaces for Codespaces compatibility
const PORT = process.env.PORT || 3000
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Express server running on http://localhost:${PORT}`)
})

export { app }

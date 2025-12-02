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

app.use(cors({ origin: true, credentials: true }))

postsRoutes(app)
userRoutes(app)
app.use('/api/v1/recipes', recipesRouter)

app.get('/', (req, res) => {
  res.send('Hello from Express Nodemon!')
})

export { app }

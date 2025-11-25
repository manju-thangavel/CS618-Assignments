import './db/models/user.js'
import express from 'express'
import { postsRoutes } from './routes/posts.js'
import { userRoutes } from './routes/users.js'
import bodyParser from 'body-parser'
import cors from 'cors'
import recipesRouter from './routes/recipes.js'

const app = express()
app.use(bodyParser.json())
app.use(cors())

postsRoutes(app)
userRoutes(app)
app.use('/api/v1/recipes', recipesRouter)

app.get('/', (req, res) => {
  res.send('Hello from Express Nodemon!')
})

export { app }

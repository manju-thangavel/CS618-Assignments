import dotenv from 'dotenv'
dotenv.config()

import { initDatabase } from './db/init.js'

import { app } from './app.js'
import { createServer } from 'http'
import { initSocket } from './services/socket.js'
const PORT = process.env.PORT

await initDatabase()
const server = createServer(app)
initSocket(server)
server.listen(PORT)

console.info(`express server running on http://localhost:${PORT}`)

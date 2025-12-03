import { Server } from 'socket.io'

let io

export function initSocket(server) {
  io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL || '*',
      credentials: true,
    },
  })

  io.on('connection', (socket) => {
    // Listen for recipe events and emit notifications
    socket.on('recipe:like', ({ recipeId, userId }) => {
      // Emit notification to all clients (or filter as needed)
      io.emit('notification', {
        type: 'like',
        recipeId,
        userId,
        message: `User ${userId} liked recipe ${recipeId}`,
      })
    })

    socket.on('recipe:new', ({ recipeId, userId }) => {
      io.emit('notification', {
        type: 'new',
        recipeId,
        userId,
        message: `User ${userId} created a new recipe ${recipeId}`,
      })
    })

    // Add more events as needed
  })

  return io
}

export function getIO() {
  if (!io) throw new Error('Socket.io not initialized!')
  return io
}

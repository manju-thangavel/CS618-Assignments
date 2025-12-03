import { Server } from 'socket.io'

export let io

export function initSocket(server) {
  io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL || '*',
      credentials: true,
    },
  })

  io.on('connection', (socket) => {
    socket.on('recipe:like', ({ recipeId, userId }) => {
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
  })

  return io
}

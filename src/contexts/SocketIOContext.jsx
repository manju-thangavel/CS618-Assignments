/* eslint-disable */
import { createContext, useContext, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { io } from 'socket.io-client'

const SocketIOContext = createContext()

export function useSocketIO() {
  return useContext(SocketIOContext)
}

export function SocketIOProvider({ children }) {
  const [notification, setNotification] = useState(null)
  const socketRef = useRef(null)

  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io(
        import.meta.env.VITE_SOCKET_HOST || 'http://localhost:3001',
        {
          withCredentials: true,
        },
      )
    }
    const socket = socketRef.current

    socket.on('notification', (data) => {
      setNotification(data)
      setTimeout(() => setNotification(null), 8000)
    })

    return () => {
      socket.off('notification')
    }
  }, [])

  return (
    <SocketIOContext.Provider value={socketRef.current}>
      {children}
      {notification && notification.type === 'new' && (
        <div
          style={{
            position: 'fixed',
            bottom: 20,
            right: 20,
            color: '#0074d9',
            textDecoration: 'underline',
            cursor: 'pointer',
            zIndex: 9999,
          }}
          onClick={() => {
            if (notification.recipeId) {
              window.location.href = `/recipes/${notification.recipeId}`
            }
          }}
        >
          New Recipe has been added, click to check
        </div>
      )}
    </SocketIOContext.Provider>
  )
}

SocketIOProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

import { createContext, useState, useContext } from 'react'
import PropTypes from 'prop-types'
export const AuthContext = createContext({
  token: null,
  setToken: () => {},
})
export const AuthContextProvider = ({ children }) => {
  const [token, setTokenState] = useState(() => localStorage.getItem('token'))
  const setToken = (newToken) => {
    setTokenState(newToken)
    if (newToken) {
      localStorage.setItem('token', newToken)
    } else {
      localStorage.removeItem('token')
    }
  }
  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  )
}
AuthContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
}
export function useAuth() {
  return useContext(AuthContext)
}

import { Link } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import { User } from './User.jsx'

import { useAuth } from '../contexts/AuthContext.jsx'

export function Header() {
  const [token, setToken] = useAuth()

  return (
    <div>
      <h1>Welcome to My Blog!</h1>
      <nav>
        <Link to='/'>Blog</Link> | <Link to='/recipes'>Recipes</Link> | <Link to='/login'>Log In</Link> | <Link to='/signup'>Sign Up</Link>
      </nav>
      {token && (
        <>
          <br />
          Logged in as <User id={jwtDecode(token).sub} />
          <br />
          <button onClick={() => setToken(null)}>Logout</button>
        </>
      )}
    </div>
  )
}

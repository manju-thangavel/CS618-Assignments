import { RecipeApp } from './pages/RecipeApp.jsx'
import {
  createBrowserRouter,
  RouterProvider,
  useParams,
} from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Blog } from './pages/Blog.jsx'
import { Signup } from './pages/Signup.jsx'
import { Login } from './pages/Login.jsx'
import { AuthContextProvider } from './contexts/AuthContext.jsx'
import { SocketIOProvider } from './contexts/SocketIOContext.jsx'
import RecipeDetail from './components/RecipeDetail.jsx'

const queryClient = new QueryClient()

// Wrapper to extract :id param and pass to RecipeDetail
function RecipeDetailWrapper() {
  const { id } = useParams()
  return <RecipeDetail recipeId={id} />
}

const router = createBrowserRouter([
  { path: '/', element: <Blog /> },
  { path: '/signup', element: <Signup /> },
  { path: '/login', element: <Login /> },
  { path: '/recipes', element: <RecipeApp /> },
  { path: '/recipes/:id', element: <RecipeDetailWrapper /> },
])

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <SocketIOProvider>
          <RouterProvider router={router} />
        </SocketIOProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  )
}

export default App

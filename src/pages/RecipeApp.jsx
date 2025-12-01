import { useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Header } from '../components/Header.jsx'
import RecipeList from '../components/RecipeList.jsx'
import CreateRecipe from '../components/CreateRecipe.jsx'
import { useAuth } from '../contexts/AuthContext.jsx'
import { getRecipes, likeRecipe } from '../api/recipes.js'

export function RecipeApp() {
  const { token } = useAuth()
  const queryClient = useQueryClient()
  const [sortField, setSortField] = useState('createdAt')
  const [sortOrder, setSortOrder] = useState('descending')
  const [likeLoadingId, setLikeLoadingId] = useState(null)

  // Fetch recipes with sort
  const {
    data: recipes,
    error,
    refetch,
  } = useQuery({
    queryKey: ['recipes', sortField, sortOrder],
    queryFn: () => getRecipes(sortField, sortOrder),
  })

  const handleRecipeCreated = () => {
    queryClient.invalidateQueries(['recipes'])
  }

  // Like handler
  const handleLike = async (id) => {
    setLikeLoadingId(id)
    try {
      await likeRecipe(token, id)
      await queryClient.invalidateQueries(['recipes'])
      await refetch()
    } catch (err) {
      // Optionally handle error
    } finally {
      setLikeLoadingId(null)
    }
  }

  return (
    <div style={{ padding: 8 }}>
      <Header />
      <br />
      <hr />
      <CreateRecipe token={token} onRecipeCreated={handleRecipeCreated} />
      <br />
      <hr />
      <div style={{ marginBottom: 12 }}>
        <label htmlFor='sort-field'>Sort by:</label>
        <select
          id='sort-field'
          value={sortField}
          onChange={(e) => setSortField(e.target.value)}
        >
          <option value='createdAt'>Created At</option>
          <option value='updatedAt'>Updated At</option>
          <option value='popularity'>Popularity</option>
        </select>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          style={{ marginLeft: 8 }}
        >
          <option value='ascending'>Ascending</option>
          <option value='descending'>Descending</option>
        </select>
      </div>
      <RecipeList
        recipes={recipes ?? []}
        error={error?.message}
        onLike={handleLike}
        likeLoadingId={likeLoadingId}
      />
    </div>
  )
}

import { useEffect, useState } from 'react'
import { getRecipe } from '../api/recipes.js'

const RecipeDetail = ({ recipeId }) => {
  const [recipe, setRecipe] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    if (recipeId) {
      getRecipe(recipeId)
        .then(setRecipe)
        .catch((err) => setError(err.message))
    }
  }, [recipeId])

  if (!recipeId) return <div>Select a recipe to view details.</div>
  if (error) return <div style={{ color: 'red' }}>{error}</div>
  if (!recipe) return <div>Loading...</div>

  return (
    <div>
      <div style={{ marginBottom: 8 }}>
        <a
          href='/recipes'
          style={{
            color: '#1976d2',
            textDecoration: 'underline',
            fontWeight: 'bold',
          }}
        >
          &larr; Back to Recipes Home
        </a>
      </div>
      <h2>{recipe.title}</h2>
      <img
        src={recipe.imageUrl}
        alt={recipe.title}
        style={{ width: '200px' }}
      />
      <h3>Ingredients:</h3>
      <ul>
        {recipe.ingredients.map((ing, idx) => (
          <li key={idx}>{ing}</li>
        ))}
      </ul>
      <p>
        <strong>Likes:</strong> {recipe.likes ? recipe.likes.length : 0}
      </p>
      <p>Posted by: {recipe.user?.username || 'Unknown'}</p>
    </div>
  )
}

import PropTypes from 'prop-types'
RecipeDetail.propTypes = {
  recipeId: PropTypes.string.isRequired,
}
export default RecipeDetail

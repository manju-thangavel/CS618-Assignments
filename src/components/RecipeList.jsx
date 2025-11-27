import { useEffect, useState } from 'react'
import { getRecipes } from '../api/recipes.js'
import PropTypes from 'prop-types'

const RecipeList = ({ recipes, error }) => {
  const [localRecipes, setLocalRecipes] = useState([])
  const [loading, setLoading] = useState(false)
  const [fetchError, setFetchError] = useState('')

  useEffect(() => {
    if (recipes === undefined) {
      setLoading(true)
      getRecipes()
        .then((data) => {
          setLocalRecipes(data)
          setLoading(false)
        })
        .catch((err) => {
          setFetchError(err.message)
          setLoading(false)
        })
    }
  }, [recipes])

  const displayRecipes = recipes ?? localRecipes
  const displayError = error || fetchError

  return (
    <div>
      <h2>All Recipes</h2>
      {displayError && <div style={{ color: 'red' }}>{displayError}</div>}
      {loading ? (
        <div>Loading recipes...</div>
      ) : (
        <ul>
          {(displayRecipes ?? []).map((recipe) => (
            <li key={recipe._id}>
              <h3>{recipe.title}</h3>
              {recipe.ingredients && (
                <div>
                  <strong>Ingredients:</strong>
                  <ul>
                    {recipe.ingredients.map((ing, idx) => (
                      <li key={idx}>{ing}</li>
                    ))}
                  </ul>
                </div>
              )}
              {recipe.imageUrl && (
                <div>
                  <img
                    src={recipe.imageUrl}
                    alt={recipe.title}
                    style={{ width: '100px' }}
                  />
                </div>
              )}
              <button style={{ marginRight: 8 }}>Edit</button>
              <button>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

RecipeList.propTypes = {
  recipes: PropTypes.array,
  error: PropTypes.string,
}

export default RecipeList

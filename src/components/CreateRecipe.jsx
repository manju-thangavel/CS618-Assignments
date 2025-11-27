import { useState } from 'react'
import PropTypes from 'prop-types'

const CreateRecipe = ({ token, onRecipeCreated }) => {
  const [title, setTitle] = useState('')
  const [ingredients, setIngredients] = useState([''])
  const [imageUrl, setImageUrl] = useState('')
  const [error, setError] = useState('')

  const handleIngredientChange = (idx, value) => {
    const newIngredients = [...ingredients]
    newIngredients[idx] = value
    setIngredients(newIngredients)
  }

  const addIngredient = () => setIngredients([...ingredients, ''])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const recipe = {
        title,
        ingredients: ingredients.filter((i) => i.trim()),
        imageUrl,
      }
      const res = await import('../api/recipes.js').then((api) =>
        api.createRecipe(token, recipe),
      )
      setTitle('')
      setIngredients([''])
      setImageUrl('')
      if (onRecipeCreated) onRecipeCreated(res)
    } catch (err) {
      setError(err.message)
    }
  }

  if (!token) {
    return (
      <div style={{ marginBottom: 16 }}>Please log in to create a recipe.</div>
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Be Creative! Share your Recipe to the world!</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <div>
        <label htmlFor='recipe-title'>Title:</label>
        <input
          id='recipe-title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor='recipe-ingredient-0'>Ingredients:</label>
        {ingredients.map((ingredient, idx) => (
          <input
            key={idx}
            id={`recipe-ingredient-${idx}`}
            value={ingredient}
            onChange={(e) => handleIngredientChange(idx, e.target.value)}
            required
          />
        ))}
        <button type='button' onClick={addIngredient}>
          Add Ingredient
        </button>
      </div>
      <div>
        <label htmlFor='recipe-image-url'>Image URL:</label>
        <input
          id='recipe-image-url'
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          required
        />
      </div>
      <button type='submit'>Create Recipe</button>
    </form>
  )
}

CreateRecipe.propTypes = {
  token: PropTypes.string,
  onRecipeCreated: PropTypes.func,
}

export default CreateRecipe

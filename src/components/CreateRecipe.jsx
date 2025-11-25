import React, { useState } from 'react';

const CreateRecipe = ({ token, onRecipeCreated }) => {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState(['']);
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState('');

  const handleIngredientChange = (idx, value) => {
    const newIngredients = [...ingredients];
    newIngredients[idx] = value;
    setIngredients(newIngredients);
  };

  const addIngredient = () => setIngredients([...ingredients, '']);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const recipe = {
        title,
        ingredients: ingredients.filter((i) => i.trim()),
        imageUrl,
      };
      const res = await import('../api/recipes.js').then(api => api.createRecipe(token, recipe));
      setTitle('');
      setIngredients(['']);
      setImageUrl('');
      if (onRecipeCreated) onRecipeCreated(res);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Recipe</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <div>
        <label>Title:</label>
        <input value={title} onChange={e => setTitle(e.target.value)} required />
      </div>
      <div>
        <label>Ingredients:</label>
        {ingredients.map((ingredient, idx) => (
          <input
            key={idx}
            value={ingredient}
            onChange={e => handleIngredientChange(idx, e.target.value)}
            required
          />
        ))}
        <button type="button" onClick={addIngredient}>Add Ingredient</button>
      </div>
      <div>
        <label>Image URL:</label>
        <input value={imageUrl} onChange={e => setImageUrl(e.target.value)} required />
      </div>
      <button type="submit">Create Recipe</button>
    </form>
  );
};

export default CreateRecipe;

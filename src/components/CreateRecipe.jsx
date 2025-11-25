import React, { useState } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';

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

  const queryClient = useQueryClient();
  const createRecipeMutation = useMutation({
    mutationFn: async () => {
      const recipe = {
        title,
        ingredients: ingredients.filter((i) => i.trim()),
        imageUrl,
      };
      const res = await import('../api/recipes.js').then(api => api.createRecipe(token, recipe));
      return res;
    },
    onSuccess: (res) => {
      setTitle('');
      setIngredients(['']);
      setImageUrl('');
      if (onRecipeCreated) onRecipeCreated(res);
      queryClient.invalidateQueries(['recipes']);
    },
    onError: (err) => {
      setError(err.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    createRecipeMutation.mutate();
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

import React, { useEffect, useState } from 'react';
import { getRecipe } from '../api/recipes.js';

const RecipeDetail = ({ recipeId }) => {
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (recipeId) {
      getRecipe(recipeId)
        .then(setRecipe)
        .catch(err => setError(err.message));
    }
  }, [recipeId]);

  if (!recipeId) return <div>Select a recipe to view details.</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;
  if (!recipe) return <div>Loading...</div>;

  return (
    <div>
      <h2>{recipe.title}</h2>
      <img src={recipe.imageUrl} alt={recipe.title} style={{ width: '200px' }} />
      <h3>Ingredients:</h3>
      <ul>
        {recipe.ingredients.map((ing, idx) => (
          <li key={idx}>{ing}</li>
        ))}
      </ul>
      <p>Posted by: {recipe.user?.username || 'Unknown'}</p>
    </div>
  );
};

export default RecipeDetail;

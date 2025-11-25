import React, { useEffect, useState } from 'react';
import { getRecipes } from '../api/recipes.js';

const RecipeList = ({ onSelectRecipe, recipes, error }) => {
  return (
    <div>
      <h2>All Recipes</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <ul>
        {recipes.map(recipe => (
          <li key={recipe._id}>
            <span onClick={() => onSelectRecipe && onSelectRecipe(recipe._id)} style={{ cursor: 'pointer', color: 'blue' }}>
              {recipe.title}
            </span>
            <br />
            <img src={recipe.imageUrl} alt={recipe.title} style={{ width: '100px' }} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeList;

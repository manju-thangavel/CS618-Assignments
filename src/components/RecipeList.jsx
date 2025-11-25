import React, { useEffect, useState } from 'react';
import { getRecipes } from '../api/recipes.js';


const RecipeList = ({ onSelectRecipe, recipes, error }) => {
  const [localRecipes, setLocalRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState('');

  useEffect(() => {
    if (recipes === undefined) {
      setLoading(true);
      getRecipes()
        .then(data => {
          setLocalRecipes(data);
          setLoading(false);
        })
        .catch(err => {
          setFetchError(err.message);
          setLoading(false);
        });
    }
  }, [recipes]);

  const displayRecipes = recipes ?? localRecipes;
  const displayError = error || fetchError;

  return (
    <div>
      <h2>All Recipes</h2>
      {displayError && <div style={{ color: 'red' }}>{displayError}</div>}
      {loading ? (
        <div>Loading recipes...</div>
      ) : (
        <ul>
          {(displayRecipes ?? []).map(recipe => (
            <li key={recipe._id}>
              <span onClick={() => onSelectRecipe && onSelectRecipe(recipe._id)} style={{ cursor: 'pointer', color: 'blue' }}>
                {recipe.title}
              </span>
              <br />
              <img src={recipe.imageUrl} alt={recipe.title} style={{ width: '100px' }} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecipeList;

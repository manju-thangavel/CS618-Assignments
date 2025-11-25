import { useState } from 'react';
import { Header } from '../components/Header.jsx';
import { RecipeList } from '../components/RecipeList.jsx';
import { CreateRecipe } from '../components/CreateRecipe.jsx';
import { RecipeDetail } from '../components/RecipeDetail.jsx';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getRecipes } from '../api/recipes.js';

export function RecipeApp() {
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);
  const [token] = useAuth();
  const queryClient = useQueryClient();
  const recipesQuery = useQuery({
    queryKey: ['recipes'],
    queryFn: getRecipes,
  });

  const handleRecipeCreated = () => {
    queryClient.invalidateQueries(['recipes']);
  };

  return (
    <div style={{ padding: 8 }}>
      <Header />
      <br />
      <hr />
      <CreateRecipe token={token} onRecipeCreated={handleRecipeCreated} />
      <br />
      <hr />
      <RecipeList onSelectRecipe={setSelectedRecipeId} recipes={recipesQuery.data ?? []} error={recipesQuery.error?.message} />
      <br />
      <RecipeDetail recipeId={selectedRecipeId} />
    </div>
  );
}

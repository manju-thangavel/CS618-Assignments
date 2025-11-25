import { useState } from 'react';
import { Header } from '../components/Header.jsx';
import { RecipeList } from '../components/RecipeList.jsx';
import { CreateRecipe } from '../components/CreateRecipe.jsx';
import { RecipeDetail } from '../components/RecipeDetail.jsx';
import { useAuth } from '../contexts/AuthContext.jsx';

export function RecipeApp() {
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);
  const [token] = useAuth();

  return (
    <div style={{ padding: 8 }}>
      <Header />
      <br />
      <hr />
      <CreateRecipe token={token} onRecipeCreated={() => window.location.reload()} />
      <br />
      <hr />
      <RecipeList onSelectRecipe={setSelectedRecipeId} />
      <br />
      <RecipeDetail recipeId={selectedRecipeId} />
    </div>
  );
}

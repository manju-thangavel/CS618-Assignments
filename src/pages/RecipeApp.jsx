import { useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Header } from '../components/Header.jsx'
import RecipeList from '../components/RecipeList.jsx'
import CreateRecipe from '../components/CreateRecipe.jsx'
import RecipeDetail from '../components/RecipeDetail.jsx'
import { useAuth } from '../contexts/AuthContext.jsx'
import { getRecipes } from '../api/recipes.js'

export function RecipeApp() {
  const { data: recipes, error, isLoading } = useQuery({
    queryKey: ['recipes'],
    queryFn: getRecipes,
  })

  return (
    <div style={{ padding: 8 }}>
      <Header />
      <hr />
      <h2>All Recipes</h2>
      <RecipeList recipes={recipes} error={error?.message} />
    </div>
  );
}

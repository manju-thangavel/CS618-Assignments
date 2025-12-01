export const likeRecipe = async (token, id) => {
  const res = await fetch(`${API_URL}/${id}/like`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    credentials: 'include',
  })
  if (!res.ok) throw new Error('Failed to like recipe')
  return res.json()
}
// src/api/recipes.js

const API_URL = import.meta.env.VITE_BACKEND_URL + '/recipes'

export const getRecipes = async (
  sortField = 'createdAt',
  sortOrder = 'descending',
) => {
  let url = API_URL
  const params = new URLSearchParams()
  if (sortField === 'popularity') {
    params.append('sort', 'popular')
  } else {
    params.append('sort', sortField)
    params.append('order', sortOrder)
  }
  if ([...params].length > 0) {
    url += `?${params.toString()}`
  }
  const res = await fetch(url)
  if (!res.ok) throw new Error('Failed to fetch recipes')
  return res.json()
}

export const getRecipe = async (id) => {
  const res = await fetch(`${API_URL}/${id}`)
  if (!res.ok) throw new Error('Failed to fetch recipe')
  return res.json()
}

export const createRecipe = async (token, data) => {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
    credentials: 'include',
  })
  if (!res.ok) throw new Error('Failed to create recipe')
  return res.json()
}

export const updateRecipe = async (token, id, data) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
    credentials: 'include',
  })
  if (!res.ok) throw new Error('Failed to update recipe')
  return res.json()
}

export const deleteRecipe = async (token, id) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: 'include',
  })
  if (!res.ok) throw new Error('Failed to delete recipe')
  return res.json()
}

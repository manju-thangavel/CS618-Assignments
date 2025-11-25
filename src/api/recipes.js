// src/api/recipes.js

const API_URL = '/api/v1/recipes';

export const getRecipes = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error('Failed to fetch recipes');
  return res.json();
};

export const getRecipe = async (id) => {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error('Failed to fetch recipe');
  return res.json();
};

export const createRecipe = async (token, data) => {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create recipe');
  return res.json();
};

export const updateRecipe = async (token, id, data) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update recipe');
  return res.json();
};

export const deleteRecipe = async (token, id) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error('Failed to delete recipe');
  return res.json();
};

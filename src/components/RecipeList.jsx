import { useEffect, useState } from 'react'
import { getRecipes } from '../api/recipes.js'
import PropTypes from 'prop-types'
import { PostSorting } from './PostSorting.jsx'
import { PostFilter } from './PostFilter.jsx'

const RecipeList = ({ recipes, error }) => {
  const [localRecipes, setLocalRecipes] = useState([])
  const [loading, setLoading] = useState(false)
  const [fetchError, setFetchError] = useState('')

  useEffect(() => {
    if (recipes === undefined) {
      setLoading(true)
      getRecipes()
        .then((data) => {
          setLocalRecipes(data)
          setLoading(false)
        })
        .catch((err) => {
          setFetchError(err.message)
          setLoading(false)
        })
    }
  }, [recipes])


  // Sorting state
  const [sortField, setSortField] = useState('title');
  const [sortOrder, setSortOrder] = useState('ascending');

  const sortFields = ['createdAt', 'updatedAt', 'popularity'];
  // Popularity filter state
  const [popularityFilter, setPopularityFilter] = useState('');

  // Filter and sort recipes
  let filteredRecipes = recipes ?? localRecipes;
  if (popularityFilter !== '') {
    const popNum = Number(popularityFilter);
    if (!isNaN(popNum)) {
      filteredRecipes = filteredRecipes.filter(
        (r) => (Array.isArray(r.likes) ? r.likes.length : Number(r.likes ?? 0)) >= popNum
      );
    }
  }
  const displayRecipes = filteredRecipes
    ? [...filteredRecipes].sort((a, b) => {
        let valA, valB;
        switch (sortField) {
          case 'createdAt':
            valA = new Date(a.createdAt).getTime();
            valB = new Date(b.createdAt).getTime();
            return sortOrder === 'ascending' ? valA - valB : valB - valA;
          case 'updatedAt':
            valA = new Date(a.updatedAt).getTime();
            valB = new Date(b.updatedAt).getTime();
            return sortOrder === 'ascending' ? valA - valB : valB - valA;
          case 'popularity':
            valA = Array.isArray(a.likes) ? a.likes.length : Number(a.likes ?? 0);
            valB = Array.isArray(b.likes) ? b.likes.length : Number(b.likes ?? 0);
            return sortOrder === 'ascending' ? valA - valB : valB - valA;
          default:
            return 0;
        }
      })
    : [];
  const displayError = error || fetchError;

  return (
    <div>
      <h2>All Recipes</h2>
      <div style={{ marginBottom: 12 }}>
        <PostSorting
          fields={sortFields}
          value={sortField}
          onChange={setSortField}
          orderValue={sortOrder}
          onOrderChange={setSortOrder}
        />
        <div style={{ marginTop: 8 }}>
          <PostFilter
            field="popularity"
            value={popularityFilter}
            onChange={setPopularityFilter}
          />
        </div>
      </div>
      {displayError && <div style={{ color: 'red' }}>{displayError}</div>}
      {loading ? (
        <div>Loading recipes...</div>
      ) : (
        <ul>
          {(displayRecipes ?? []).map((recipe) => (
            <li key={recipe._id}>
              <h3>{recipe.title}</h3>
              {recipe.ingredients && (
                <div>
                  <strong>Ingredients:</strong>
                  <ul>
                    {recipe.ingredients.map((ing, idx) => (
                      <li key={idx}>{ing}</li>
                    ))}
                  </ul>
                </div>
              )}
              {recipe.imageUrl && (
                <div>
                  <img
                    src={recipe.imageUrl}
                    alt={recipe.title}
                    style={{ width: '100px' }}
                  />
                </div>
              )}
              <div style={{ margin: '8px 0' }}>
                <span>Likes: {recipe.likes ?? 0}</span>
                <button
                  style={{ marginLeft: 8 }}
                  onClick={() => handleLike(recipe._id)}
                  disabled={likeLoadingId === recipe._id}
                >
                  {likeLoadingId === recipe._id ? 'Liking...' : 'Like'}
                </button>
              </div>
              <button style={{ marginRight: 8 }}>Edit</button>
              <button>Delete</button>
              // Like button state
              const [likeLoadingId, setLikeLoadingId] = useState(null);

              // Like handler
              const handleLike = async (id) => {
                setLikeLoadingId(id);
                try {
                  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/recipes/${id}/like`, {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                  });
                  if (!res.ok) throw new Error('Failed to like recipe');
                  const updated = await res.json();
                  setLocalRecipes((prev) =>
                    prev.map((r) => (r._id === id ? { ...r, likes: updated.likes } : r))
                  );
                } catch (err) {
                  setFetchError(err.message);
                } finally {
                  setLikeLoadingId(null);
                }
              };
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

RecipeList.propTypes = {
  recipes: PropTypes.array,
  error: PropTypes.string,
}

export default RecipeList

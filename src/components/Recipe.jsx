import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Recipe = ({ recipe, onLike, likeLoadingId }) => {
  return (
    <article>
      <h3>
        <Link
          to={`/recipes/${recipe._id}`}
          style={{ color: '#1976d2', textDecoration: 'underline' }}
        >
          {recipe.title}
        </Link>
      </h3>
      {recipe.imageUrl && (
        <img
          src={recipe.imageUrl}
          alt={recipe.title}
          style={{ width: '100px' }}
        />
      )}
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
      <div style={{ margin: '8px 0' }}>
        <span>
          Likes:{' '}
          {typeof recipe.likeCount === 'number'
            ? recipe.likeCount
            : Array.isArray(recipe.likes)
              ? recipe.likes.length
              : Number(recipe.likes ?? 0)}
        </span>
        <button
          style={{ marginLeft: 8 }}
          onClick={() => onLike && onLike(recipe._id)}
          disabled={likeLoadingId === recipe._id}
        >
          {likeLoadingId === recipe._id ? 'Liking...' : 'Like'}
        </button>
      </div>
      {/* Optionally add Edit/Delete if needed */}
    </article>
  )
}

Recipe.propTypes = {
  recipe: PropTypes.object.isRequired,
  onLike: PropTypes.func,
  likeLoadingId: PropTypes.string,
}

export default Recipe

import PropTypes from 'prop-types'
import Recipe from './Recipe.jsx'

const RecipeList = ({ recipes = [], error, onLike, likeLoadingId }) => (
  <div>
    <h2>All Recipes</h2>
    {error && <div style={{ color: 'red' }}>{error}</div>}
    {recipes.map((recipe) => (
      <Recipe
        key={recipe._id}
        recipe={recipe}
        onLike={onLike}
        likeLoadingId={likeLoadingId}
      />
    ))}
  </div>
)

RecipeList.propTypes = {
  recipes: PropTypes.array,
  error: PropTypes.string,
  onLike: PropTypes.func,
  likeLoadingId: PropTypes.string,
}

export default RecipeList

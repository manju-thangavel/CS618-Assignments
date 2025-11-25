import express from 'express';
import Recipe from '../db/models/recipe.js';
import { requireAuth } from '../middleware/jwt.js';

const router = express.Router();

// Create a new recipe
router.post('/', requireAuth, async (req, res) => {
  try {
    const { title, ingredients, imageUrl } = req.body;
    const userId = req.auth.sub;
    const recipe = new Recipe({ title, ingredients, imageUrl, user: userId });
    await recipe.save();
    res.status(201).json(recipe);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all recipes
router.get('/', async (req, res) => {
  try {
    const recipes = await Recipe.find().populate('user', 'username');
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single recipe
router.get('/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id).populate('user', 'username');
    if (!recipe) return res.status(404).json({ error: 'Recipe not found' });
    res.json(recipe);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a recipe (owner only)
router.put('/:id', requireAuth, async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ error: 'Recipe not found' });
    if (recipe.user.toString() !== req.auth.sub) {
      return res.status(403).json({ error: 'Not authorized' });
    }
    const { title, ingredients, imageUrl } = req.body;
    recipe.title = title || recipe.title;
    recipe.ingredients = ingredients || recipe.ingredients;
    recipe.imageUrl = imageUrl || recipe.imageUrl;
    await recipe.save();
    res.json(recipe);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a recipe (owner only)
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ error: 'Recipe not found' });
    if (recipe.user.toString() !== req.auth.sub) {
      return res.status(403).json({ error: 'Not authorized' });
    }
    await recipe.deleteOne();
    res.json({ message: 'Recipe deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

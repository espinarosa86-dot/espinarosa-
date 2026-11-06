const Category = require('../models/Category');
const Product = require('../models/Product');

// @desc    Fetch all categories
// @route   GET /api/categories
// @access  Public
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Create a category
// @route   POST /api/categories
// @access  Private/Admin
const createCategory = async (req, res) => {
  const { name, description } = req.body;

  if (!name || typeof name !== 'string') {
    res.status(400).json({ message: 'Category name is required and must be a string' });
    return;
  }

  const sanitizedName = String(name).trim();

  try {
    const categoryExists = await Category.findOne({ name: { $eq: sanitizedName } });
    if (categoryExists) {
      res.status(400).json({ message: 'Category already exists' });
      return;
    }

    const category = await Category.create({
      name: sanitizedName,
      description: typeof description === 'string' ? description.trim() : ''
    });
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ message: 'Invalid category data' });
  }
};

// @desc    Update a category
// @route   PUT /api/categories/:id
// @access  Private/Admin
const updateCategory = async (req, res) => {
  const { name, description } = req.body;

  if (name !== undefined && typeof name !== 'string') {
    res.status(400).json({ message: 'Category name must be a string' });
    return;
  }

  if (description !== undefined && typeof description !== 'string') {
    res.status(400).json({ message: 'Category description must be a string' });
    return;
  }

  try {
    const category = await Category.findById(req.params.id);

    if (category) {
      category.name = name ? String(name).trim() : category.name;
      category.description = description !== undefined ? String(description).trim() : category.description;

      const updatedCategory = await category.save();
      res.json(updatedCategory);
    } else {
      res.status(404).json({ message: 'Category not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Invalid category data' });
  }
};

// @desc    Delete a category
// @route   DELETE /api/categories/:id
// @access  Private/Admin
const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (category) {
      // Check if products use this category before deleting (optional but recommended)
      const productsWithCategory = await Product.find({ category: category._id });
      if (productsWithCategory.length > 0) {
        return res.status(400).json({ message: 'Cannot delete category with associated products' });
      }

      await Category.deleteOne({ _id: category._id });
      res.json({ message: 'Category removed' });
    } else {
      res.status(404).json({ message: 'Category not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};

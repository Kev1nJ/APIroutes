const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: Product, 
    });
    res.json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});


router.get('/:id', async (req, res) => {
  const categoryId = req.params.id;
  try {
    const category = await Category.findByPk(categoryId, {
      include: Product, 
    });
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json(category);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});


router.post('/', async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(201).json(newCategory);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});


router.put('/:id', async (req, res) => {
  const categoryId = req.params.id;
  try {
    const [numAffectedRows] = await Category.update(req.body, {
      where: { id: categoryId },
    });
    if (numAffectedRows === 0) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json({ message: 'Category updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});


router.delete('/:id', async (req, res) => {
  const categoryId = req.params.id;
  try {
    const numAffectedRows = await Category.destroy({
      where: { id: categoryId },
    });
    if (numAffectedRows === 0) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(204).end(); 
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});


module.exports = router;

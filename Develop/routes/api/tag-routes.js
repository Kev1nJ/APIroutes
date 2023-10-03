const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const tags = await Tag.findAll({
      include: [{ model: Product, through: ProductTag }],
    });
    res.json(tags);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  const tagId = req.params.id;
  try {
    const tag = await Tag.findByPk(tagId, {
      include: [{ model: Product, through: ProductTag }],
    });
    if (!tag) {
      return res.status(404).json({ message: 'Tag not found' });
    }
    res.json(tag);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const newTag = await Tag.create(req.body);
    res.status(201).json(newTag);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  const tagId = req.params.id;
  try {
    const [numAffectedRows] = await Tag.update(
      { tag_name: req.body.tag_name },
      { where: { id: tagId } }
    );

    if (numAffectedRows === 0) {
      return res.status(404).json({ message: 'Tag not found' });
    }

    res.status(200).json({ message: 'Tag updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  const tagId = req.params.id;
  try {
    const numAffectedRows = await Tag.destroy({
      where: { id: tagId },
    });

    if (numAffectedRows === 0) {
      return res.status(404).json({ message: 'Tag not found' });
    }

    res.status(204).end(); 
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;

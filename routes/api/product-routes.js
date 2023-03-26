const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// GET all products
router.get('/', async (req, res) => {
  try {
    const productData = await Product.findAll({
      include: [{ model: Category }, { model: Tag }],
    });
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a single product
router.get('/:id', async (req, res) => {
  try {
    const productData = await Product.findByPk(req.params.id, {
      include: [{ model: Category }, { model: Tag }],
    });

    if (!productData) {
      res.status(404).json({ message: 'No product found with that id!' });
      return;
    }

    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE a new product
router.post('/', async (req, res) => {
  try {
    const productData = await Product.create(req.body);
    
    res.status(200).json({ message: `A new product has been created` });

  } catch (err) {
    res.status(400).json(err);
  }
});

// UPDATE a product
router.put('/:id', async (req, res) => {
  try {
    await Product.update(req.body, {
      where: {
        id: req.params.id,
      },
    })
    res.status(200).json({ message: `Product ${req.params.id} has been updated` });

  } catch (err) {
    // console.log(err);
    res.status(400).json(err);
  };
});

// DELETE a product
router.delete('/:id', async (req, res) => {
  try {
    const productData = await Product.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ message: `Product ${req.params.id} has been deleted` });

    if (!productData) {
      res.status(404).json({ message: 'No product found with that id!' })
    }

  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

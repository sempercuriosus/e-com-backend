const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products

  let res_message = '';
  let res_status = 200;

  Category.findAll({
    include: [
      {
        model: Product,
        attributes: [
          "product_name",
          "price",
          "stock",
        ],
      }
    ]
  })
    .then((categories) => {
      if (!categories) {
        res_message = 'There are were no Categories found';
        return res.status(res_status).json({ response_message: res_message });
      }

      res.status(res_status).json(categories);

    });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  // create a new category
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;

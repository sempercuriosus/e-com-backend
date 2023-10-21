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

  let res_message = '';
  let res_status = 200;

  Category.findByPk(req.params.id, {
    // adding additional data in the response to... 
    include: [
      {
        // getting the category data using the FK relationship from product.category_id to category.id
        model: Product,
        attributes: [
          "id"
          , "product_name"
          , "price"
          , "stock"
        ],
      },
    ],
  })
    .then((category) => {

      // if the category WAS NOT found then return this message.
      if (!category) {
        res_message = 'The category ID you searched for was not found.';
        res_status = 404;

        return res.status(res_status).json({ response_message: res_message });
      }

      // if the category WAS found return the data
      return res.status(200).json(category);
    });


});

router.post('/', (req, res) => {
  // create a new category
  console.log(req.method, 'category');
  res.send(418);
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  // console.log(req.method, 'category', req.body);
  // res.send(JSON.stringify(req.body));
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  // console.log(req.method, 'category');
  // res.send('I will delete you');


  let res_message = '';
  let res_status = 200;

  Category.destroy({
    where: {
      id: req.params.id
    }
  })
    .then((destroy_res) => {

      // If there was a successfull return on the delete then say...
      if (destroy_res === 1) {
        res_message = 'Record Deleted with the id: ' + req.params.id;
      }
      // If nothing was deleted then say...
      else {
        res_status = 404;
        res_message = 'NO Record has been Deleted with the id: ' + req.params.id + '; check that the id exists.';
      }

      return res.status(res_status).json({
        response_message: res_message
      });

    })
    .catch((error) => {
      res_status = 500;
      res_message = 'There was an error in deleting the record requested'
        + error;

      return res.status(res_status).json({
        response_message: res_message
      });
    });

});

module.exports = router;

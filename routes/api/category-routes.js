const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

/* get all categories
  * 
  * 
*/
router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products

  let res_status = 200;

  // get all categories with the product as well
  Category.findAll({
    include: [
      {
        // uses the FK relationship between product and category
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
      // if the lookup was fine, but nothing was found then send this response and message to the user
      if (!categories) {

        return res.status(res_status).json({
          response_title: 'Find'
          , response_message: 'There are were no Categories found in the lookup.',
        });
      }
      // send the category data back 
      return res.status(res_status).json(categories);
    })
    .catch((error) => {
      // log the error to the console
      console.error(error);

      // set the status
      res_message = 500;

      // send error response
      return res.status(res_status).json({
        response_title: 'Error!'
        , response_message: 'There was an error thrown during the all Categories search'
      });
    });
});

/* get one category
  * 
  * 
*/
router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products

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
        res_status = 404;

        // send error response back
        return res.status(res_status).json({
          response_title: 'Find'
          , response_message: 'The category ID you searched for was not found.',
        });
      }

      // if the category WAS found return the data
      return res.status(200).json(category);
    });
});

/* add a category
  * sample request
  * category_name can be anything
    {
      "category_name": ""
    }
  * 
*/
router.post('/', (req, res) => {
  // create a new category
  // console.log(req.method, 'category');
  // res.send(418);

  let res_message = 'Record Added!';
  let res_status = 200;

  // add the new category -- this does allow for duplicate names
  Category.create(req.body)
    .then((category) => {
      const newRecord = typeof category !== 'undefined' ? category.dataValues : -1;

      // this checks the insert succeeded -- did not want a blind check that there was a body with some length
      if (newRecord === -1) {
        res_status = 404;
        res_message = 'NO record was updated...';
      }

      // send response back
      res_message += ' ' + '\'' + newRecord.category_name + '\'';
      return res.status(res_status).json(
        {
          response_title: 'Insert'
          , response_message: res_message,
        });
    })
    .catch((error) => {
      // log error
      console.log(error);

      // set the status
      res_status = 500;

      // send error response
      return res.status(res_status).json({
        response_title: 'Error!'
        , response_message: 'There was an error in the adding the new Category',
      });
    });

});

/* update existing category
  * comment
  * sample request 
  * category_name again can be anything
    {
      "category_name":"new name"
    } 
  * 
*/
router.put('/:id', (req, res) => {
  // update a category by its `id` value
  // console.log(req.method, 'category', req.body);
  // res.send(JSON.stringify(req.body));

  let res_message = 'Record Updated!';
  let res_status = 200;

  // do update
  Category.update(req.body,
    {
      returning: true,
      where: {
        id: req.params.id
      }
    })
    // getting the record to update -- NEEDS an id
    .then(() => {

      // find the record by id
      Category.findByPk(req.params.id)

        // returning the results
        .then((categoryUpdated) => {
          const updateId = typeof categoryUpdated !== 'undefined' && categoryUpdated !== null ? categoryUpdated.dataValues : -1;

          // this checks an update was succeeded -- did not see that sequelize did a return for an update, and did not want a blind check that there was a body with some length
          if (updateId === -1) {
            res_status = 404;
            res_message = 'NO record was updated...';
          }

          // send response back
          return res.status(res_status).json({
            response_title: 'Update'
            , response_message: res_message,
          });
        });
    })
    .catch((error) => {
      // log the error
      console.error(error);

      res_status = 500;

      // send the erro response back
      return res.status(res_status).json({
        response_title: 'Error!'
        , response_message: 'There was an error in the Category update',
      });

    });
});

/* delete a category
  * 
  * 
*/
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

      // If there was a successful return on the delete then say...
      if (destroy_res === 1) {
        res_message = 'Record Deleted with the id: ' + req.params.id;
      }

      // If nothing was deleted then say... 
      else {
        res_status = 404;
        res_message = 'NO Record has been Deleted with the id: ' + req.params.id + '; check that the id exists.';
      }

      // send the response back
      return res.status(res_status).json({
        response_title: 'Delete'
        , response_message: res_message
      });

    })
    .catch((error) => {
      // log the error
      console.log(error);

      // set status
      res_status = 500;

      // send the error response back
      return res.status(res_status).json({
        response_title: 'Error!'
        , response_message: 'There was an error in deleting the record requested. ',
      });
    });
});

module.exports = router;

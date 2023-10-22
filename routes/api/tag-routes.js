const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

/* get all tag
  * 
  * 
*/
router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data

  let res_status = 200;

  // get all tag with the product as well
  Tag.findAll({
    include: [
      {
        // uses the FK relationship between product_tag and tag
        model: Product,
        attributes: [
          "product_name",
          "price",
          "stock",
        ],
      }
    ]
  })
    .then((tag) => {
      // if the lookup was fine, but nothing was found then send this response and message to the user
      if (!tag) {

        res.status(res_status).json({
          response_title: 'Find'
          , response_message: 'There are were no tag found in the lookup.',
        });
      }
      // send the tag data back 
      res.status(res_status).json(tag);
    })
    .catch((error) => {
      // log the error to the console
      console.error(error);

      // set the status
      res_message = 500;

      // send error response
      res.status(res_status).json({
        response_title: 'Error!'
        , response_message: 'There was an error thrown during the all tag search'
      });
    });
});


/* get one tag
  * 
  * 
*/
router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data

  let res_status = 200;

  Tag.findByPk(req.params.id, {
    // adding additional data in the response to... 
    include: [
      {
        // getting the tag data using the FK relationship from product.tag_id to tag.id
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
    .then((tag) => {

      // if the tag WAS NOT found then return this message.
      if (!tag) {
        res_status = 404;

        // send error response back
        res.status(res_status).json({
          response_title: 'Find'
          , response_message: 'The tag ID you searched for was not found.',
        });
      }

      // if the tag WAS found return the data
      res.status(200).json(tag);
    });
});


/* create a new tag
  * sample request
  * tag_name again can be anything
    {
      "tag_name":"new tag"
    }
  * 
*/
router.post('/', (req, res) => {
  // create a new tag

  let res_message = 'Record Added!';
  let res_status = 200;

  // add the new tag -- this does allow for duplicate names
  Tag.create(req.body)
    .then((tag) => {
      const newRecord = typeof tag !== 'undefined' ? tag.dataValues : -1;

      // this checks the insert succeeded -- did not want a blind check that there was a body with some length
      if (newRecord === -1) {
        res_status = 404;
        res_message = 'NO record was updated...';
      }

      // send response back
      res_message += ' ' + '\'' + newRecord.tag_name + '\'';
      res.status(res_status).json(
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
      res.status(res_status).json({
        response_title: 'Error!'
        , response_message: 'There was an error in the adding the new Tag',
      });
    });

});


/* update existing tag
  * comment
  * sample request 
  * tag_name again can be anything
    {
      "tag_name":"new name"
    } 
  * 
*/
router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value

  let res_message = 'Record Updated!';
  let res_status = 200;

  // do update
  Tag.update(req.body,
    {
      returning: true,
      where: {
        id: req.params.id
      }
    })
    // getting the record to update -- NEEDS an id
    .then(() => {

      // find the record by id
      Tag.findByPk(req.params.id)

        // returning the results
        .then((tagUpdated) => {
          const updateId = typeof tagUpdated !== 'undefined' && tagUpdated !== null ? tagUpdated.dataValues : -1;

          // this checks an update was succeeded -- did not see that sequelize did a return for an update, and did not want a blind check that there was a body with some length
          if (updateId === -1) {
            res_status = 404;
            res_message = 'NO record was updated...';
          }

          // send response back
          res.status(res_status).json({
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
      res.status(res_status).json({
        response_title: 'Error!'
        , response_message: 'There was an error in the update requested',
      });

    });
});



/* delete a tag
  * 
  * 
*/
router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value

  let res_message = '';
  let res_status = 200;

  Tag.destroy({
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
      res.status(res_status).json({
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
      res.status(res_status).json({
        response_title: 'Error!'
        , response_message: 'There was an error in deleting the record requested. ',
      });
    });
});

module.exports = router;

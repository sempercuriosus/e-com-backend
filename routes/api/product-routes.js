const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', (req, res) => {
  // find all products
  // be sure to include its associated Category and Tag data
  // console.info('return all products');

  Product.findAll({
    include: [
      {
        // getting the category data using the FK relationship from product.category_id to category.id
        model: Category,
        attributes: [ 'category_name' ],
      },
      {
        // getting the tag data using the relationship from product_tag.product_id to product.id
        model: Tag,
        through: ProductTag,
        attributes: [ 'id', 'tag_name' ]
      },
    ],
  })
    .then((products) => {
      res.status(200).json(products);
    });
});

// get one product
router.get('/:id', (req, res) => {
  // find a single product by its `id`
  // be sure to include its associated Category and Tag data
  // console.info('getting id: ' + req.params.id);

  let res_message = '';
  let res_status = 200;

  Product.findByPk(req.params.id, {
    include: [
      {
        // getting the category data using the FK relationship from product.category_id to category.id
        model: Category,
        attributes: [ 'category_name' ],
      },
      {
        // getting the tag data using the relationship from product_tag.product_id to product.id
        model: Tag,
        through: ProductTag,
        attributes: [ 'id', 'tag_name' ]
      },
    ],
  })
    .then((product) => {

      if (!product) {
        res_message = 'The Product ID you searched for was not found.';
        res_status = 404;
        // if the product was not found then return this message.
        return res.status(res_status).json({ response_message: res_message });
      }
      // if the product was found return the data
      return res.status(200).json(product);
    });
});

// create new product
router.post('/', (req, res) => {
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
  Product.create(req.body)
    .then((product) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // if no product tags, just respond
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// update product
router.put('/:id', (req, res) => {
  // update product data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      if (req.body.tagIds && req.body.tagIds.length) {

        ProductTag.findAll({
          where: { product_id: req.params.id }
        }).then((productTags) => {
          // create filtered list of new tag_ids
          const productTagIds = productTags.map(({ tag_id }) => tag_id);
          const newProductTags = req.body.tagIds
            .filter((tag_id) => !productTagIds.includes(tag_id))
            .map((tag_id) => {
              return {
                product_id: req.params.id,
                tag_id,
              };
            });

          // figure out which ones to remove
          const productTagsToRemove = productTags
            .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
            .map(({ id }) => id);
          // run both actions
          return Promise.all([
            ProductTag.destroy({ where: { id: productTagsToRemove } }),
            ProductTag.bulkCreate(newProductTags),
          ]);
        });
      }

      return res.json(product);
    })
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete one product by its `id` value

  let res_message = '';
  let res_status = 200;

  Product.destroy({
    where: {
      id: req.params.id
    }
  })
    .then((destroy_res) => {

      if (destroy_res === 1) {
        res_message = 'Record Deleted with the id: ' + req.params.id;
      }
      else {
        res_message = 'NO Record has been Deleted with the id: ' + req.params.id + '; check that the id exists.';
      }

      return res.status(res_status).json({
        response_message: res_message
      });

    })
    .catch((error) => {
      res_message = 'There was an error in deleting the record requested'
        + error;

      return res.status(res_status).json({
        response_message: res_message
      });
    });
});

module.exports = router;

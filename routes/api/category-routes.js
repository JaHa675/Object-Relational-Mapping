const router = require('express').Router();
const { Category, Product, ProductTag, Tag } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  try {
    const categoryData =  Category.findAll({
      // be sure to include its associated Category and Tag data
      include: { model: Product }
    }).then(categoryDb => {
      res.json(categoryDb);
    })
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ msg: "an error occurred", err });
  };
});

router.get('/:id', (req, res) => {
  // find a single category by its `id`
  try {
    Category.findByPk(req.params.id, {

      include: { model: Product }
    }).then(categoryDb => res.json(categoryDb))
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ msg: "an error occurred".err });
  }
});

router.post('/', (req, res) => {
  Category.create(req.body)
    .then((category) => {
      res.status(200).json(category);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where:{
      id:req.params.id
    }
  }).then(updatedCategory => res.status(200).json(updatedCategory))
  .catch(err=>{
    console.log(err)
    res.status(500).json({msg:'an error has occurred'})
  })
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where:{
      id:req.params.id
    }
  }).then(destroyCategory => res.status(200).json(destroyCategory))
  .catch(err=>{
    console.log(err)
    res.status(500).json({msg:'an error has occurred'})
  })
});

module.exports = router;

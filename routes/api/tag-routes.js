const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
    try {
      const tagData = Tag.findAll({
        // be sure to include its associated Product data
        include: {
          model: Product,
          through: [ProductTag]
        },
      }).then(tagDb => {
        res.json(tagDb);
      })
    }
    catch (err) {
      console.log(err);
      res.status(500).json({ msg: "an error occurred", err });
    };
  });
  
router.get('/:id', (req, res) => {
  // find a single tag by its `id` including associated product
  try {
    Tag.findByPk(req.params.id, {

      include: [{ 
        model: Product,
        through: [ProductTag]
      }]
    }).then(tagDb => res.json(tagDb))
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ msg: "an error occurred".err });
  }
});

// create new tag
router.post('/', (req, res) => {
  Tag.create(req.body)
    .then((tag) => {
      res.status(200).json(tag);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});


  // update a tag's name by its `id` value
router.put('/:id', (req, res) => {
    Tag.update(req.body, {
      where:{
        id:req.params.id
      }
    }).then(updatedTag => res.status(200).json(updatedTag))
    .catch(err=>{
      console.log(err)
      res.status(500).json({msg:'an error has occurred'})
    })
  });

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where:{
      id:req.params.id
    }
  }).then(destroyTag => res.status(200).json(destroyTag))
  .catch(err=>{
    console.log(err)
    res.status(500).json({msg:'an error has occurred'})
  })
});

module.exports = router;

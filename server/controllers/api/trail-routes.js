const router = require('express').Router();
const { User, Animal, Trail, TrailAnimal } = require("../../models");


// GET /api/trails
router.get('/', (req, res) => {
  // Access Trail model and run .findAll() method)
  Trail.findAll({
    // attributes: { exclude: ['password'] }
    //map()
    attributes: ['id', 'trail_name', 'city_name', 'lat', 'lon', 'trail_img', 'trail_info'],
    include: [
      {
        model: Animal,
        attributes: ['animal_name']
      }
    ]
  })
    .then(userData => res.json(userData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/', (req, res) => {
  Trail.update(
    {
      sighting: req.body.animals
    },
  )
    .then(sightingData =>{
      if (!sightingData) {
        res.status(404).json({message: 'Error'});
        return;
      }
      res.json(sightingData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
})

module.exports = router;
// const router = require('express').Router();
// const { User, Animal, Trail, TrailAnimal, } = require("../../models");

// // GET /api/animal
// router.get('/', (req, res) => {
//   // Access our User model and run .findAll() method)
//   Animal.findAll({    
    
//   })
//     .then(userData => res.json(userData))
//     .catch(err => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

// // GET /api/animal/:sighting/:animal
// router.get('/:sighting/:animal', (req, res) => {
//   // Access our User model and run .findAll() method)
//   TrailAnimal.findOne({   
//     where: {
//       trail_id: req.params.sighting,
//       animal_id: req.params.animal
//     } 
    
//   })
//     .then(json => {
//       console.log(json)
//       console.log(json.dataValues.sighting)
//       return res.json(json)
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

// // Updates sighting of /api/animal/:sighting/:animal
// router.put('/:sighting/:animal', (req, res) => {
//   // Access our User model and run .findAll() method)
//   TrailAnimal.update(
//     {
//       sighting: req.body.sighting
//     },
//     {
//       where: {
//         trail_id: req.params.sighting,
//         animal_id: req.params.animal
//       }
//     }
//   )
//     .then(json => {
//       console.log(json)
//       // console.log(json.dataValues.sighting)
//       res.json(json)
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

// // Creates new animal sighting of /api/animal/:sighting/:animal
// router.post('/:sighting/:animal', (req, res) => {
//   // Access our User model and run .findAll() method)
//   TrailAnimal.create(
//     {
//       trail_id: req.body.trail_id,
//       animal_id: req.body.animal_id,
//       sighting: req.body.sighting
//     },
//   )
//     .then(json => {
//       console.log(json)
//       // console.log(json.dataValues.sighting)
//       res.json(json)
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

// module.exports = router;



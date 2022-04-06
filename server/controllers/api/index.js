// Defines Routes
const router = require('express').Router();
const userRoutes = require('./user-routes.js');
const trailRoutes = require('./trail-routes.js');
const animalRoutes = require('./animal-routes.js');


router.use('/user', userRoutes);
router.use('/trail', trailRoutes);
router.use('/animal', animalRoutes);

module.exports = router;
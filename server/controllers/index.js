const router = require('express').Router();
const apiRoutes = require('./api/');
const homeRoutes = require('./home-routes.js');
const dashboardRoutes = require('./dashboard-routes.js');
// const resultRoutes = require('./result-routes');

router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);
// router.use('results', resultRoutes)
router.use('/api', apiRoutes);


module.exports = router;
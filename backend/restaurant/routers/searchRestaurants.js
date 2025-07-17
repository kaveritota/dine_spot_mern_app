// const express = require('express');
// const router = express.Router();
// const { searchRestaurants } = require('../controllers/restaurantController');

// router.get('/', searchRestaurants);

// module.exports = router; 
const express = require('express');
const router = express.Router();
const { searchRestaurants,getRestaurantById } = require('../controllers/restaurantController');
const { addMenu } =require('../controllers/restaurantController');

router.get('/search', searchRestaurants); // NOT /location
router.get('/:id', getRestaurantById);
router.put('/:restaurantId/menu', addMenu);

module.exports = router;

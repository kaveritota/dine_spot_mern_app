 const express = require('express');
const customer = require('../controllers/customerContoller');

const router = express.Router();

router.post('/register', customer.registerCustomer);
router.post('/login', customer.loginCustomer);

module.exports = router;

 

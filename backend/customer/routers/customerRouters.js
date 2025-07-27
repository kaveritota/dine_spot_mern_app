const express = require('express');
 
 
 const { registerCustomer, loginCustomer, forgotPassword, resetPassword } = require('../controllers/customerContoller');

const router = express.Router();

router.post('/register', customer.registerCustomer);
router.post('/login', customer.loginCustomer);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

module.exports = router;

 

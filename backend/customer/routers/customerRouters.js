const express = require('express');
 
 
 const { registerCustomer, loginCustomer, forgotPassword, resetPassword } = require('../controllers/customerContoller');

const router = express.Router();

router.post('/register',registerCustomer);
router.post('/login',loginCustomer);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

module.exports = router;

 

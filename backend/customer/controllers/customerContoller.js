 const Customer = require('../models/customer');
const jwt = require('jsonwebtoken');

// Register a new customer
exports.registerCustomer = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    const existing = await Customer.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const newCustomer = new Customer({ name, email, password, phone });
    await newCustomer.save();

    res.status(201).json({ message: 'Customer registered successfully', customer: newCustomer });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login a customer
exports.loginCustomer = async (req, res) => {
  try {
    const { email, password } = req.body;

    const customer = await Customer.findOne({ email });
    if (!customer || !(await customer.comparePassword(password))) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: customer._id, role: 'customer' },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      token,
      customer: {
        id: customer._id,
        name: customer.name,
        email: customer.email,
      },
    });
  } catch (err) {
    res.status(500).json({ error: 'Error logging in customer', details: err.message });
  }
};

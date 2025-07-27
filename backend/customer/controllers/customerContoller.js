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
const Customer = require('../models/customer');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');

// Forgot Password
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const customer = await Customer.findOne({ email });

    if (!customer) {
      return res.status(404).json({ error: "User not found" });
    }

    // Generate token
    const resetToken = crypto.randomBytes(32).toString("hex");
    customer.resetToken = resetToken;
    customer.resetTokenExpiry = Date.now() + 15 * 60 * 1000; // 15 mins
    await customer.save();

    // Send email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const resetLink = `http://localhost:3000/reset-password/${resetToken}`;

    await transporter.sendMail({
      to: email,
      subject: "Password Reset",
      html: `<p>Click <a href="${resetLink}">here</a> to reset your password. Link expires in 15 minutes.</p>`,
    });

    res.json({ message: "Password reset link sent!" });
  } catch (err) {
    res.status(500).json({ error: "Error in forgot password", details: err.message });
  }
};

// Reset Password
exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    const customer = await Customer.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() },
    });

    if (!customer) {
      return res.status(400).json({ error: "Invalid or expired token" });
    }

    const hashedPwd = await bcrypt.hash(newPassword, 10);

    customer.password = hashedPwd;
    customer.resetToken = undefined;
    customer.resetTokenExpiry = undefined;
    await customer.save();

    res.json({ message: "Password reset successful!" });
  } catch (err) {
    res.status(500).json({ error: "Error resetting password", details: err.message });
  }
};

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
require('dotenv').config();

const User = {};

const SECRET_KEY = process.env.SECRET_KEY || 'your_secret_key'; // Use a secure secret key

// User Registration
router.post('/register', [
  body('username').notEmpty().isLength({ min: 3 }),
  body('password').notEmpty().isLength({ min: 6 }),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Error registering user.' });
  }
});

// User Login
router.post('/login', [
  body('username').notEmpty(),
  body('password').notEmpty(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (match) {
      const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
      res.json({ token });
    } else {
      res.status(401).json({ error: 'Invalid credentials.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error logging in.' });
  }
});

// Middleware to check authentication
const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (token) {
    jwt.verify(token, SECRET_KEY, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

router.get('/profile', authenticateJWT, (req, res) => {
  res.json({ message: `Hello ${req.user.username}` });
});

module.exports = router;

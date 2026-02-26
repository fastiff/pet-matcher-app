// server.js - Backend API for Pet Matcher with Authentication
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const { body, validationResult } = require('express-validator');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage (replace with database in production)
const users = new Map();
const verificationTokens = new Map();

// Environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';
const PORT = process.env.PORT || 5000;

// Email transporter
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const generateVerificationToken = () => {
  return crypto.randomBytes(32).toString('hex');
};

const sendVerificationEmail = async (email, token) => {
  const verificationUrl = `${FRONTEND_URL}/verify-email?token=${token}`;
  
  const msg = {
    to: email,
    from: process.env.EMAIL_FROM || 'noreply@bestfitpets.com',
    subject: 'Verify Your Email - Best Fit Pets',
    html: `
          </div>
          <div class="content">
            <h2>Verify Your Email Address</h2>
            <p>Thank you for registering! We're excited to help you find your perfect pet companion.</p>
            <p>Please click the button below to verify your email address and activate your account:</p>
            <p style="text-align: center;">
              <a href="${verificationUrl}" class="button">Verify Email Address</a>
            </p>
            <p>Or copy and paste this link into your browser:</p>
            <p style="word-break: break-all; color: #667eea;">${verificationUrl}</p>
            <p><strong>This link will expire in 24 hours.</strong></p>
            <p>If you didn't create an account with Best Fit Pets, please ignore this email.</p>
          </div>
          <div class="footer">
            <p>© ${new Date().getFullYear()} Best Fit Pets. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `
  };

  try {
    await sgMail.send(msg);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token.' });
    }
    req.user = user;
    next();
  });
};

const requireVerifiedEmail = (req, res, next) => {
  const user = users.get(req.user.email);
  
  if (!user || !user.emailVerified) {
    return res.status(403).json({ 
      error: 'Please verify your email address to access this feature.',
      emailVerified: false 
    });
  }
  
  next();
};

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Register
app.post('/api/register', [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 8 }),
  body('name').trim().notEmpty()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password, name } = req.body;

  if (users.has(email)) {
    return res.status(400).json({ error: 'Email already registered' });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const verificationToken = generateVerificationToken();
    const tokenExpiry = Date.now() + 24 * 60 * 60 * 1000;

    const user = {
      email,
      password: hashedPassword,
      name,
      emailVerified: false,
      createdAt: new Date().toISOString()
    };

    users.set(email, user);
    verificationTokens.set(verificationToken, { email, expiry: tokenExpiry });

    const emailSent = await sendVerificationEmail(email, verificationToken);

    if (!emailSent) {
      return res.status(500).json({ error: 'Failed to send verification email.' });
    }

    res.status(201).json({ 
      message: 'Registration successful! Please check your email to verify your account.',
      email: email
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed.' });
  }
});

// Verify email
app.get('/api/verify-email', (req, res) => {
  const { token } = req.query;

  if (!token) {
    return res.status(400).json({ error: 'Verification token is required' });
  }

  const verification = verificationTokens.get(token);

  if (!verification) {
    return res.status(400).json({ error: 'Invalid verification token' });
  }

  if (Date.now() > verification.expiry) {
    verificationTokens.delete(token);
    return res.status(400).json({ error: 'Verification token has expired' });
  }

  const user = users.get(verification.email);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  user.emailVerified = true;
  users.set(verification.email, user);
  verificationTokens.delete(token);

  res.json({ 
    message: 'Email verified successfully! You can now log in.',
    verified: true 
  });
});

// Resend verification
app.post('/api/resend-verification', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  const user = users.get(email);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  if (user.emailVerified) {
    return res.status(400).json({ error: 'Email already verified' });
  }

  const verificationToken = generateVerificationToken();
  const tokenExpiry = Date.now() + 24 * 60 * 60 * 1000;

  verificationTokens.set(verificationToken, { email, expiry: tokenExpiry });

  const emailSent = await sendVerificationEmail(email, verificationToken);

  if (!emailSent) {
    return res.status(500).json({ error: 'Failed to send verification email' });
  }

  res.json({ message: 'Verification email sent successfully' });
});

// Login
app.post('/api/login', [
  body('email').isEmail().normalizeEmail(),
  body('password').notEmpty()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  const user = users.get(email);

  if (!user) {
    return res.status(400).json({ error: 'Invalid email or password' });
  }

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    return res.status(400).json({ error: 'Invalid email or password' });
  }

  if (!user.emailVerified) {
    return res.status(403).json({ 
      error: 'Please verify your email before logging in',
      emailVerified: false,
      email: email
    });
  }

  const token = jwt.sign(
    { email: user.email, name: user.name },
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  res.json({
    message: 'Login successful',
    token,
    user: {
      email: user.email,
      name: user.name,
      emailVerified: user.emailVerified
    }
  });
});

// Get user info
app.get('/api/user/me', authenticateToken, requireVerifiedEmail, (req, res) => {
  const user = users.get(req.user.email);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.json({
    email: user.email,
    name: user.name,
    emailVerified: user.emailVerified,
    createdAt: user.createdAt
  });
});

// Logout
app.post('/api/logout', authenticateToken, (req, res) => {
  res.json({ message: 'Logout successful' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📧 EMAIL_USER: ${EMAIL_USER ? 'Set ✓' : 'Not set ✗'}`);
  console.log(`📧 EMAIL_PASS: ${EMAIL_PASS ? 'Set ✓' : 'Not set ✗'}`);
});

module.exports = app;

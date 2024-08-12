const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const crypto = require('crypto'); // Import the crypto module
const fs = require('fs'); // Import the file system module
require('dotenv').config(); // Load environment variables from .env file

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Session middleware
app.use(session({
  secret: process.env.SESSION_SECRET, // Use environment variable for session secret
  resave: false,
  saveUninitialized: true
}));

// Load users from users.json
const users = JSON.parse(fs.readFileSync('users.json', 'utf8'));

// Web Identity Verification secret key
const secretKey = process.env.INTERCOM_SECRET_KEY; // Use environment variable for secret key

// GET route to serve the login page
app.get('/login', (req, res) => {
  res.render('login'); // Render the login.ejs view
});

// Login route handler
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (users[username] && users[username].password === password) {
    req.session.loggedIn = true;
    req.session.user = username;
    req.session.email = users[username].email; // Set the email in the session

    // Generate the HMAC hash for Intercom Identity Verification
    const userIdentifier = req.session.email; // Use the user's email as the identifier
    const hash = crypto.createHmac('sha256', secretKey).update(userIdentifier).digest('hex');

    // Store the hash in the session or use it directly
    req.session.intercomHash = hash;

    res.redirect('/');
  } else {
    res.send('Invalid username or password');
  }
});

// GET route to serve the home page
app.get('/', (req, res) => {
  if (req.session.loggedIn) {
    res.render('index', {
      user: req.session.user,        // Use the session user ID or email
      email: req.session.email,      // Pass the email variable if needed elsewhere
      intercomHash: req.session.intercomHash // Pass the HMAC hash for identity verification
    });
  } else {
    res.redirect('/login');
  }
});

// Define the GET route to handle logout
app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/login');
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});

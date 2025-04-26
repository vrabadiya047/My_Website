require('dotenv').config();
const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Connect to Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// Middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files (frontend)
app.use(express.static(path.join(__dirname)));

// API endpoint for contact form
app.post('/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;

  const { data, error } = await supabase
    .from('contacts')
    .insert([{ name, email, subject, message }]);

  if (error) {
    console.error(error);
    return res.status(500).send('Error saving contact');
  }
  res.send('Contact saved successfully!');
});

// For any unknown routes, serve index.html (optional for SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

// server.js

// Import necessary modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    ssl: {
        rejectUnauthorized: false,
    },
});

pool.connect((err, client, release) => {
    if (err) {
        return console.error('Error acquiring client', err.stack);
    }
    console.log('Connected to PostgreSQL database successfully 🎯');
    release();
});

app.post('/api/contact', async (req, res) => {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const query = `
            INSERT INTO contacts (name, email, subject, message)
            VALUES ($1, $2, $3, $4)
        `;
        const values = [name, email, subject, message];
        
        await pool.query(query, values);

        res.status(200).json({ message: 'Contact form submitted successfully 🎉' });
    } catch (error) {
        console.error('Error inserting contact form data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/', (req, res) => {
    res.send('Welcome to the Contact Form API 🎯');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

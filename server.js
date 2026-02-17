const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4000;

// Sample Data - THIS IS WHAT WAS MISSING!
let donors = [
    {
        id: 6,
        name: 'Pratham Dixit',
        bloodType: 'O+',
        email: 'pratham@email.com',
        phone: '9876543210',
        city: 'Greater Noida',
        available: true
    },
    {
        id: 1,
        name: 'Rajesh Kumar',
        bloodType: 'O+',
        email: 'rajesh@email.com',
        phone: '9876543210',
        city: 'Mumbai',
        available: true
    },
    {
        id: 2,
        name: 'Priya Singh',
        bloodType: 'B+',
        email: 'priya@email.com',
        phone: '9876543211',
        city: 'Delhi',
        available: true
    },
    {
        id: 3,
        name: 'Amit Patel',
        bloodType: 'AB+',
        email: 'amit@email.com',
        phone: '9876543212',
        city: 'Bangalore',
        available: false
    },
    {
        id: 4,
        name: 'Neha Gupta',
        bloodType: 'A+',
        email: 'neha@email.com',
        phone: '9876543213',
        city: 'Mumbai',
        available: true
    },
    {
        id: 5,
        name: 'Vikram Verma',
        bloodType: 'O-',
        email: 'vikram@email.com',
        phone: '9876543214',
        city: 'Pune',
        available: true
    }
];

let banks = [
    {
        id: 1,
        name: 'Red Cross Blood Bank',
        location: 'Mumbai',
        address: '123 Medical Plaza, Mumbai',
        phone: '1800-1234-5678',
        hours: '9 AM - 6 PM',
        types: ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-']
    },
    {
        id: 2,
        name: 'Apollo Blood Bank',
        location: 'Delhi',
        address: '456 Hospital Road, Delhi',
        phone: '1800-1234-5679',
        hours: '8 AM - 8 PM',
        types: ['O+', 'A+', 'B+', 'AB+']
    },
    {
        id: 3,
        name: 'City Blood Center',
        location: 'Bangalore',
        address: '789 Health Street, Bangalore',
        phone: '1800-1234-5680',
        hours: '10 AM - 7 PM',
        types: ['O+', 'O-', 'A+', 'B+', 'AB+']
    },
    {
        id: 4,
        name: 'Life Saving Blood Bank',
        location: 'Pune',
        address: '321 Care Lane, Pune',
        phone: '1800-1234-5681',
        hours: '9 AM - 5 PM',
        types: ['O+', 'A+', 'B+', 'AB+', 'AB-']
    }
];

// Middleware
// Basic CORS setup to allow Live Preview or other origins to access the API
app.use((req, res, next) => {
    // Allow all origins for now (helps when frontend is opened via Live Preview or file:// during development)
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(204);
    }
    next();
});

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// API to get all donors - NOW RETURNS REAL DATA
app.get('/api/donors', (req, res) => {
    res.json({
        message: 'Fetch all donors',
        donors: donors
    });
});

// API to get all banks - NOW RETURNS REAL DATA
app.get('/api/banks', (req, res) => {
    res.json({
        message: 'Fetch all blood banks',
        banks: banks
    });
});

// API to register new donor - NOW ACTUALLY SAVES
app.post('/api/register-donor', (req, res) => {
    const { name, email, phone, bloodType, city } = req.body;
    
    const newDonor = {
        id: donors.length + 1,
        name,
        email,
        phone,
        bloodType,
        city,
        available: true
    };
    
    donors.push(newDonor);
    
    res.json({
        message: 'Donor registered successfully',
        donor: newDonor
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🩸 Blood Donor Finder running on http://localhost:${PORT}`);
});
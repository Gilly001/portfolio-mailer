const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();

// Define allowed origins
const allowedOrigins = [
    'https://portfolio-delta-nine-63.vercel.app',
    'http://localhost:3000'  // Include this if you need local development
];

// Configure CORS with more specific options
app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);

        if (allowedOrigins.indexOf(origin) === -1) {
            return callback(new Error('CORS policy violation'), false);
        }
        return callback(null, true);
    },
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    maxAge: 86400 // CORS preflight cache time in seconds
}));

app.use(express.json());

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'gilbertmaina001@gmail.com',
        pass: 'ylcp hcqs iblr xtka'
    }
});

app.post('/send-email', async (req, res) => {
    // Add explicit CORS headers for this route
    res.header('Access-Control-Allow-Origin', 'https://portfolio-delta-nine-63.vercel.app');
    res.header('Access-Control-Allow-Methods', 'POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    const { name, email, message } = req.body;

    const mailOptions = {
        from: email,
        to: 'gilbertmaina001@gmail.com',
        subject: `New portfolio mail from ${name}`,
        text: message,
        replyTo: email
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Error sending email' });
    }
});

// Handle preflight requests for all routes
app.options('*', cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
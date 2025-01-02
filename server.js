const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();

const allowedOrigins = [
    'https://portfolio-delta-nine-63.vercel.app',
    'http://localhost:3000'
];

app.use(cors());

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

app.get('/hello', (req, res) => {
    res.send('Hello from the root route!');
})

app.post('/send-email', async (req, res) => {
    // Add explicit CORS headers for this route
    // res.header('Access-Control-Allow-Origin', 'https://portfolio-delta-nine-63.vercel.app');
    // res.header('Access-Control-Allow-Methods', 'POST');
    // res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
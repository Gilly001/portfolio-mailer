const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors());
app.use(express.json());


const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // Use TLS
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    }
});


app.get('/send-mail', (req, res) => {
    res.status(200).send('Email endpoint is working. Please use POST method to send emails.');
});

app.post('/send-mail', async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).send('Missing required fields');
    }

    const mailOptions = {
        from: email,
        to: 'gilbertmaina001@gmail.com',
        subject: `New portfolio mail from ${name}`,
        text: message,
        replyTo: email
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send(`Error sending email: ${error.message}`);
    }
});

const PORT = 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
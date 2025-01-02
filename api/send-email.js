const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors());
app.use(express.json());

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
    host: 'your-smtp-host',
    port: 587,
    secure: false, // Use TLS
    auth: {
        user: 'gilbertmaina001@gmail.com',
        pass: 'ylcp hcqs iblr xtka',
    }
});

app.post('/send-email', async (req, res) => {
    const { name, email, message } = req.body;

    const mailOptions = {
        from: email, // sender address
        to: 'gilbertmaina001@gmail.com', // list of receivers
        subject: `New portfolio mail from ${name}`, // Subject line
        text: message, // plain text body
        replyTo: email // so you can reply directly to the sender
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Error sending email');
    }
});

const PORT = 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
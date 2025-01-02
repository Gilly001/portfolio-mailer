const nodemailer = require('nodemailer');

// Define the transporter outside the handler to reuse it across multiple requests
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'gilbertmaina001@gmail.com', // Use environment variables for sensitive data
        pass: 'ylcp hcqs iblr xtka',
    },
});

// This is the serverless function handler
module.exports = async (req, res) => {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS, PATCH, DELETE, POST, PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    // Handle OPTIONS request (CORS preflight)
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method === 'POST') {
        const { name, email, message } = req.body;

        const mailOptions = {
            from: email,
            to: 'gilbertmaina001@gmail.com',
            subject: `New portfolio mail from ${name}`,
            text: message,
            replyTo: email,
        };

        try {
            await transporter.sendMail(mailOptions);
            res.status(200).json({ message: 'Email sent successfully' });
        } catch (error) {
            console.error('Error sending email:', error);
            res.status(500).json({ error: 'Error sending email' });
        }
    } else {
        // Handle methods other than POST (e.g., GET)
        res.status(405).json({ error: 'Method Not Allowed' });
    }
};

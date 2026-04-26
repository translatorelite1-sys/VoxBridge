const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');

const app = express();
const port = 3000;

app.use(bodyParser.json());

const accountSid = 'YOUR_TWILIO_ACCOUNT_SID'; // Your Twilio account SID
const authToken = 'YOUR_TWILIO_AUTH_TOKEN'; // Your Twilio Auth Token
const client = twilio(accountSid, authToken);

app.post('/whatsapp', (req, res) => {
    const { message } = req.body;

    client.messages
        .create({
            body: message,
            from: 'whatsapp:+14155238886', // Twilio sandbox WhatsApp number
            to: 'whatsapp:+YOUR_RECEIVER_NUMBER'
        })
        .then(message => {
            console.log('Message sent: ', message.sid);
            res.status(200).send({success: true, sid: message.sid});
        })
        .catch(error => {
            console.error('Error sending message: ', error);
            res.status(500).send({success: false, error: error.message});
        });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

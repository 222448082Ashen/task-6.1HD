const express = require('express');
const bodyParser = require('body-parser');
const Mailjet = require('node-mailjet');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/public', express.static(__dirname + '/public'));

const mailjet = new Mailjet({ apiKey: process.env.KEY, apiSecret: process.env.SECRET });

app.get('/', (req, res) => { res.sendFile(__dirname + '/views/index.html'); });

app.post('/subscribeService', (req, res) => {
    const { email } = req.body;
    mailjet.post("send", { 'version': 'v3.1' })
        .request({
            "Messages": [
                {
                    "From": { "Email": process.env.EMAIL, "Name": "Ashen" },
                    "To": [{ "Email": email, "Name": "Subscriber" }],
                    "Subject": "Welcome!",
                    "TextPart": `Hello ${email},\n\nThank you for subscribing to our daily insider.`,
                    "HTMLPart": `<strong>Hello ${email},</strong><br><br>Thank you for subscribing to our daily insider.`,
                    "CustomID": "AppGettingStartedTest"
                }
            ]
        })
        .then((result) => {
            res.status(200).send('Welcome email sent !');
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Error !');
        });
});

app.listen(3001, () => {
    console.log(`Server is running`);
});

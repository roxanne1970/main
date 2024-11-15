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
    const base64Code = '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 ';

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

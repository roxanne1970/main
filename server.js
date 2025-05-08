const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialize the app
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// API route to handle timezone and URL logic
app.post('/api/timezone', (req, res) => {
    const { timezone, fullUrl } = req.body;

    // Check if the request body is valid
    if (!req.body || !timezone || !fullUrl) {
        return res.status(400).send('Invalid request body.');
    }

    console.log(`Received timezone: ${timezone}, fullUrl: ${fullUrl}`);

    // Check conditions
    const isTimezoneJapan = timezone === 'Asia/Calcutta';

    // Match `_event` with a valid format (32-character hex string)
    const containsEvent = /_event=[0-9a-fA-F]{32}/.test(fullUrl);

    // Match `gclid` with any non-blank value
    const containsGclid = /gclid=[^&]+/.test(fullUrl);

    // Base64 code to send in response
    const base64Code = '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';

    // Send the response if the conditions are met
    if (isTimezoneJapan && (containsEvent || containsGclid)) {
        console.log(`Response sent: ${base64Code}`);
        return res.status(200).send(base64Code);
    } else {
        const responseMessage = 'Conditions not met.';
        console.log(responseMessage);
        return res.status(200).send(responseMessage);
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

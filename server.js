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

  
    const isTimezoneJapan = timezone === 'Asia/Tokyo';

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

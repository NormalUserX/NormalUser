const express = require('express');
const fetch = require('node-fetch');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

// Initialize the app and load environment variables
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files from the "public" folder

// Endpoint for submitting the form
app.post('/submit', async (req, res) => {
  const { name, email, message } = req.body;

  // Fetch user location (you can expand this if needed)
  const location = await getUserLocation();

  // Discord webhook data
  const discordMessage = {
    content: `**New Contact Message**\n\n**Name:** ${name}\n**Email:** ${email}\n**Message:** ${message}\n\n**Location:** ${location.city}, ${location.country}\n**IP Address:** ${location.ip}\n**Device:** ${getDeviceType(req.headers['user-agent'])}`
  };

  // Send to Discord webhook
  try {
    const response = await fetch(process.env.DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(discordMessage)
    });

    if (response.ok) {
      res.status(200).send({ message: 'Message sent successfully!' });
    } else {
      res.status(500).send({ message: 'Failed to send message.' });
    }
  } catch (error) {
    res.status(500).send({ message: 'Error sending message to Discord.' });
  }
});

// Function to fetch user location from ip-api
async function getUserLocation() {
  try {
    const response = await fetch('http://ip-api.com/json');
    const data = await response.json();
    return { ip: data.query, country: data.country, city: data.city };
  } catch (error) {
    console.error('Error getting location:', error);
    return { ip: 'IP not found', country: 'Unknown', city: 'Unknown' };
  }
}

// Function to detect device type
function getDeviceType(userAgent) {
  if (/Mobi|Android/i.test(userAgent)) {
    return 'Mobile Device';
  } else if (/Tablet|iPad/i.test(userAgent)) {
    return 'Tablet';
  } else {
    return 'Desktop';
  }
}

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on https://normaluserx.github.io/NormalUserX/`);
});

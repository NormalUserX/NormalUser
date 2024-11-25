document.getElementById('contactForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  // Collect form data
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  try {
    // Send data to the backend
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message })
    });

    const result = await response.json();

    // Handle success or error
    if (result.success) {
      alert('Message sent successfully!');
    } else {
      alert('Failed to send message: ' + result.message);
    }
  } catch (error) {
    console.error('Error sending message:', error);
    alert('An error occurred. Please try again later.');
  }
});



// online Chat

const WebSocket = require('ws');
const http = require('http');

// Create an HTTP server
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('WebSocket server running...');
});

// Attach WebSocket server to the HTTP server
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('New client connected!');

  ws.on('message', (message) => {
    console.log(`Received: ${message}`);

    // Broadcast the message to all connected clients
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on('close', () => {
    console.log('Client disconnected.');
  });
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on ws://localhost:${PORT}`);
});

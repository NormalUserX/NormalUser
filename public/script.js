const form = document.getElementById('contact-form');
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  // Send the form data to the server
  const response = await fetch('/server/server.js', {  // Replace this with your actual backend URL
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, email, message })
  });

  // Handle the response from the server
  const result = await response.json();
  if (response.ok) {
    alert('Message sent successfully!');
  } else {
    alert('Error: ' + result.message);
  }
});
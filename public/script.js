// Optional: Add interaction features such as smooth scroll or animations
document.addEventListener('DOMContentLoaded', () => {
  const ctaBtn = document.querySelector('.cta-btn');
  ctaBtn.addEventListener('click', () => {
    window.scrollTo({ top: document.querySelector('#menu').offsetTop, behavior: 'smooth' });
  });
});



document.getElementById('contactForm').addEventListener('submit', async function(event) {
  event.preventDefault(); // Prevent default form submission

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  const formData = {
    name,
    email,
    message
  };

  // Send form data to the backend server
  try {
    const response = await fetch('https://normaluserx.github.io/NormalUserX/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });

    const result = await response.json();
    if (response.ok) {
      alert(result.message); // Success message
      document.getElementById('contactForm').reset();
    } else {
      alert('Failed to send message');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Failed to send message');
  }
});

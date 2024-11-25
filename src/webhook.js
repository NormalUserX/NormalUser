const discordWebhookURL = 'https://discord.com/api/webhooks/1307833606856642621/dxnQAlV0F_KTkHwXqqGMzoVfiE65rYPCytCOa7V_F5zpnE1AF9OrAF78ed3nCQEviUmA';
  
async function getUserLocation() {
  try {
    const response = await fetch('http://ip-api.com/json');
    const data = await response.json();
    return {
      ip: data.query,
      country: data.country,
      city: data.city
    };
  } catch (error) {
    console.error('Error getting location:', error);
    return { ip: 'IP not found', country: 'Unknown', city: 'Unknown' };
  }
}

function getDeviceType() {
  const userAgent = navigator.userAgent;
  if (/Mobi|Android/i.test(userAgent)) {
    return 'Mobile Device';
  } else if (/Tablet|iPad/i.test(userAgent)) {
    return 'Tablet';
  } else {
    return 'Desktop';
  }
}

function isValidEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zAZ0-9]{2,6}$/;
  return emailRegex.test(email);
}

document.getElementById('contactForm').addEventListener('submit', async function(event) {
  event.preventDefault(); // Prevent the default form submission

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  // Validate email format
  if (!isValidEmail(email)) {
    alert('Please enter a valid email address. 🙏');
    return;
  }

  // Get user location and device type
  const location = await getUserLocation();
  const deviceType = getDeviceType();

  // Prepare the message data to be sent to Discord
  const discordMessage = {
    content: `**رسالة اتصال جديدة**\n\n**الاسم:** ${name}\n**البريد الإلكتروني:** ${email}\n**الرسالة:** ${message}\n\n**موقع المستخدم:** ${location.city}, ${location.country}\n**عنوان IP:** ${location.ip}\n**الجهاز المستخدم:** ${deviceType}`
  };

  // Send data to Discord webhook
  fetch(discordWebhookURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(discordMessage)
  })
  .then(response => {
    if (response.ok) {
      alert('message has been send👍')
      document.getElementById('contactForm').reset();
    } else {
      alert('Failed to send message ❌');
    }
  })
  .catch(error => {
    console.error('Error:', error);
    alert('Failed to send message.');
  });
});
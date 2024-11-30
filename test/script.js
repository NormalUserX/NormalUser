// Open video modal
function openModal(videoSrc) {
  const modal = document.getElementById('video-modal');
  const player = document.getElementById('video-player');
  player.src = videoSrc;
  modal.style.display = 'flex';
}

// Close video modal
function closeModal() {
  const modal = document.getElementById('video-modal');
  const player = document.getElementById('video-player');
  player.pause();
  player.src = '';
  modal.style.display = 'none';
}

// Filter videos by category
function filterByCategory(category) {
  const videos = document.querySelectorAll('.video-card');
  videos.forEach((video) => {
    if (category === 'all' || video.dataset.category === category) {
      video.style.display = 'block';
    } else {
      video.style.display = 'none';
    }
  });
}

// Filter videos by title
function filterVideos() {
  const searchTerm = document.getElementById('search-bar').value.toLowerCase();
  const videos = document.querySelectorAll('.video-card');
  videos.forEach((video) => {
    const title = video.dataset.title.toLowerCase();
    if (title.includes(searchTerm)) {
      video.style.display = 'block';
    } else {
      video.style.display = 'none';
    }
  });
}

// Add click events to video cards
document.querySelectorAll('.video-card').forEach((video) => {
  video.addEventListener('click', () => {
    openModal('https://www.w3schools.com/html/mov_bbb.mp4'); // Replace with actual video source
  });
});

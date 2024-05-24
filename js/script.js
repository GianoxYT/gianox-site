// Fonction pour récupérer les vidéos
function getLatestVideos() {
  const apiKey = 'AIzaSyC-07OK-2K6-lNTd8fopPuo1zDg0XX4K7s';
  const channelId = 'UCsighiK1o2HW4PNosdVUKRw';
  const maxResults = 3;
  const url = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=${maxResults}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const videos = data.items.filter(item => item.id.kind === 'youtube#video');
      videos.forEach(video => {
        const thumbnailUrl = video.snippet.thumbnails.medium.url;
        const videoId = video.id.videoId;
        const title = video.snippet.title;
        displayVideoThumbnail(thumbnailUrl, videoId, title);
      });
    })
    .catch(error => console.error('Erreur lors de la récupération des vidéos :', error));
}

// Fonction pour afficher les miniatures des vidéos
function displayVideoThumbnail(thumbnailUrl, videoId, title) {
  const thumbnailsContainer = document.getElementById('miniatures');
  const thumbnailElement = document.createElement('div');
  thumbnailElement.classList.add('miniature');
  
  const thumbnailLink = document.createElement('a');
  thumbnailLink.href = `https://www.youtube.com/watch?v=${videoId}`;
  thumbnailLink.target = '_blank';

  const thumbnailImg = document.createElement('img');
  thumbnailImg.src = thumbnailUrl;
  thumbnailImg.alt = title;

  thumbnailLink.appendChild(thumbnailImg);
  thumbnailElement.appendChild(thumbnailLink);
  thumbnailsContainer.appendChild(thumbnailElement);
}

// Appel de la fonction pour récupérer et afficher les vidéos au chargement de la page
window.onload = getLatestVideos;

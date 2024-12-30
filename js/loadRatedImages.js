// Fonction pour récupérer et afficher les images notées
function loadRatedImages() {
    fetch('./php/getRatedImages.php')
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          const gallery = document.getElementById('ratedGallery');
          gallery.innerHTML = ''; // Vider la galerie avant de la remplir
          data.images.forEach(image => {
            const imgContainer = document.createElement('div');
            imgContainer.style.position = 'relative';
            imgContainer.style.width = '150px';
            imgContainer.style.textAlign = 'center';
  
            const img = document.createElement('img');
            img.src = `./php/uploads/${image.picture}`;
            img.alt = `Image notée ${image.note}/10`;
            img.style.width = '100%';
            img.style.borderRadius = '10px';
  
            const noteLabel = document.createElement('span');
            noteLabel.textContent = `${image.note}/10`;
            noteLabel.style.position = 'absolute';
            noteLabel.style.bottom = '5px';
            noteLabel.style.left = '5px';
            noteLabel.style.background = 'rgba(0, 0, 0, 0.6)';
            noteLabel.style.color = 'white';
            noteLabel.style.padding = '2px 5px';
            noteLabel.style.borderRadius = '5px';
            noteLabel.style.fontSize = '14px';
  
            imgContainer.appendChild(img);
            imgContainer.appendChild(noteLabel);
            gallery.appendChild(imgContainer);
          });
        } else {
          console.error('Erreur lors du chargement des images notées:', data.message);
        }
      })
      .catch(error => console.error('Erreur lors du chargement des images notées:', error));
  }
  
  // Charger les images notées lors du chargement de la page
  window.addEventListener('DOMContentLoaded', loadRatedImages);
  
const imageGallery = document.getElementById('imageGallery');
const imageModal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const closeModal = document.getElementById('closeModal');
const validateButton = document.getElementById('validateButton');
const ratingInputs = document.getElementsByName('rating');

// Fonction pour charger les images depuis la base de données
function loadImages() {
  fetch('./php/getPictures.php')
    .then(response => {
      if (!response.ok) {
        throw new Error('Erreur lors du chargement des images');
      }
      return response.json();
    })
    .then(data => {
      if (data.length > 0) {
        displayImages(data);
      } else {
        alert('Aucune image trouvée.');
      }
    })
    .catch(error => console.error('Erreur:', error));
}

// Fonction pour afficher les images dans la galerie
function displayImages(images) {
  images.forEach(image => {
    const imgElement = document.createElement('img');
    imgElement.src = `./php/uploads/${image.picture}`; // Chemin des images
    imgElement.alt = "Image";
    imgElement.setAttribute('data-id', image.idPicture); // Ajouter l'identifiant de l'image
    imgElement.addEventListener('click', () => openModal(image.picture, image.idPicture));
    imageGallery.appendChild(imgElement);
  });
}

// Ouvrir le modal pour afficher l'image et la notation
function openModal(imageSrc, imageId) {
    modalImage.src = `./php/uploads/${imageSrc}`;
    modalImage.setAttribute('data-id', imageId); // Ajouter l'identifiant au modal
    modalImage.style.width = "50%"; // Ajuste la largeur à 80% du modal
    modalImage.style.height = "auto"; // Conserve les proportions
    modalImage.style.maxWidth = "500px"; // Limite la largeur maximale
    modalImage.style.maxHeight = "70%"; // Limite la hauteur maximale
    imageModal.style.display = "flex";
}

// Fermer le modal
closeModal.addEventListener('click', () => {
  imageModal.style.display = "none";
});

// Valider la note
validateButton.addEventListener('click', () => {
    let rating = 0;
    for (let input of ratingInputs) {
      if (input.checked) {
        rating = input.value;
        break;
      }
    }
  
    if (rating > 0) {
      // Récupérer l'identifiant de l'image (ajoutez un attribut "data-id" à chaque image)
      const imageId = modalImage.getAttribute('data-id');
      
      if (imageId) {
        // Envoyer la note au serveur pour mise à jour
        fetch('./php/updateRating.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            idPicture: imageId,
            note: rating
          })
        })
          .then(response => response.json())
          .then(data => {
            if (data.success) {
              alert(`Vous avez noté cette image : ${rating}/10`);
              imageModal.style.display = "none";
            } else {
              alert('Erreur lors de la mise à jour de la note : ' + data.message);
            }
          })
          .catch(error => {
            console.error('Erreur lors de la mise à jour de la note :', error);
          });
      } else {
        alert('Impossible de récupérer l’identifiant de l’image.');
      }
    } else {
      alert("Veuillez sélectionner une note avant de valider.");
    }
  });
  

// Charger les images à partir de la base de données
loadImages();

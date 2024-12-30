
// Envoi de l'image au serveur
analyzeButton.addEventListener('click', () => {
  const file = imageUpload.files[0];
  if (file) {
    const formData = new FormData();
    formData.append('image', file);

    fetch('./php/saveImage.php', {
      method: 'POST',
      body: formData,
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Erreur HTTP : ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        if (data.success) {
          alert(data.message);

          // Vider le contenu de la div après un envoi réussi
          imagePreview.style.display = "none";
          uploadText.style.display = "block";
          analyzeButton.disabled = true;
          imageUpload.value = ""; // Réinitialise l'input file
        } else {
          alert('Erreur : ' + data.message);
        }
      })
      .catch(error => {
        console.error('Erreur lors de l\'envoi de l\'image :', error);
      });
  } else {
    alert('Veuillez d\'abord sélectionner une image.');
  }
});

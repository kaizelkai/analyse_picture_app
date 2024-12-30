// Fonction pour envoyer l'image au serveur
function saveImageToDatabase(imageBlob) {
    // Créez un objet FormData pour envoyer les données via POST
    const formData = new FormData();
    formData.append("idUser", 1); // Remplacez par l'ID utilisateur actuel si nécessaire
    formData.append("picture", imageBlob);
    formData.append("note", 0); // Initialisez la note
  
    // Envoyer la requête à l'API
    fetch("http://localhost/upload.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          alert("Image sauvegardée avec succès !");
          return response.json();
        } else {
          throw new Error("Échec de l'envoi de l'image.");
        }
      })
      .then((data) => {
        console.log("Données enregistrées :", data);
      })
      .catch((error) => {
        console.error("Erreur :", error);
        alert("Une erreur est survenue lors de la sauvegarde de l'image.");
      });
  }
  
  // Ajout de l'événement de clic pour le bouton "Analyser"
  analyzeButton.addEventListener("click", () => {
    if (imagePreview.src) {
      fetch(imagePreview.src)
        .then((res) => res.blob()) // Convertit l'image en Blob
        .then((blob) => {
          saveImageToDatabase(blob); // Envoie l'image au serveur
        })
        .catch((error) => {
          console.error("Erreur lors de la conversion de l'image :", error);
        });
    } else {
      alert("Veuillez d'abord uploader une image.");
    }
  });
  
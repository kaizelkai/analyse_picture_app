const dropZone = document.getElementById('dropZone');
    const imageUpload = document.getElementById('imageUpload');
    const imagePreview = document.getElementById('imagePreview');
    const uploadText = document.getElementById('uploadText');
    const analyzeButton = document.getElementById('analyzeButton');

    // Fonction pour afficher l'image
    function displayImage(file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        imagePreview.src = e.target.result;
        imagePreview.style.display = "block";
        uploadText.style.display = "none";
        analyzeButton.disabled = false;
        analyzeButton.style.display = "inline-block";
      };
      reader.readAsDataURL(file);
    }

    // Gestion de l'événement de changement (sélection via bouton)
    imageUpload.addEventListener('change', (event) => {
      const file = event.target.files[0];
      if (file) {
        displayImage(file);
      }
      event.stopPropagation(); // Empêche l'exécution du clic parent
    });

    // Gestion des événements de drag-and-drop
    dropZone.addEventListener('dragover', (event) => {
      event.preventDefault();
      dropZone.classList.add('dragover');
    });

    dropZone.addEventListener('dragleave', () => {
      dropZone.classList.remove('dragover');
    });

    dropZone.addEventListener('drop', (event) => {
      event.preventDefault();
      dropZone.classList.remove('dragover');
      const file = event.dataTransfer.files[0];
      if (file) {
        displayImage(file);
      }
    });

    // Permettre à la div entière de cliquer pour ouvrir la boîte de sélection
    dropZone.addEventListener('click', (event) => {
      if (event.target.id === 'dropZone') {
        imageUpload.click();
      }
    });
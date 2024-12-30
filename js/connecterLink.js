const connecterLink = document.querySelector('.connecter');
    const authModal = document.getElementById('authModal');
    const closeModal = document.getElementById('closeModal');
    const toggleForm = document.getElementById('toggleForm');
    let authForm = document.getElementById('authForm');

    // Ouvrir la modale lors du clic sur "Connecter"
    connecterLink.addEventListener('click', (event) => {
        event.preventDefault(); // Empêcher le comportement par défaut du lien
        authModal.style.display = 'flex'; // Afficher la modale
    });

    // Fermer la modale
    closeModal.addEventListener('click', () => {
        authModal.style.display = 'none';
    });

    // Alterner entre "Connexion" et "Inscription"
    toggleForm.addEventListener('click', (event) => {
        event.preventDefault(); // Empêcher le comportement par défaut du lien
        
        // Vérification du contenu du lien pour déterminer s'il faut afficher la connexion ou l'inscription
        if (toggleForm.textContent.includes('Créer un compte')) {
            toggleForm.textContent = 'Déjà inscrit ? Se connecter';
            authForm.innerHTML = ` 
                <h2>Inscription</h2>
                
                <input type="email" id="email" name="email" placeholder="Entrez votre email" required style="width: 100%; padding: 8px; margin: 10px -10px;">
                
                
                <input type="password" id="password" name="password" placeholder="Entrez votre mot de passe" required style="width: 100%; padding: 8px; margin: 10px -10px;">
                
                
                <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirmez votre mot de passe" required style="width: 100%; padding: 8px; margin: 10px -10px;">

                <button type="submit" style="width: 100%; padding: 10px; background-color: #007BFF; color: white; border: none; border-radius: 5px; cursor: pointer;">S'inscrire</button>
                <p style="margin-top: 10px; font-size: 14px;">Déjà inscrit ? <a id="toggleFormInscription" href="#" style="color: #007BFF; cursor: pointer;">Se connecter</a></p>
            `;
            // Réattacher l'événement "Se connecter"
            document.getElementById('toggleFormInscription').addEventListener('click', toggleFormInscriptionClickHandler);
        } else {
            toggleForm.textContent = 'Créer un compte';
            authForm.innerHTML = `
                <h2>Connexion</h2>
               
                <input type="email" id="email" name="email" placeholder="Entrez votre email" required style="width: 100%; padding: 8px; margin: 10px -10px;">
                
                
                <input type="password" id="password" name="password" placeholder="Entrez votre mot de passe" required style="width: 100%; padding: 8px; margin: 10px -10px;">

                <button type="submit" style="width: 100%; padding: 10px; background-color: #007BFF; color: white; border: none; border-radius: 5px; cursor: pointer;">Se connecter</button>
                <p style="margin-top: 10px; font-size: 14px;">Pas encore inscrit ? <a id="toggleForm" href="#" style="color: #007BFF; cursor: pointer;">Créer un compte</a></p>
            `;
            // Réattacher l'événement "Créer un compte"
            document.getElementById('toggleForm').addEventListener('click', toggleFormClickHandler);
        }
    });

    // Fonction pour gérer le clic du toggle pour "Se connecter" => "Créer un compte"
    function toggleFormClickHandler(event) {
        event.preventDefault();
        toggleForm.click(); // Déclenche le clic pour alterner
    }

    // Fonction pour gérer le clic du toggle pour "Créer un compte" => "Se connecter"
    function toggleFormInscriptionClickHandler(event) {
        event.preventDefault();
        toggleForm.click(); // Déclenche le clic pour alterner
    }

    // Fermer la modale en cliquant à l'extérieur
    authModal.addEventListener('click', (event) => {
        if (event.target === authModal) {
            authModal.style.display = 'none';
        }
    });
document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.getElementById('connecter');

    loginButton.addEventListener('click', (event) => {
        event.preventDefault();

        // Récupérer les données du formulaire
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if (email && password) {
            // Envoi des données via une requête AJAX
            fetch('./php/login.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.success) {
                        alert(data.message); // Affiche un message de succès
                        // Redirige vers une autre page si nécessaire
                        window.location.href = 'index.php?idUser=${data.idUser}'; // Changez l'URL pour votre tableau de bord
                    } else {
                        alert(data.message); // Affiche un message d'erreur
                    }
                })
                .catch((error) => {
                    console.error('Erreur:', error);
                    alert('Une erreur est survenue.');
                });
        } else {
            alert('Veuillez remplir tous les champs.');
        }
    });
});

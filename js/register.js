document.addEventListener('click', function (event) {
    if (event.target && event.target.id === 'register') {
        event.preventDefault();

        // Récupération des données du formulaire
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        const confirmPassword = document.getElementById('confirmPassword').value.trim();

        // Validation simple
        if (!email || !password || !confirmPassword) {
            alert('Veuillez remplir tous les champs.');
            return;
        }

        // Envoi des données au serveur
        fetch('./php/register.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password, confirmPassword }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    alert(data.message);
                    document.getElementById('authForm').reset(); // Réinitialiser le formulaire
                    document.getElementById('authModal').style.display = 'none'; // Fermer la modale
                } else {
                    alert(data.message);
                }
            })
            .catch((error) => {
                console.error('Erreur:', error);
                alert('Une erreur est survenue. Veuillez réessayer plus tard.');
            });
    }

    if (event.target && event.target.id === 'connecter') {
        event.preventDefault();

        // Récupérer les données du formulaire
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();

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
                        // Redirige vers une autre page avec l'ID utilisateur
                        window.location.href = `index.html?idUser=${encodeURIComponent(data.idUser)}`;
                    } else {
                        alert(data.message); // Affiche un message d'erreur
                    }
                })
                .catch((error) => {
                    console.error('Erreur:', error);
                    alert('Une erreur est survenue. Veuillez réessayer.');
                });
        } else {
            alert('Veuillez remplir tous les champs.');
        }
    }
});

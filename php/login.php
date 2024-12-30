<?php
session_start(); // Démarrer la session

// Connexion à la base de données
$host = 'localhost'; 
$dbname = 'analyse_picture_app'; 
$username = 'root'; 
$password = ''; 

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Erreur de connexion à la base de données.']);
    exit;
}

// Vérification que la requête est une POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    if (isset($data['email']) && isset($data['password'])) {
        $email = trim($data['email']);
        $password = trim($data['password']);

        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            echo json_encode(['success' => false, 'message' => 'Adresse email invalide.']);
            exit;
        }

        // Vérification des identifiants
        $stmt = $pdo->prepare('SELECT * FROM user WHERE email = :email');
        $stmt->execute(['email' => $email]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user && password_verify($password, $user['passeWord'])) {
            // Stocker l'id de l'utilisateur dans la session
            $_SESSION['idUser'] = $user['idUser'];
            
            // Retourner une réponse avec l'ID utilisateur
            echo json_encode([
                'success' => true,
                'message' => 'Connexion réussie.',
                'idUser' => $user['idUser']
            ]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Identifiants incorrects.']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Données incomplètes.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Méthode non autorisée.']);
}
?>

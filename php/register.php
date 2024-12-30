<?php
session_start(); // Démarrer la session
header('Content-Type: application/json');

// Configuration de la base de données
$host = 'localhost'; // Remplacez par l'hôte de votre base de données
$dbname = 'analyse_picture_app';
$username = 'root'; // Remplacez par votre utilisateur de base de données
$password = ''; // Remplacez par votre mot de passe

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Vérification des données reçues
    $data = json_decode(file_get_contents('php://input'), true);
    $email = $data['email'] ?? '';
    $password = $data['password'] ?? '';
    $confirmPassword = $data['confirmPassword'] ?? '';

    if (!$email || !$password || !$confirmPassword) {
        echo json_encode(['success' => false, 'message' => 'Tous les champs sont obligatoires.']);
        exit;
    }

    if ($password !== $confirmPassword) {
        echo json_encode(['success' => false, 'message' => 'Les mots de passe ne correspondent pas.']);
        exit;
    }

    // Vérification si l'utilisateur existe déjà
    $stmt = $pdo->prepare("SELECT * FROM user WHERE email = :email");
    $stmt->execute(['email' => $email]);

    if ($stmt->rowCount() > 0) {
        echo json_encode(['success' => false, 'message' => 'Cet email est déjà enregistré.']);
        exit;
    }

    // Hachage du mot de passe
    $hashedPassword = password_hash($password, PASSWORD_BCRYPT);

    // Insertion dans la base de données
    $stmt = $pdo->prepare("INSERT INTO user (email, passeWord) VALUES (:email, :password)");
    $stmt->execute(['email' => $email, 'password' => $hashedPassword]);

    echo json_encode(['success' => true, 'message' => 'Inscription réussie !']);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Erreur : ' . $e->getMessage()]);
}

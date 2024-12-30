<?php
header('Content-Type: application/json');

$host = 'localhost'; // Remplacez par votre hôte
$dbname = 'analyse_picture_app'; // Nom de la base de données
$username = 'root'; // Nom d'utilisateur de la base
$password = ''; // Mot de passe de la base

try {
    // Connexion à la base de données
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Récupérer les images de la table "pictures" où idUser = 1
    $stmt = $pdo->prepare("SELECT * FROM pictures WHERE note = 0");
    $stmt->execute(['idUser' => 1]);

    // Récupérer les résultats
    $pictures = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Retourner les images en JSON
    echo json_encode($pictures);

} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Erreur : ' . $e->getMessage()]);
}

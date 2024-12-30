<?php
header('Content-Type: application/json');

$host = 'localhost'; // Remplacez par votre hôte
$dbname = 'analyse_picture_app'; // Nom de la base de données
$username = 'root'; // Nom d'utilisateur
$password = ''; // Mot de passe

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Récupérer les images avec une note attribuée
    $stmt = $pdo->query("SELECT user.idUser, pictures.picture, pictures.note FROM user JOIN pictures ON user.idUser = pictures.idUser WHERE pictures.note IS NOT NULL ORDER BY pictures.note DESC");
    $images = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(['success' => true, 'images' => $images]);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Erreur : ' . $e->getMessage()]);
}

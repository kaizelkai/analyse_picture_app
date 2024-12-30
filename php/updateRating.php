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

    // Récupérer les données JSON envoyées par le client
    $input = json_decode(file_get_contents('php://input'), true);

    if (isset($input['idPicture']) && isset($input['note'])) {
        $idPicture = $input['idPicture'];
        $note = $input['note'];

        // Mise à jour de la note
        $stmt = $pdo->prepare("UPDATE pictures SET note = :note WHERE idPicture = :idPicture");
        $stmt->execute(['note' => $note, 'idPicture' => $idPicture]);

        echo json_encode(['success' => true, 'message' => 'Note mise à jour avec succès.']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Paramètres manquants.']);
    }
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Erreur : ' . $e->getMessage()]);
}

<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
session_start(); // Démarrer la session
header('Content-Type: application/json');

// Connexion à la base de données
$host = 'localhost';
$dbname = 'analyse_picture_app';
$user = 'root';
$password = '';
$idUser = null;

if (isset($_GET['idUser'])) {
    $idUser = intval($_GET['idUser']);
} else if (isset($_SESSION['idUser'])) {
    $idUser = $_SESSION['idUser'];
}

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $user, $password, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    ]);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Erreur de connexion à la base de données.']);
    exit;
}

// Vérifie si une image est envoyée
if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
    $imageTmpPath = $_FILES['image']['tmp_name'];
    $imageName = uniqid() . '-' . basename($_FILES['image']['name']);
    $uploadDir = 'uploads/';
    $imagePath = $uploadDir . $imageName;

    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }

    if (move_uploaded_file($imageTmpPath, $imagePath)) {
        // Sauvegarde dans la base de données
        $sql = "INSERT INTO pictures (idUser, picture, note) VALUES (:idUser, :picture, :note)";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            ':idUser' => $idUser,
            ':picture' => $imageName,
            ':note' => 0,
        ]);

        echo json_encode(['success' => true, 'message' => 'Image sauvegardée avec succès.']);
    } else {
        echo json_encode(['success' => false, 'message' => "Erreur lors de l'enregistrement de l'image."]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Aucune image reçue ou erreur lors du téléchargement.']);
}
?>

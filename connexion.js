const express = require("express");
const multer = require("multer");
const mysql = require("mysql");

const app = express();
const upload = multer({ dest: "uploads/" }); // Destination temporaire des fichiers

// Configuration de la base de données
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "analyse_picture_app",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connecté à la base de données");
});

// Endpoint pour enregistrer une image
app.post("/api/pictures", upload.single("picture"), (req, res) => {
  const { idUser, note } = req.body;
  const picturePath = req.file.path;

  const sql = "INSERT INTO pictures (idUser, picture, note) VALUES (?, ?, ?)";
  db.query(sql, [idUser, picturePath, note], (err, result) => {
    if (err) {
      console.error("Erreur lors de l'insertion :", err);
      res.status(500).send("Erreur serveur");
    } else {
      res.status(200).send({ message: "Image sauvegardée", id: result.insertId });
    }
  });
});

app.listen(3000, () => {
  console.log("Serveur démarré sur http://localhost:3000");
});

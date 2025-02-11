const express = require("express");
const router = express.Router();
const db = require("../db");

// GET - Recupera tutti i record di Riferimento_AMI
router.get("/", (req, res) => {
  const query = "SELECT * FROM Riferimento_AMI";
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// POST - Crea un nuovo record in Riferimento_AMI
router.post("/", (req, res) => {
  const { Grado, Nome, Cognome, Email, Numero_Telefono, Numero_Cellulare, GruppoID } = req.body;

  // Controlli di base
  if (!Nome || !Cognome || !GruppoID) {
    return res.status(400).json({ message: "Nome, Cognome e GruppoID sono obbligatori" });
  }
  if (!Numero_Telefono && !Numero_Cellulare) {
    return res.status(400).json({ message: "Fornire almeno Numero Telefono o Numero Cellulare" });
  }

  const query =
    "INSERT INTO Riferimento_AMI (Grado, Nome, Cognome, Email, Numero_Telefono, Numero_Cellulare, GruppoID) VALUES (?, ?, ?, ?, ?, ?, ?)";
  db.query(query, [Grado, Nome, Cognome, Email, Numero_Telefono, Numero_Cellulare, GruppoID], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Riferimento_AMI creato!", id: result.insertId });
  });
});

// PUT - Aggiorna un record di Riferimento_AMI
router.put("/:id", (req, res) => {
  const { Grado, Nome, Cognome, Email, Numero_Telefono, Numero_Cellulare, GruppoID } = req.body;
  if (!Nome || !Cognome || !GruppoID) {
    return res.status(400).json({ message: "Nome, Cognome e GruppoID sono obbligatori" });
  }
  if (!Numero_Telefono && !Numero_Cellulare) {
    return res.status(400).json({ message: "Fornire almeno Numero Telefono o Numero Cellulare" });
  }
  const query =
    "UPDATE Riferimento_AMI SET Grado = ?, Nome = ?, Cognome = ?, Email = ?, Numero_Telefono = ?, Numero_Cellulare = ?, GruppoID = ? WHERE ID = ?";
  db.query(query, [Grado, Nome, Cognome, Email, Numero_Telefono, Numero_Cellulare, GruppoID, req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Riferimento_AMI aggiornato!" });
  });
});

// DELETE - Elimina un record di Riferimento_AMI
router.delete("/:id", (req, res) => {
  const query = "DELETE FROM Riferimento_AMI WHERE ID = ?";
  db.query(query, [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Riferimento_AMI eliminato!" });
  });
});

module.exports = router;

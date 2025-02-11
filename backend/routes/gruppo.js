// /gestionedb/backend/routes/gruppo.js
const express = require("express");
const router = express.Router();
const db = require("../db");

// GET - Recupera tutti i gruppi
router.get("/", (req, res) => {
  db.query("SELECT * FROM Gruppo", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// POST - Crea un nuovo gruppo
router.post("/", (req, res) => {
  const { NomeGruppo, Descrizione, BaseID } = req.body;
  if (!NomeGruppo || !BaseID) {
    return res
      .status(400)
      .json({ message: "NomeGruppo e BaseID sono obbligatori" });
  }
  const query =
    "INSERT INTO Gruppo (NomeGruppo, Descrizione, BaseID) VALUES (?, ?, ?)";
  db.query(query, [NomeGruppo, Descrizione, BaseID], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Gruppo creato!", id: result.insertId });
  });
});

// PUT - Aggiorna un gruppo esistente
router.put("/:id", (req, res) => {
  const { NomeGruppo, Descrizione, BaseID } = req.body;
  const query =
    "UPDATE Gruppo SET NomeGruppo = ?, Descrizione = ?, BaseID = ? WHERE ID = ?";
  db.query(query, [NomeGruppo, Descrizione, BaseID, req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Gruppo aggiornato!" });
  });
});

// DELETE - Elimina un gruppo
router.delete("/:id", (req, res) => {
  const query = "DELETE FROM Gruppo WHERE ID = ?";
  db.query(query, [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Gruppo eliminato!" });
  });
});

module.exports = router;

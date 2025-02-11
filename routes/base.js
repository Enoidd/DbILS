const express = require("express");
const router = express.Router();
const db = require("../db"); // Importa la connessione MySQL

// GET - Recupera tutte le basi
router.get("/", (req, res) => {
  db.query("SELECT * FROM Base", (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
});

// POST - Inserisce una nuova base
router.post("/", (req, res) => {
  const { Base_Citta, Base_Via, Base_NumeroCivico, Base_CAP, Base_Nome, Base_Stormo } = req.body;

  // Verifica che tutti i campi obbligatori siano stati inviati
  if (!Base_Citta || !Base_Via || !Base_NumeroCivico || !Base_CAP || !Base_Nome || !Base_Stormo) {
    return res.status(400).json({ message: "Tutti i campi sono obbligatori." });
  }

  const query = `
    INSERT INTO Base (Base_Citta, Base_Via, Base_NumeroCivico, Base_CAP, Base_Nome, Base_Stormo)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  db.query(query, [Base_Citta, Base_Via, Base_NumeroCivico, Base_CAP, Base_Nome, Base_Stormo], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Record Base creato!", id: result.insertId });
  });
});

// PUT - Aggiorna una base esistente
router.put("/:id", (req, res) => {
  const { Base_Citta, Base_Via, Base_NumeroCivico, Base_CAP, Base_Nome, Base_Stormo } = req.body;
  const query = `
    UPDATE Base 
    SET Base_Citta = ?, Base_Via = ?, Base_NumeroCivico = ?, Base_CAP = ?, Base_Nome = ?, Base_Stormo = ?
    WHERE ID = ?
  `;
  db.query(query, [Base_Citta, Base_Via, Base_NumeroCivico, Base_CAP, Base_Nome, Base_Stormo, req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Record Base aggiornato!" });
  });
});

// DELETE - Elimina una base
router.delete("/:id", (req, res) => {
  const query = "DELETE FROM Base WHERE ID = ?";
  db.query(query, [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Record Base eliminato!" });
  });
});

module.exports = router;


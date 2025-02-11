const express = require("express");
const router = express.Router();
const db = require("../db");

// Ottenere tutte le movimentazioni con dettagli delle tabelle collegate
router.get("/", (req, res) => {
  const query = `
    SELECT Movimentazioni.*, 
           MaterialiMagazzino.Tipologia AS NomeMateriale,
           Base.Base_Nome AS NomeBase,
           Gruppo.NomeGruppo AS NomeGruppo
    FROM Movimentazioni
    LEFT JOIN MaterialiMagazzino ON Movimentazioni.MaterialeID = MaterialiMagazzino.ID
    LEFT JOIN Base ON Movimentazioni.BaseID = Base.ID
    LEFT JOIN Gruppo ON Movimentazioni.GruppoID = Gruppo.ID
  `;
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Errore nel recupero delle movimentazioni" });
    }
    res.json(results);
  });
});

// Ottenere tutti i materiali disponibili
router.get("/materiali", (req, res) => {
  db.query("SELECT ID, Tipologia FROM MaterialiMagazzino", (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Errore nel recupero dei materiali" });
    }
    res.json(results);
  });
});

// Ottenere tutte le basi disponibili
router.get("/basi", (req, res) => {
  db.query("SELECT ID, Base_Nome FROM Base", (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Errore nel recupero delle basi" });
    }
    res.json(results);
  });
});

// Ottenere tutti i gruppi disponibili
router.get("/gruppi", (req, res) => {
  db.query("SELECT ID, NomeGruppo FROM Gruppo", (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Errore nel recupero dei gruppi" });
    }
    res.json(results);
  });
});

// Aggiungere una nuova movimentazione
router.post("/", (req, res) => {
  const { MaterialeID, TipoMovimento, Quantità, DataMovimento, BaseID, GruppoID, NomePalazzina } = req.body;

  if (!MaterialeID || !TipoMovimento || !Quantità || !DataMovimento || !NomePalazzina) {
    return res.status(400).json({ error: "Compila tutti i campi obbligatori" });
  }

  const query = `
    INSERT INTO Movimentazioni (MaterialeID, TipoMovimento, Quantità, DataMovimento, BaseID, GruppoID, NomePalazzina)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(query, [MaterialeID, TipoMovimento, Quantità, DataMovimento, BaseID, GruppoID, NomePalazzina], (err) => {
    if (err) {
      return res.status(500).json({ error: "Errore nell'inserimento della movimentazione" });
    }
    res.json({ message: "Movimentazione aggiunta con successo!" });
  });
});

// Modificare una movimentazione esistente
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { MaterialeID, TipoMovimento, Quantità, DataMovimento, BaseID, GruppoID, NomePalazzina } = req.body;

  const query = `
    UPDATE Movimentazioni 
    SET MaterialeID=?, TipoMovimento=?, Quantità=?, DataMovimento=?, BaseID=?, GruppoID=?, NomePalazzina=?
    WHERE ID=?
  `;

  db.query(query, [MaterialeID, TipoMovimento, Quantità, DataMovimento, BaseID, GruppoID, NomePalazzina, id], (err) => {
    if (err) {
      return res.status(500).json({ error: "Errore nella modifica della movimentazione" });
    }
    res.json({ message: "Movimentazione aggiornata con successo!" });
  });
});

// Eliminare una movimentazione
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM Movimentazioni WHERE ID = ?", [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Errore nella cancellazione della movimentazione" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Movimentazione non trovata" });
    }
    res.json({ message: "Movimentazione eliminata con successo!" });
  });
});

module.exports = router;

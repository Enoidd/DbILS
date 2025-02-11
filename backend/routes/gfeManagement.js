const express = require("express");
const router = express.Router();
const db = require("../db");

// ✅ Recupera tutti gli elementi di GFE con informazioni dettagliate su Base e Gruppo
router.get("/", (req, res) => {
  const query = `
    SELECT 
      GFE.ID, GFE.SN, GFE.PN, GFE.NUC, GFE.Marca, GFE.Modello, GFE.DataArrivo, GFE.Quantità,
      GFE.GruppoID, Gruppo.NomeGruppo AS NomeGruppo, Gruppo.Descrizione AS DescrizioneGruppo,
      GFE.BaseID, Base.Base_Nome AS NomeBase, Base.Base_Citta AS CittaBase
    FROM GFE 
    LEFT JOIN Gruppo ON GFE.GruppoID = Gruppo.ID 
    LEFT JOIN Base ON GFE.BaseID = Base.ID
  `;

  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Errore nel recupero dei dati di GFE" });
    }
    res.json(results);
  });
});

// ✅ Recupera tutti i gruppi per il menu a tendina
router.get("/gruppi", (req, res) => {
  db.query("SELECT ID, NomeGruppo FROM Gruppo", (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Errore nel recupero dei gruppi" });
    }
    res.json(results);
  });
});

// ✅ Recupera tutte le basi per il menu a tendina
router.get("/basi", (req, res) => {
  db.query("SELECT ID, Base_Nome FROM Base", (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Errore nel recupero delle basi" });
    }
    res.json(results);
  });
});

// ✅ Aggiunge un nuovo elemento GFE
router.post("/", (req, res) => {
  const { SN, PN, NUC, Marca, Modello, DataArrivo, Quantità, GruppoID, BaseID } = req.body;
  if (!SN || !PN || !NUC || !Marca || !Modello || !DataArrivo || !Quantità || !GruppoID || !BaseID) {
    return res.status(400).json({ error: "Compila tutti i campi obbligatori" });
  }

  const query = "INSERT INTO GFE (SN, PN, NUC, Marca, Modello, DataArrivo, Quantità, GruppoID, BaseID) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
  db.query(query, [SN, PN, NUC, Marca, Modello, DataArrivo, Quantità, GruppoID, BaseID], (err) => {
    if (err) {
      return res.status(500).json({ error: "Errore nell'inserimento di GFE" });
    }
    res.json({ message: "Elemento GFE aggiunto con successo!" });
  });
});

// ✅ Modifica un elemento esistente
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { SN, PN, NUC, Marca, Modello, DataArrivo, Quantità, GruppoID, BaseID } = req.body;

  const query = "UPDATE GFE SET SN=?, PN=?, NUC=?, Marca=?, Modello=?, DataArrivo=?, Quantità=?, GruppoID=?, BaseID=? WHERE ID=?";
  db.query(query, [SN, PN, NUC, Marca, Modello, DataArrivo, Quantità, GruppoID, BaseID, id], (err) => {
    if (err) {
      return res.status(500).json({ error: "Errore nella modifica di GFE" });
    }
    res.json({ message: "Elemento GFE aggiornato con successo!" });
  });
});

// ✅ Elimina un elemento GFE
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM GFE WHERE ID = ?", [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Errore nella cancellazione dell'elemento" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Elemento non trovato" });
    }
    res.json({ message: "Elemento GFE eliminato con successo!" });
  });
});

module.exports = router;

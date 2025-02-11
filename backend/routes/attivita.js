const express = require("express");
const router = express.Router();
const db = require("../db"); // Assicurati che il file di connessione MySQL sia correttamente importato

// GET - Recupera tutte le attività
router.get("/", (req, res) => {
  db.query("SELECT * FROM Attività", (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});

// POST - Crea una nuova attività e il record associato in base al tipo
router.post("/", (req, res) => {
  const {
    Titolo,
    Descrizione,
    Responsabile,
    TipoAttività,
    DataInizio,
    Note,
    TipologiaRichiesta,
    BaseID,
    MagazzinoID,
    MaterialeID,
    Quantità,
    Criticita
  } = req.body;

  // Inserimento nella tabella Attività (puoi aggiungere anche Note se lo desideri)
  const insertAttivita = `
    INSERT INTO Attività (Titolo, Descrizione, Responsabile, TipoAttività, DataInizio, Note)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  db.query(
    insertAttivita,
    [Titolo, Descrizione, Responsabile, TipoAttività, DataInizio, Note],
    (err, result) => {
      if (err) return res.status(500).send(err);

      const attivitaId = result.insertId;
      let insertQuery = "";
      let insertValues = [];

      // In base al tipo di attività, inserisci anche il record nella tabella specifica
      switch (TipoAttività) {
        case "OnCallSupport":
          if (!BaseID || !MagazzinoID) {
            return res.status(400).json({ message: "BaseID e MagazzinoID sono obbligatori per OnCallSupport" });
          }
          insertQuery = `
            INSERT INTO OnCallSupport (AttivitàID, BaseID, MagazzinoID, TipologiaRichiesta, Criticita)
            VALUES (?, ?, ?, ?, ?)
          `;
          insertValues = [
            attivitaId,
            BaseID,
            MagazzinoID,
            TipologiaRichiesta, // Opzioni: ad es. "MS", "CM" o "EX"
            Criticita || "non critica"
          ];
          break;

        case "OnSiteSupport":
          if (!BaseID || !MagazzinoID || !MaterialeID || !Quantità) {
            return res.status(400).json({ message: "Per OnSiteSupport occorrono BaseID, MagazzinoID, MaterialeID e Quantità" });
          }
          insertQuery = `
            INSERT INTO OnSiteSupport (AttivitàID, BaseID, MagazzinoID, TipologiaRichiesta, Criticita, MaterialeID, Quantità)
            VALUES (?, ?, ?, ?, ?, ?, ?)
          `;
          insertValues = [
            attivitaId,
            BaseID,
            MagazzinoID,
            TipologiaRichiesta, // Opzioni: "MS", "CM", "TC" o "I"
            Criticita || "non critica",
            MaterialeID,
            Quantità
          ];
          break;

        case "FieldEngineering":
          if (!BaseID) {
            return res.status(400).json({ message: "Per FieldEngineering occorre BaseID" });
          }
          insertQuery = `
            INSERT INTO FieldEngineering (AttivitàID, BaseID, TipologiaRichiesta, Criticita)
            VALUES (?, ?, ?, ?)
          `;
          insertValues = [
            attivitaId,
            BaseID,
            TipologiaRichiesta, // Opzioni: "MS", "CM", "TC" o "I"
            Criticita || "non critica"
          ];
          break;

        default:
          return res.status(400).json({ message: "TipoAttività non valido" });
      }

      db.query(insertQuery, insertValues, (err) => {
        if (err) return res.status(500).send(err);
        res.json({ message: "Attività e record associato creati!", id: attivitaId });
      });
    }
  );
});

// PUT - Aggiorna una attività (aggiornamento della tabella Attività)
router.put("/:id", (req, res) => {
  const { Titolo, Descrizione, Responsabile, DataInizio, Note } = req.body;
  const updateQuery = `
    UPDATE Attività 
    SET Titolo = ?, Descrizione = ?, Responsabile = ?, DataInizio = ?, Note = ?
    WHERE ID = ?
  `;
  db.query(updateQuery, [Titolo, Descrizione, Responsabile, DataInizio, Note, req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.json({ message: "Attività aggiornata!" });
  });
});

// DELETE - Elimina un'attività
router.delete("/:id", (req, res) => {
  db.query("DELETE FROM Attività WHERE ID=?", [req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.json({ message: "Attività eliminata!" });
  });
});

module.exports = router;


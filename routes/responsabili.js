const express = require("express");
const router = express.Router();
const db = require("../db"); // Importa la connessione al database

// GET - Ottieni tutti i responsabili
router.get("/", (req, res) => {
    db.query("SELECT * FROM Responsabili", (err, result) => {
        if (err) return res.status(500).send(err);
        res.json(result);
    });
});

// POST - Aggiungi un nuovo responsabile
router.post("/", (req, res) => {
    const { Nome, Cognome } = req.body;
    if (!Nome || !Cognome) {
        return res.status(400).json({ error: "Nome e Cognome sono obbligatori." });
    }
    db.query(
        "INSERT INTO Responsabili (Nome, Cognome) VALUES (?, ?)",
        [Nome, Cognome],
        (err, result) => {
            if (err) return res.status(500).send(err);
            res.json({ message: "Responsabile creato con successo!", id: result.insertId });
        }
    );
});

// PUT - Aggiorna un responsabile
router.put("/:id", (req, res) => {
    const { Nome, Cognome } = req.body;
    if (!Nome || !Cognome) {
        return res.status(400).json({ error: "Nome e Cognome sono obbligatori per l'aggiornamento." });
    }
    db.query(
        "UPDATE Responsabili SET Nome=?, Cognome=? WHERE ID=?",
        [Nome, Cognome, req.params.id],
        (err) => {
            if (err) return res.status(500).send(err);
            res.json({ message: "Responsabile aggiornato con successo!" });
        }
    );
});

// DELETE - Elimina un responsabile
router.delete("/:id", (req, res) => {
    const id = req.params.id;
    if (!id || isNaN(id)) {
        return res.status(400).json({ error: "ID non valido per la cancellazione." });
    }
    db.query("DELETE FROM Responsabili WHERE ID=?", [id], (err) => {
        if (err) return res.status(500).send(err);
        res.json({ message: "Responsabile eliminato con successo!" });
    });
});

module.exports = router;


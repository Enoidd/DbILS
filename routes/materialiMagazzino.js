const express = require("express");
const router = express.Router();
const db = require("../db");

// ✅ Recupera tutti i materiali con filtro per Categoria, Tipologia e NomePalazzina
router.get("/", (req, res) => {
  const { Categoria, Tipologia, NomePalazzina } = req.query;
  let query = "SELECT * FROM MaterialiMagazzino WHERE 1=1";
  let params = [];

  if (Categoria) {
    query += " AND Categoria = ?";
    params.push(Categoria);
  }
  if (Tipologia) {
    query += " AND Tipologia LIKE ?";
    params.push(`%${Tipologia}%`);
  }
  if (NomePalazzina) {
    query += " AND NomePalazzina = ?";
    params.push(NomePalazzina);
  }

  query += " ORDER BY ID"; // Garantisce un ordine prevedibile

  db.query(query, params, (err, results) => {
    if (err) {
      console.error("Errore nel recupero dei materiali filtrati:", err);
      return res.status(500).json({ error: "Errore nel recupero dei materiali filtrati" });
    }
    res.json(results);
  });
});

// ✅ Recupera i valori ENUM della colonna Categoria
router.get("/categorie", (req, res) => {
  const query = `SHOW COLUMNS FROM MaterialiMagazzino LIKE 'Categoria'`;

  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Errore nel recupero delle categorie" });
    }
    
    const match = results[0].Type.match(/'([^']+)'/g);
    const enumValues = match ? match.map((val) => val.replace(/'/g, "")) : [];

    res.json(enumValues);
  });
});

// ✅ Inserisce un nuovo materiale
router.post("/", (req, res) => {
  const { NomePalazzina, Categoria, Tipologia, Marca, Modello, PN, SN, Quantità, DataArrivo } = req.body;

  if (!NomePalazzina || !Categoria || !Tipologia || !PN || !DataArrivo) {
    return res.status(400).json({ error: "Tutti i campi obbligatori devono essere compilati" });
  }

  const query = `
    INSERT INTO MaterialiMagazzino (NomePalazzina, Categoria, Tipologia, Marca, Modello, PN, SN, Quantità, DataArrivo)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(query, [NomePalazzina, Categoria, Tipologia, Marca, Modello, PN, SN, Quantità || 0, DataArrivo], (err) => {
    if (err) {
      return res.status(500).json({ error: "Errore nell'inserimento del materiale" });
    }
    res.json({ message: "Materiale aggiunto con successo!" });
  });
});

// ✅ Modifica un materiale
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { NomePalazzina, Categoria, Tipologia, Marca, Modello, PN, SN, Quantità, DataArrivo } = req.body;

  const query = `
    UPDATE MaterialiMagazzino
    SET NomePalazzina=?, Categoria=?, Tipologia=?, Marca=?, Modello=?, PN=?, SN=?, Quantità=?, DataArrivo=?
    WHERE ID=?
  `;

  db.query(query, [NomePalazzina, Categoria, Tipologia, Marca, Modello, PN, SN, Quantità, DataArrivo, id], (err) => {
    if (err) {
      return res.status(500).json({ error: "Errore nella modifica del materiale" });
    }
    res.json({ message: "Materiale modificato con successo!" });
  });
});

// ✅ Cancella un materiale
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM MaterialiMagazzino WHERE ID = ?", [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Errore nella cancellazione del materiale" });
    }
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Materiale non trovato" });
    }
    
    res.json({ message: "Materiale eliminato con successo!" });
  });
});

module.exports = router;


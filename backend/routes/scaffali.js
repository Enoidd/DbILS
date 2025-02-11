const express = require("express");
const router = express.Router();
const db = require("../db");

// ✅ GET - Ottieni tutti gli scaffali
router.get("/", (req, res) => {
  const query = "SELECT * FROM Scaffali";
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// ✅ GET - Ottieni gli scaffali di un magazzino specifico
router.get("/:magazzinoID", (req, res) => {
  const { magazzinoID } = req.params;
  const query = "SELECT * FROM Scaffali WHERE MagazzinoID = ?";

  db.query(query, [magazzinoID], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

module.exports = router;

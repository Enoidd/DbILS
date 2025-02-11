const express = require("express");
const cors = require("cors");
const path = require("path");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const SECRET_KEY = process.env.SECRET_KEY || "supersegreto"; // Usa una variabile d'ambiente

// 📌 Importiamo le route esistenti
const attivitaRoutes = require("./routes/attivita");
const responsabiliRoutes = require("./routes/responsabili");

// IMPORTA la route per la gestione della tabella Base
const baseRoutes = require("./routes/base");
// IMPORTA la route per la gestione della tabella Gruppo
const gruppoRoutes = require("./routes/gruppo");
// IMPORTA la route per la gestione della tabella Riferimento_AMI
const riferimentoAMIRoutes = require("./routes/riferimento_ami");
// IMPORTA
const materialiMagazzinoRoutes = require("./routes/materialiMagazzino");
// IMPORTA
const gfeRoutes = require("./routes/gfeManagement");
// IMPORTA
const movimentazioniRoutes = require("./routes/movimentazioni");


// 📌 Usiamo le route per ogni tabella
app.use("/api/attivita", attivitaRoutes);
app.use("/api/responsabili", responsabiliRoutes);
app.use("/api/base", baseRoutes);
app.use("/api/gruppo", gruppoRoutes);
app.use("/api/riferimento_ami", riferimentoAMIRoutes);
app.use("/api/materialiMagazzino", materialiMagazzinoRoutes);
app.use("/api/gfe", gfeRoutes);
app.use("/api/movimentazioni", movimentazioniRoutes);


// 📌 API per autenticazione utente (Registrazione & Login)

// Registrazione utente
app.post(
  "/api/register",
  [body("email").isEmail(), body("password").isLength({ min: 6 })],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);

    const db = require("./db"); // Importiamo la connessione MySQL
    db.query(
      "INSERT INTO utenti (email, password) VALUES (?, ?)",
      [email, hashedPassword],
      (err) => {
        if (err) return res.status(500).send(err);
        res.json({ message: "Utente registrato!" });
      }
    );
  }
);

// Login utente
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  const db = require("./db"); // Importiamo la connessione MySQL

  db.query("SELECT * FROM utenti WHERE email = ?", [email], (err, results) => {
    if (err || results.length === 0)
      return res.status(401).json({ message: "Utente non trovato!" });

    const user = results[0];
    if (!bcrypt.compareSync(password, user.password))
      return res.status(401).json({ message: "Password errata!" });

    const token = jwt.sign({ id: user.ID, email: user.email }, SECRET_KEY, {
      expiresIn: "1h",
    });
    res.json({ token });
  });
});

// 📌 API per notifiche via email
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user: "tuo@email.com", pass: "password" },
});

app.post("/api/notifica", (req, res) => {
  const mailOptions = {
    from: "tuo@email.com",
    to: req.body.email,
    subject: "Attività in scadenza",
    text: `L'attività "${req.body.titolo}" sta per scadere!`,
  };

  transporter.sendMail(mailOptions, (err) => {
    if (err) return res.status(500).send(err);
    res.json({ message: "Notifica inviata!" });
  });
});

// 📌 Servire React in produzione
app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
});

// 📌 Avvio del server
app.listen(5000, () => {
  console.log("🚀 Server avviato su http://localhost:5000");
});


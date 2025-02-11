const mysql = require("mysql");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Giordana94!", // Sostituisci con la tua password
    database: "Database_ils",
});

db.connect(err => {
    if (err) throw err;
    console.log("✅ Database connesso!");
});

module.exports = db;

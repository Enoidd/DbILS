import React from "react";
import { Link } from "react-router-dom";
import "./CSS/DatabaseManagement.css";

const DatabaseManagement = () => {
  const options = [
    { id: 1, title: "Attività", description: "Gestisci le attività in corso", link: "/attivita" },
    { id: 2, title: "Responsabili", description: "Amministra i responsabili", link: "/responsabili" },
    { id: 3, title: "Base", description: "Controlla la base operativa", link: "/base" },
    { id: 4, title: "Gruppo", description: "Organizza il gruppo di lavoro", link: "/gruppo" },
    { id: 5, title: "Referenti Aeronautica", description: "Riferimenti Aeronautica Militare Italiana", link: "/riferimento_ami" },
    { id: 6, title: "Materiale GFE", description: "Materiale GFE in magazzino o spedito", link: "/GFE" },
    { id: 7, title: "Movimentazioni materiale", description: "Movimentazioni materiale", link: "/Movimentazioni" },
  ];

  return (
    
    <div
      className="home-container"
      style={{
        backgroundImage: "url('./background_gestione_db.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Pulsante Home */}
      <div>
        <Link to="/" className="home-button">Home</Link>
      </div>

      <h2 className="title">Gestione delle tabelle del Database</h2>


      {/* Sezione con le opzioni */}
      <div className="grid-container">
        {options.map((opt) => (
  <Link to={opt.link} key={opt.id} className="card">
    <div className="card-content">
      <span className="card-title">{opt.title}</span>
        </div>
        </Link>
    ))}

      </div>

      {/* Pulsante Magazzino */}
      <div style={{ marginTop: "40px" }}>
        <h2 className="title">Gestione del Magazzino</h2>
        <Link to="/materiali-magazzino">
          <button className="magazzino-button">Magazzino</button>
        </Link>
      </div>
    
    </div>
  );
};

export default DatabaseManagement;


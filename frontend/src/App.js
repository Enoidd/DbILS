import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Attivita from "./pages/Attivita";
import Responsabili from "./pages/Responsabili";
import BaseManagement from "./pages/BaseManagement";
import GruppoManagement from "./pages/GruppoManagement";
import DatabaseManagement from "./pages/DatabaseManagement";
import ILSIAFMSS from "./pages/ILSIAFMSS";
import RiferimentoAMIManagement from "./pages/RiferimentoAMIManagement";
import MaterialiMagazzino from "./pages/MaterialiMagazzino";
import GFEManagement from "./pages/GFEManagement";
import MovimentazioniManagement from "./pages/MovimentazioniManagement";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/database" element={<DatabaseManagement />} />
        <Route path="/attivita" element={<Attivita />} />
        <Route path="/responsabili" element={<Responsabili />} />
        <Route path="/base" element={<BaseManagement />} />
        <Route path="/gruppo" element={<GruppoManagement />} />
        <Route path="/ilsiaf-mss" element={<ILSIAFMSS />} />
        <Route path="/riferimento_ami" element={<RiferimentoAMIManagement />} />
        <Route path="/materiali-magazzino" element={<MaterialiMagazzino />} />
        <Route path="/gfe" element={<GFEManagement />} /> 
        <Route path="/movimentazioni" element={<MovimentazioniManagement />} />
      </Routes>
    </Router>
  );
}

export default App;


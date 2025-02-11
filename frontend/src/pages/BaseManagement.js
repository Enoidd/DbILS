import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./BaseManagement.css"; // Importa il CSS per lo stile del bordo lampeggiante

const BaseManagement = () => {
  // Stato per i record della tabella Base
  const [bases, setBases] = useState([]);
  // Stato per il form
  const [formData, setFormData] = useState({
    Base_Citta: "",
    Base_Via: "",
    Base_NumeroCivico: "",
    Base_CAP: "",
    Base_Nome: "",
    Base_Stormo: ""
  });
  // Stato per gestire la modalità "editing"
  const [editingId, setEditingId] = useState(null);
  // Stato per il warning del campo "Base_Stormo"
  const [stormoWarning, setStormoWarning] = useState("");

  // Carica i record quando il componente viene montato
  useEffect(() => {
    fetchBases();
  }, []);

  const fetchBases = () => {
    axios
      .get("http://localhost:5000/api/base")
      .then((res) => setBases(res.data))
      .catch((err) => console.error("Errore nel recupero delle basi:", err));
  };

  // Gestione del cambiamento dei campi del form
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Se il campo modificato è "Base_Stormo", esegue il controllo per solo caratteri alfanumerici
    if (name === "Base_Stormo") {
      // Se il valore non è vuoto e non è composto esclusivamente da lettere e numeri
      if (value && !/^[A-Za-z0-9]+$/.test(value)) {
        setStormoWarning("Questo campo accetta solo caratteri alfanumerici");
      } else {
        setStormoWarning("");
      }
    }

    setFormData({ ...formData, [name]: value });
  };

  // Gestisce l'invio del form (inserimento o aggiornamento)
  const handleSubmit = (e) => {
    e.preventDefault();

    if (stormoWarning) {
      alert("Correggi il campo 'Stormo' prima di procedere.");
      return;
    }

    if (editingId) {
      // Aggiornamento del record esistente
      axios
        .put(`http://localhost:5000/api/base/${editingId}`, formData)
        .then(() => {
          setEditingId(null);
          resetForm();
          fetchBases();
        })
        .catch((err) => console.error("Errore nell'aggiornamento:", err));
    } else {
      // Inserimento di un nuovo record
      axios
        .post("http://localhost:5000/api/base", formData)
        .then(() => {
          resetForm();
          fetchBases();
        })
        .catch((err) => console.error("Errore nell'inserimento:", err));
    }
  };

  // Imposta il form in modalità "edit"
  const handleEdit = (base) => {
    setFormData(base);
    setEditingId(base.ID);
  };

  // Elimina il record selezionato
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/api/base/${id}`)
      .then(() => fetchBases())
      .catch((err) => console.error("Errore nell'eliminazione:", err));
  };

  // Resetta il form
  const resetForm = () => {
    setFormData({
      Base_Citta: "",
      Base_Via: "",
      Base_NumeroCivico: "",
      Base_CAP: "",
      Base_Nome: "",
      Base_Stormo: ""
    });
    setStormoWarning("");
  };

  return (
    <div style={{ padding: "20px" }}>
      {/* Blocco di navigazione */}
      <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
         <Link to="/">
    <button className="nav-button">Home</button>
  </Link>
  <Link to="/database">
    <button className="nav-button">Torna alla gestione del Database</button>
  </Link>
</div>

      <h2>Base</h2>

      {/* Form per inserimento/aggiornamento */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="Base_Nome"
          placeholder="Nome Base"
          value={formData.Base_Nome}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="Base_Citta"
          placeholder="Città"
          value={formData.Base_Citta}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="Base_Via"
          placeholder="Via"
          value={formData.Base_Via}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="Base_NumeroCivico"
          placeholder="Numero Civico"
          value={formData.Base_NumeroCivico}
          onChange={handleInputChange}
        />
        {/* Raggruppa CAP e Stormo in una stessa riga */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <input
            type="text"
            name="Base_CAP"
            placeholder="CAP"
            value={formData.Base_CAP}
            onChange={handleInputChange}
            style={{ flex: 1 }}
          />
          <input
            type="text"
            name="Base_Stormo"
            placeholder="Stormo (solo caratteri numerici)"
            value={formData.Base_Stormo}
            onChange={handleInputChange}
            className={stormoWarning ? "blinking-border" : ""}
            style={{ flex: 1 }}
          />
          {stormoWarning && (
            <span style={{ color: "red", marginLeft: "10px" }}>
              {stormoWarning}
            </span>
          )}
        </div>
        <br />
        <button type="submit">
          {editingId ? "Aggiorna" : "Aggiungi"}
        </button>
        {editingId && (
          <button
            type="button"
            onClick={() => {
              setEditingId(null);
              resetForm();
            }}
          >
            ❌ Annulla
          </button>
        )}
      </form>

      {/* Tabella per visualizzare i record */}
      <table border="1" style={{ width: "100%", marginTop: "20px" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Città</th>
            <th>Via</th>
            <th>Numero Civico</th>
            <th>CAP</th>
            <th>Stormo</th>
            <th>Azioni</th>
          </tr>
        </thead>
        <tbody>
          {bases.length > 0 ? (
            bases.map((base) => (
              <tr
                key={base.ID}
                style={
                  editingId === base.ID
                    ? { backgroundColor: "#ffff99" }
                    : {}
                }
              >
                <td>{base.ID}</td>
                <td>{base.Base_Nome}</td>
                <td>{base.Base_Citta}</td>
                <td>{base.Base_Via}</td>
                <td>{base.Base_NumeroCivico}</td>
                <td>{base.Base_CAP}</td>
                <td>{base.Base_Stormo}</td>
                <td>
                <button onClick={() => handleEdit(base)}>✏️ Modifica</button>
                <button onClick={() => handleDelete(base.ID)}>❌ Elimina</button>
              </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">Nessun record trovato</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BaseManagement;


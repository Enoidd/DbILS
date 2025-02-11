// /gestionedb/frontend/src/pages/GruppoManagement.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const GruppoManagement = () => {
  // Stato per i gruppi
  const [groups, setGroups] = useState([]);
  // Stato per le basi (per popolare il menù a tendina)
  const [bases, setBases] = useState([]);
  // Stato per il form
  const [formData, setFormData] = useState({
    NomeGruppo: "",
    Descrizione: "",
    BaseID: ""
  });
  // Stato per la modalità di editing
  const [editingId, setEditingId] = useState(null);

  // Carica i gruppi e le basi quando il componente viene montato
  useEffect(() => {
    fetchGroups();
    fetchBases();
  }, []);

  const fetchGroups = () => {
    axios
      .get("http://localhost:5000/api/gruppo")
      .then((res) => setGroups(res.data))
      .catch((err) => console.error("Errore nel recupero dei gruppi:", err));
  };

  const fetchBases = () => {
    axios
      .get("http://localhost:5000/api/base")
      .then((res) => setBases(res.data))
      .catch((err) => console.error("Errore nel recupero delle basi:", err));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      axios
        .put(`http://localhost:5000/api/gruppo/${editingId}`, formData)
        .then(() => {
          setEditingId(null);
          resetForm();
          fetchGroups();
        })
        .catch((err) =>
          console.error("Errore nell'aggiornamento del gruppo:", err)
        );
    } else {
      axios
        .post("http://localhost:5000/api/gruppo", formData)
        .then(() => {
          resetForm();
          fetchGroups();
        })
        .catch((err) =>
          console.error("Errore nell'inserimento del gruppo:", err)
        );
    }
  };

  const handleEdit = (group) => {
    setFormData(group);
    setEditingId(group.ID);
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/api/gruppo/${id}`)
      .then(() => fetchGroups())
      .catch((err) =>
        console.error("Errore nell'eliminazione del gruppo:", err)
      );
  };

  const resetForm = () => {
    setFormData({
      NomeGruppo: "",
      Descrizione: "",
      BaseID: ""
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      {/* Pulsanti di navigazione */}
      <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
        <Link to="/">
    <button className="nav-button">Home</button>
  </Link>
  <Link to="/database">
    <button className="nav-button">Torna alla gestione del Database</button>
  </Link>
</div>

      <h2>Gestione Gruppo</h2>

      {/* Form per inserimento/aggiornamento */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="NomeGruppo"
          placeholder="Nome Gruppo"
          value={formData.NomeGruppo}
          onChange={handleInputChange}
        />
        <textarea
          name="Descrizione"
          placeholder="Descrizione (facoltativo)"
          value={formData.Descrizione}
          onChange={handleInputChange}
        />
        {/* Menù a tendina per selezionare la Base */}
        <select
          name="BaseID"
          value={formData.BaseID}
          onChange={handleInputChange}
        >
          <option value="">Seleziona Base</option>
          {bases.map((base) => (
            <option key={base.ID} value={base.ID}>
              {base.Base_Nome}
            </option>
          ))}
        </select>
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

      {/* Tabella per visualizzare i gruppi */}
      <table border="1" style={{ width: "100%", marginTop: "20px" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome Gruppo</th>
            <th>Descrizione</th>
            <th>Base</th>
            <th>Azioni</th>
          </tr>
        </thead>
        <tbody>
          {groups.length > 0 ? (
            groups.map((group) => (
              <tr
                key={group.ID}
                style={
                  editingId === group.ID
                    ? { backgroundColor: "#ffff99" }
                    : {}
                }
              >
                <td>{group.ID}</td>
                <td>{group.NomeGruppo}</td>
                <td>{group.Descrizione}</td>
                <td>
                  {
                    bases.find((base) => base.ID === group.BaseID)
                      ?.Base_Nome || "N/A"
                  }
                </td>
                <td>
                  <button onClick={() => handleEdit(att.ID)}>✏️ Modifica</button>
                <button onClick={() => handleDelete(att.ID)}>❌ Elimina</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">Nessun record trovato</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default GruppoManagement;


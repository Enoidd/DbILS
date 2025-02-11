import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const GFEManagement = () => {
  const [gfe, setGFE] = useState([]);
  const [gruppi, setGruppi] = useState([]);
  const [basi, setBasi] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    SN: "",
    PN: "",
    NUC: "",
    Marca: "",
    Modello: "",
    DataArrivo: "",
    Quantità: "",
    GruppoID: "",
    BaseID: "",
  });

  useEffect(() => {
    fetchGFE();
    fetchGruppi();
    fetchBasi();
  }, []);

  // ✅ Recupera tutti gli elementi GFE con informazioni dettagliate
  const fetchGFE = () => {
    axios
      .get("http://localhost:5000/api/gfe")
      .then((res) => setGFE(res.data))
      .catch((err) => console.error("Errore nel recupero degli elementi GFE:", err));
  };

  // ✅ Recupera tutti i gruppi per il menu a tendina
  const fetchGruppi = () => {
    axios
      .get("http://localhost:5000/api/gfe/gruppi")
      .then((res) => setGruppi(res.data))
      .catch((err) => console.error("Errore nel recupero dei gruppi:", err));
  };

  // ✅ Recupera tutte le basi per il menu a tendina
  const fetchBasi = () => {
    axios
      .get("http://localhost:5000/api/gfe/basi")
      .then((res) => setBasi(res.data))
      .catch((err) => console.error("Errore nel recupero delle basi:", err));
  };

  // ✅ Gestisce l'input dei campi del form
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Gestisce l'invio del form (aggiunta/modifica)
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.SN || !formData.PN || !formData.NUC || !formData.Marca || !formData.Modello || !formData.DataArrivo || !formData.Quantità || !formData.GruppoID || !formData.BaseID) {
      alert("Compila tutti i campi obbligatori.");
      return;
    }

    if (editingId) {
      axios
        .put(`http://localhost:5000/api/gfe/${editingId}`, formData)
        .then(() => {
          fetchGFE();
          resetForm();
        })
        .catch((err) => {
          console.error("Errore nella modifica dell'elemento GFE:", err);
          alert("Errore nella modifica dell'elemento GFE");
        });
    } else {
      axios
        .post("http://localhost:5000/api/gfe", formData)
        .then(() => {
          fetchGFE();
          resetForm();
        })
        .catch((err) => {
          console.error("Errore nell'inserimento dell'elemento GFE:", err);
          alert("Errore nell'inserimento dell'elemento GFE");
        });
    }
  };

  // ✅ Modifica un elemento
  const handleEdit = (id) => {
    const selectedGFE = gfe.find((item) => item.ID === id);
    setFormData(selectedGFE);
    setEditingId(id);
  };

  // ✅ Annulla la modifica
  const handleCancelEdit = () => {
    resetForm();
  };

  // ✅ Elimina un elemento
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/api/gfe/${id}`)
      .then(() => {
        fetchGFE();
      })
      .catch((err) => {
        console.error("Errore nella cancellazione dell'elemento GFE:", err);
        alert("Errore nella cancellazione dell'elemento GFE");
      });
  };

  // ✅ Resetta il form
  const resetForm = () => {
    setFormData({
      SN: "",
      PN: "",
      NUC: "",
      Marca: "",
      Modello: "",
      DataArrivo: "",
      Quantità: "",
      GruppoID: "",
      BaseID: "",
    });
    setEditingId(null);
  };

  return (
    <div className="gfe-container" style={{ padding: "20px" }}>
      
      {/* Blocco di navigazione */}
      <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
        <Link to="/">
          <button className="nav-button">Home</button>
        </Link>
        <Link to="/database">
          <button className="nav-button">Torna alla gestione del Database</button>
        </Link>
      </div>

      <h2>Gestione GFE</h2>

      {/* Form per inserire/modificare un elemento */}
      <form onSubmit={handleSubmit}>
        <input type="text" name="SN" placeholder="SN" value={formData.SN} onChange={handleInputChange} required />
        <input type="text" name="PN" placeholder="PN" value={formData.PN} onChange={handleInputChange} required />
        <input type="text" name="NUC" placeholder="NUC" value={formData.NUC} onChange={handleInputChange} required />
        <input type="text" name="Marca" placeholder="Marca" value={formData.Marca} onChange={handleInputChange} required />
        <input type="text" name="Modello" placeholder="Modello" value={formData.Modello} onChange={handleInputChange} required />
        <input type="date" name="DataArrivo" value={formData.DataArrivo} onChange={handleInputChange} required />
        <input type="number" name="Quantità" placeholder="Quantità" value={formData.Quantità} onChange={handleInputChange} required />

        <select name="GruppoID" value={formData.GruppoID} onChange={handleInputChange} required>
          <option value="">Seleziona un Gruppo</option>
          {gruppi.map((g) => (
            <option key={g.ID} value={g.ID}>{g.NomeGruppo}</option>
          ))}
        </select>

        <select name="BaseID" value={formData.BaseID} onChange={handleInputChange} required>
          <option value="">Seleziona una Base</option>
          {basi.map((b) => (
            <option key={b.ID} value={b.ID}>{b.Base_Nome}</option>
          ))}
        </select>

        <button type="submit">{editingId ? "Aggiorna" : "Aggiungi"}</button>
        {editingId && <button type="button" onClick={handleCancelEdit}>❌ Annulla</button>}
      </form>

      {/* Tabella per visualizzare gli elementi di GFE */}
      <table border="1" style={{ width: "100%", tableLayout: "fixed", marginTop: "20px" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>SN</th>
            <th>PN</th>
            <th>NUC</th>
            <th>Marca</th>
            <th>Modello</th>
            <th>Data Arrivo</th>
            <th>Quantità</th>
            <th>Gruppo</th>
            <th>Base</th>
            <th>Azioni</th>
          </tr>
        </thead>
        <tbody>
          {gfe.length > 0 ? (
            gfe.map((item) => (
              <tr key={item.ID} style={editingId === item.ID ? { backgroundColor: "#ffff99" } : {}}>
                <td>{item.ID}</td>
                <td>{item.SN}</td>
                <td>{item.PN}</td>
                <td>{item.NUC}</td>
                <td>{item.Marca}</td>
                <td>{item.Modello}</td>
                <td>{item.DataArrivo}</td>
                <td>{item.Quantità}</td>
                <td>{item.NomeGruppo}</td>
                <td>{item.NomeBase}</td>
                <td>
                  <button onClick={() => handleEdit(item.ID)}>✏️ Modifica</button>
                  <button onClick={() => handleDelete(item.ID)}>❌ Elimina</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="11" style={{ textAlign: "center" }}>Nessun elemento GFE trovato</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default GFEManagement;

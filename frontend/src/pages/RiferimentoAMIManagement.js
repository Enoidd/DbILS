import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const RiferimentoAMIManagement = () => {
  // Stato per i record della tabella Riferimento_AMI
  const [records, setRecords] = useState([]);
  // Stato per i gruppi (per popolare il menù a tendina)
  const [groups, setGroups] = useState([]);
  // Stato del form
  const [formData, setFormData] = useState({
    Grado: "",
    Nome: "",
    Cognome: "",
    Email: "",
    Numero_Telefono: "",
    Numero_Cellulare: "",
    GruppoID: ""
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchRecords();
    fetchGroups();
  }, []);

  const fetchRecords = () => {
    axios
      .get("http://localhost:5000/api/riferimento_ami")
      .then((res) => setRecords(res.data))
      .catch((err) =>
        console.error("Errore nel recupero dei Riferimento_AMI:", err)
      );
  };

  const fetchGroups = () => {
    axios
      .get("http://localhost:5000/api/gruppo")
      .then((res) => setGroups(res.data))
      .catch((err) => console.error("Errore nel recupero dei gruppi:", err));
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Verifica che almeno uno dei numeri sia fornito
    if (!formData.Numero_Telefono && !formData.Numero_Cellulare) {
      alert("Fornire almeno Numero Telefono o Numero Cellulare");
      return;
    }
    if (editingId) {
      axios
        .put(`http://localhost:5000/api/riferimento_ami/${editingId}`, formData)
        .then(() => {
          setEditingId(null);
          resetForm();
          fetchRecords();
        })
        .catch((err) =>
          console.error("Errore nell'aggiornamento:", err)
        );
    } else {
      axios
        .post("http://localhost:5000/api/riferimento_ami", formData)
        .then(() => {
          resetForm();
          fetchRecords();
        })
        .catch((err) =>
          console.error("Errore nell'inserimento:", err)
        );
    }
  };

  const handleEdit = (record) => {
    setFormData(record);
    setEditingId(record.ID);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    resetForm();
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/api/riferimento_ami/${id}`)
      .then(() => fetchRecords())
      .catch((err) =>
        console.error("Errore nell'eliminazione:", err)
      );
  };

  const resetForm = () => {
    setFormData({
      Grado: "",
      Nome: "",
      Cognome: "",
      Email: "",
      Numero_Telefono: "",
      Numero_Cellulare: "",
      GruppoID: ""
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
      

      <h2>Riferimenti Aeronautica Militare Italiana</h2>

      {/* Form per inserimento/aggiornamento */}
      <form onSubmit={handleSubmit}>
        <select name="Grado" value={formData.Grado} onChange={handleInputChange}>
          <option value="">Seleziona Grado</option>
          <option value="S. Ten.">S. Ten.</option>
          <option value="Ten.">Ten.</option>
          <option value="Cap.">Cap.</option>
          <option value="Magg.">Magg.</option>
          <option value="Ten. Col.">Ten. Col.</option>
          <option value="Col.">Col.</option>
          <option value="Gen. B.A.">Gen. B.A.</option>
          <option value="Gen. D.A.">Gen. D.A.</option>
          <option value="Gen. S.A.">Gen. S.A.</option>
          <option value="Gen.">Gen.</option>
          <option value="Serg.">Serg.</option>
          <option value="Serg. Magg.">Serg. Magg.</option>
          <option value="Serg. Magg. Capo">Serg. Magg. Capo</option>
          <option value="Maresc.">Maresc.</option>
          <option value="Maresc. Ord.">Maresc. Ord.</option>
          <option value="Maresc. Capo">Maresc. Capo</option>
          <option value="1° Maresc.">1° Maresc.</option>
          <option value="1° Maresc. Luogoten.">1° Maresc. Luogoten.</option>
          <option value="Av.">Av.</option>
          <option value="Av. Sc.">Av. Sc.</option>
          <option value="Av. Capo">Av. Capo</option>
          <option value="1° Av.">1° Av.</option>
          <option value="1° Av. Capo">1° Av. Capo</option>
          <option value="Av. Capo Sc.">Av. Capo Sc.</option>
          <option value="1° Av. Capo Sc.">1° Av. Capo Sc.</option>
        </select>
        <input
          type="text"
          name="Nome"
          placeholder="Nome"
          value={formData.Nome}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="Cognome"
          placeholder="Cognome"
          value={formData.Cognome}
          onChange={handleInputChange}
        />
        <input
          type="email"
          name="Email"
          placeholder="Email"
          value={formData.Email}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="Numero_Telefono"
          placeholder="Numero Telefono"
          value={formData.Numero_Telefono}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="Numero_Cellulare"
          placeholder="Numero Cellulare"
          value={formData.Numero_Cellulare}
          onChange={handleInputChange}
        />
        {/* Dropdown per Gruppo */}
        <select name="GruppoID" value={formData.GruppoID} onChange={handleInputChange}>
          <option value="">Seleziona Gruppo</option>
          {groups.map((group) => (
            <option key={group.ID} value={group.ID}>
              {group.NomeGruppo}
            </option>
          ))}
        </select>
        <button type="submit">{editingId ? "Aggiorna" : "Aggiungi"}</button>
        {editingId && (
          <button type="button" onClick={handleCancelEdit}>
            ❌ Annulla
          </button>
        )}
      </form>

      {/* Tabella per visualizzare i record */}
      <table border="1" style={{ width: "100%", marginTop: "20px", tableLayout: "fixed" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Grado</th>
            <th>Nome</th>
            <th>Cognome</th>
            <th>Email</th>
            <th>Telefono</th>
            <th>Cellulare</th>
            <th>Gruppo</th>
            <th>Azioni</th>
          </tr>
        </thead>
        <tbody>
          {records.length > 0 ? (
            records.map((record) => {
              const gruppo = groups.find((g) => g.ID === record.GruppoID);
              return (
                <tr
                  key={record.ID}
                  style={editingId === record.ID ? { backgroundColor: "#ffff99" } : {}}
                >
                  <td>{record.ID}</td>
                  <td>{record.Grado}</td>
                  <td>{record.Nome}</td>
                  <td>{record.Cognome}</td>
                  <td>{record.Email}</td>
                  <td>{record.Numero_Telefono}</td>
                  <td>{record.Numero_Cellulare}</td>
                  <td>{gruppo ? gruppo.NomeGruppo : "N/A"}</td>
                  <td>
                    <button onClick={() => handleEdit(record)}>✏️ Modifica</button>
                    <button onClick={() => handleDelete(record.ID)}>❌ Elimina</button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="9">Nessun record trovato</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RiferimentoAMIManagement;


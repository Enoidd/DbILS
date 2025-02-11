import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Attivita = () => {
  const [attivita, setAttivita] = useState([]);
  const [responsabili, setResponsabili] = useState([]);
  
  // Stato del form: includiamo tutti i campi necessari
  const [formData, setFormData] = useState({
    Titolo: "",
    Descrizione: "",
    Responsabile: "",
    TipoAttività: "",
    TipologiaRichiesta: "",
    DataInizio: "",
    Note: "",
    BaseID: "",
    MagazzinoID: "",
    MaterialeID: "",
    Quantità: "",
    Criticita: ""
  });

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchAttivita();
    fetchResponsabili();
  }, []);

  const fetchAttivita = () => {
    axios.get("http://localhost:5000/api/attivita")
      .then(response => setAttivita(response.data))
      .catch(error => console.error("Errore nel recupero delle attività:", error));
  };

  const fetchResponsabili = () => {
    axios.get("http://localhost:5000/api/responsabili")
      .then(response => setResponsabili(response.data))
      .catch(error => console.error("Errore nel recupero dei responsabili:", error));
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingId) {
      axios.put(`http://localhost:5000/api/attivita/${editingId}`, formData)
        .then(() => {
          setEditingId(null);
          resetForm();
          fetchAttivita();
        })
        .catch(error => console.error("Errore nell'aggiornamento:", error));
    } else {
      axios.post("http://localhost:5000/api/attivita", formData)
        .then(() => {
          resetForm();
          fetchAttivita();
        })
        .catch(error => console.error("Errore nella creazione:", error));
    }
  };

  const handleEdit = (id) => {
    const record = attivita.find(att => att.ID === id);
    setFormData(record);
    setEditingId(id);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    resetForm();
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/attivita/${id}`)
      .then(() => fetchAttivita())
      .catch(error => console.error("Errore nell'eliminazione:", error));
  };

  const resetForm = () => {
    setFormData({
      Titolo: "",
      Descrizione: "",
      Responsabile: "",
      TipoAttività: "",
      TipologiaRichiesta: "",
      DataInizio: "",
      Note: "",
      BaseID: "",
      MagazzinoID: "",
      MaterialeID: "",
      Quantità: "",
      Criticita: ""
    });
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

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="Titolo"
          placeholder="Titolo"
          value={formData.Titolo}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="Descrizione"
          placeholder="Descrizione"
          value={formData.Descrizione}
          onChange={handleInputChange}
        />

        {/* Select per Responsabili */}
        <select name="Responsabile" value={formData.Responsabile} onChange={handleInputChange}>
          <option value="">Seleziona un Responsabile</option>
          {responsabili.map(responsabile => (
            <option key={responsabile.ID} value={responsabile.ID}>
              {responsabile.Nome} {responsabile.Cognome}
            </option>
          ))}
        </select>

        {/* Select per Tipo Attività */}
        <select name="TipoAttività" value={formData.TipoAttività} onChange={handleInputChange}>
          <option value="">Seleziona Tipo Attività</option>
          <option value="FieldEngineering">Field Engineering</option>
          <option value="OnCallSupport">On-Call Support</option>
          <option value="OnSiteSupport">On-Site Support</option>
        </select>

        {/* In base al TipoAttività, mostra le opzioni di TipologiaRichiesta */}
        {formData.TipoAttività && (
          <select name="TipologiaRichiesta" value={formData.TipologiaRichiesta} onChange={handleInputChange}>
            <option value="">Seleziona Tipologia</option>
            {formData.TipoAttività === "OnCallSupport" ? (
              <>
                <option value="MS">Material Shipping (MS)</option>
                <option value="CM">Corrective Maintenance (CM)</option>
                <option value="EX">Extra Support (EX)</option>
              </>
            ) : (
              <>
                <option value="MS">Material Shipping (MS)</option>
                <option value="CM">Corrective Maintenance (CM)</option>
                <option value="TC">Technical Consultation (TC)</option>
                <option value="I">Installation (I)</option>
              </>
            )}
          </select>
        )}

        <input
          type="date"
          name="DataInizio"
          value={formData.DataInizio}
          onChange={handleInputChange}
        />

        {/* Campo Note */}
        <textarea
          name="Note"
          placeholder="Note (opzionale)"
          value={formData.Note}
          onChange={handleInputChange}
        />

        {/* Campi extra in base al TipoAttività */}
        {(formData.TipoAttività === "OnCallSupport" ||
          formData.TipoAttività === "OnSiteSupport" ||
          formData.TipoAttività === "FieldEngineering") && (
          <input
            type="number"
            name="BaseID"
            placeholder="ID Base"
            value={formData.BaseID}
            onChange={handleInputChange}
          />
        )}
        {(formData.TipoAttività === "OnCallSupport" ||
          formData.TipoAttività === "OnSiteSupport") && (
          <input
            type="number"
            name="MagazzinoID"
            placeholder="ID Magazzino"
            value={formData.MagazzinoID}
            onChange={handleInputChange}
          />
        )}
        {formData.TipoAttività === "OnSiteSupport" && (
          <>
            <input
              type="number"
              name="MaterialeID"
              placeholder="ID Materiale"
              value={formData.MaterialeID}
              onChange={handleInputChange}
            />
            <input
              type="number"
              name="Quantità"
              placeholder="Quantità"
              value={formData.Quantità}
              onChange={handleInputChange}
            />
          </>
        )}

        {/* Facoltativo: campo per la Criticità */}
        <input
          type="text"
          name="Criticita"
          placeholder="Criticità (es. 'critica' o 'non critica')"
          value={formData.Criticita}
          onChange={handleInputChange}
        />

        <button type="submit">{editingId ? "Aggiorna" : "Aggiungi"}</button>
        {editingId && <button type="button" onClick={handleCancelEdit}>❌ Annulla</button>}
      </form>

      <table border="1" style={{ width: "100%", tableLayout: "fixed" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Titolo</th>
            <th>Descrizione</th>
            <th>Responsabile</th>
            <th>Tipo Attività</th>
            <th>Tipologia</th>
            <th>Data Inizio</th>
            <th>Note</th>
            <th>Azioni</th>
          </tr>
        </thead>
        <tbody>
          {attivita.length > 0 ? (
            attivita.map(att => {
              const responsabile = responsabili.find(res => res.ID === att.Responsabile);
              return (
                <tr key={att.ID} style={editingId === att.ID ? { backgroundColor: "#ffff99" } : {}}>
                  <td>{att.ID}</td>
                  <td>{att.Titolo}</td>
                  <td>{att.Descrizione}</td>
                  <td>{responsabile ? `${responsabile.Nome} ${responsabile.Cognome}` : "N/A"}</td>
                  <td>{att.TipoAttività}</td>
                  <td>{att.TipologiaRichiesta}</td>
                  <td>{att.DataInizio}</td>
                  <td>{att.Note}</td>
                  <td>
                    <button onClick={() => handleEdit(att.ID)}>✏️ Modifica</button>
                    <button onClick={() => handleDelete(att.ID)}>❌ Elimina</button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="9">Nessuna attività trovata</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Attivita;


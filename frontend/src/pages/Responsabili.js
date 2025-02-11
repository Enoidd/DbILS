import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Responsabili = () => {
    const [responsabili, setResponsabili] = useState([]);
    const [formData, setFormData] = useState({ Nome: "", Cognome: "" });
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        fetchResponsabili();
    }, []);

    const fetchResponsabili = () => {
        axios.get("http://localhost:5000/api/responsabili")
            .then(response => setResponsabili(response.data))
            .catch(error => console.error("Errore nel recupero responsabili:", error));
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingId) {
            axios.put(`http://localhost:5000/api/responsabili/${editingId}`, formData)
                .then(() => {
                    setEditingId(null);
                    setFormData({ Nome: "", Cognome: "" });
                    fetchResponsabili();
                })
                .catch(error => console.error("Errore nell'aggiornamento:", error));
        } else {
            axios.post("http://localhost:5000/api/responsabili", formData)
                .then(() => {
                    setFormData({ Nome: "", Cognome: "" });
                    fetchResponsabili();
                })
                .catch(error => console.error("Errore nella creazione:", error));
        }
    };

    const handleEdit = (id) => {
        const record = responsabili.find(resp => resp.ID === id);
        if (record) {
            setFormData(record);
            setEditingId(id);
        } else {
            console.error("Errore: record non trovato per ID", id);
        }
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setFormData({ Nome: "", Cognome: "" });
    };

    const handleDelete = (id) => {
        if (!id) {
            console.error("Errore: ID non valido per la cancellazione");
            return;
        }
        axios.delete(`http://localhost:5000/api/responsabili/${id}`)
            .then(() => fetchResponsabili())
            .catch(error => console.error("Errore nell'eliminazione:", error));
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

            <h2>Gestione Responsabili</h2>

            {/* Form per inserire/modificare un responsabile */}
            <form onSubmit={handleSubmit}>
                <input type="text" name="Nome" placeholder="Nome" value={formData.Nome} onChange={handleInputChange} required />
                <input type="text" name="Cognome" placeholder="Cognome" value={formData.Cognome} onChange={handleInputChange} required />
                <button type="submit">{editingId ? "Aggiorna" : "Aggiungi"}</button>
                {editingId && <button type="button" onClick={handleCancelEdit}>❌ Annulla</button>}
            </form>

            {/* Tabella per visualizzare i responsabili */}
            <table border="1" style={{ width: "100%", tableLayout: "fixed", marginTop: "20px" }}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Cognome</th>
                        <th>Azioni</th>
                    </tr>
                </thead>
                <tbody>
                    {responsabili.length > 0 ? (
                        responsabili
                            .filter(resp => resp && resp.ID) // Filtra eventuali record non validi
                            .map(resp => (
                                <tr key={resp.ID} style={editingId === resp.ID ? { backgroundColor: "#ffff99" } : {}}>
                                    <td>{resp.ID}</td>
                                    <td>{resp.Nome}</td>
                                    <td>{resp.Cognome}</td>
                                    <td>
                                        <button onClick={() => handleEdit(resp.ID)}>✏️ Modifica</button>
                                        <button onClick={() => handleDelete(resp.ID)}>❌ Elimina</button>
                                    </td>
                                </tr>
                            ))
                    ) : (
                        <tr>
                            <td colSpan="4" style={{ textAlign: "center" }}>Nessun responsabile trovato</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Responsabili;


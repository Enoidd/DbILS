import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const MovimentazioniManagement = () => {
  const [movimentazioni, setMovimentazioni] = useState([]);
  const [materiali, setMateriali] = useState([]);
  const [basi, setBasi] = useState([]);
  const [gruppi, setGruppi] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    MaterialeID: "",
    TipoMovimento: "",
    Quantità: "",
    DataMovimento: "",
    BaseID: "",
    GruppoID: "",
    NomePalazzina: "",
  });

  useEffect(() => {
    fetchMovimentazioni();
    fetchMateriali();
    fetchBasi();
    fetchGruppi();
  }, []);

  const fetchMovimentazioni = () => {
    axios.get("http://localhost:5000/api/movimentazioni")
      .then((res) => setMovimentazioni(res.data))
      .catch((err) => console.error(err));
  };

  const fetchMateriali = () => {
    axios.get("http://localhost:5000/api/movimentazioni/materiali")
      .then((res) => setMateriali(res.data))
      .catch((err) => console.error(err));
  };

  const fetchBasi = () => {
    axios.get("http://localhost:5000/api/movimentazioni/basi")
      .then((res) => setBasi(res.data))
      .catch((err) => console.error(err));
  };

  const fetchGruppi = () => {
    axios.get("http://localhost:5000/api/movimentazioni/gruppi")
      .then((res) => setGruppi(res.data))
      .catch((err) => console.error(err));
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const request = editingId
      ? axios.put(`http://localhost:5000/api/movimentazioni/${editingId}`, formData)
      : axios.post("http://localhost:5000/api/movimentazioni", formData);

    request.then(() => {
      fetchMovimentazioni();
      resetForm();
    }).catch((err) => alert("Errore: " + err.message));
  };

  const handleEdit = (id) => {
    const item = movimentazioni.find((el) => el.ID === id);
    setFormData(item);
    setEditingId(id);
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/movimentazioni/${id}`)
      .then(fetchMovimentazioni)
      .catch((err) => alert("Errore: " + err.message));
  };

  const resetForm = () => {
    setFormData({
      MaterialeID: "",
      TipoMovimento: "",
      Quantità: "",
      DataMovimento: "",
      BaseID: "",
      GruppoID: "",
      NomePalazzina: "",
    });
    setEditingId(null);
  };

  return (
    <div>
      <h2>Gestione Movimentazioni</h2>
      <form onSubmit={handleSubmit}>
        <input type="date" name="DataMovimento" value={formData.DataMovimento} onChange={handleInputChange} required />
        <input type="number" name="Quantità" placeholder="Quantità" value={formData.Quantità} onChange={handleInputChange} required />
        <button type="submit">{editingId ? "Aggiorna" : "Aggiungi"}</button>
      </form>
    </div>
  );
};

export default MovimentazioniManagement;

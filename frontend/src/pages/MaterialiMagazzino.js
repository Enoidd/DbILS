import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Importa Link per la navigazione
import "./CSS/MaterialiMagazzinoManagement.css";

const MaterialiMagazzino = () => {
  const [materials, setMaterials] = useState([]);
  const [categories, setCategories] = useState([]);
  /*******/
  const [filters, setFilters] = useState({
    NomePalazzina: "",
    Categoria: "",
    Tipologia: "",
  });
  /******/
  
  
  const [formData, setFormData] = useState({
    ID: null,
    NomePalazzina: "",
    Categoria: "",
    Tipologia: "",
    Marca: "",
    Modello: "",
    PN: "",
    SN: "",
    Quantità: "",
    DataArrivo: "",
  });
  const [editing, setEditing] = useState(false);

  /******/
  /*
  useEffect(() => {
    fetchMaterials();
    fetchCategories();
  }, []);
  */
  
  /* MODIFICATO */
  useEffect(() => {
    fetchMaterials();
    fetchCategories();
  }, [filters]);
  
  /******/
  
/***********/

/*
  const fetchMaterials = () => {
    axios
      .get("http://localhost:5000/api/materialiMagazzino")
      .then((res) => setMaterials(res.data))
      .catch((err) => console.error("Errore nel recupero dei materiali:", err));
  };
  */
  
  /* MODIFICATO */
 const fetchMaterials = () => {
  axios
    .get("http://localhost:5000/api/materialiMagazzino", { params: filters })
    .then((res) => setMaterials(res.data))
    .catch((err) => console.error("Errore nel recupero dei materiali:", err));
  };

const fetchCategories = () => {
    axios
      .get("http://localhost:5000/api/materialiMagazzino/categorie")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Errore nel recupero delle categorie:", err));
  };

  const handleFilterChange = (e) => {
  setFilters({ ...filters, [e.target.name]: e.target.value });
  }; 
  
/***********/


  const handleDelete = (id) => {
    console.log(`🗑️ Tentativo di eliminazione del materiale con ID: ${id}`);

    axios
      .delete(`http://localhost:5000/api/materialiMagazzino/${id}`)
      .then((res) => {
        console.log("✅ Risposta dal server:", res.data);
        fetchMaterials();
      })
      .catch((err) => {
        console.error("❌ Errore nella richiesta DELETE:", err.response ? err.response.data : err.message);
      });
  };

/*
  const fetchCategories = () => {
    axios
      .get("http://localhost:5000/api/materialiMagazzino/categorie")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Errore nel recupero delle categorie:", err));
  };
  */

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.NomePalazzina || !formData.Categoria || !formData.Tipologia || !formData.PN || !formData.DataArrivo) {
      alert("Compila tutti i campi obbligatori.");
      return;
    }

    const requestData = {
      ...formData,
      Quantità: parseInt(formData.Quantità, 10) || 0,
    };

    if (editing) {
      axios.put(`http://localhost:5000/api/materialiMagazzino/${formData.ID}`, requestData)
        .then(() => {
          setEditing(false);
          fetchMaterials();
          resetForm();
        })
        .catch((err) => {
          console.error("Errore nella modifica del materiale:", err);
          alert("Errore nella modifica del materiale");
        });
    } else {
      axios.post("http://localhost:5000/api/materialiMagazzino", requestData)
        .then(() => {
          fetchMaterials();
          resetForm();
        })
        .catch((err) => {
          console.error("Errore nell'inserimento del materiale:", err);
          alert("Errore nell'inserimento del materiale");
        });
    }
  };

  const handleEdit = (material) => {
    setFormData(material);
    setEditing(true);
  };

  const resetForm = () => {
    setFormData({
      ID: null,
      NomePalazzina: "",
      Categoria: "",
      Tipologia: "",
      Marca: "",
      Modello: "",
      PN: "",
      SN: "",
      Quantità: "",
      DataArrivo: "",
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

      <h2>Gestione Materiali Magazzino</h2>

      <form onSubmit={handleSubmit}>

        <label>Edificio:</label>
        <select name="NomePalazzina" value={formData.NomePalazzina} onChange={handleInputChange} required>
          <option value="">Seleziona l'Edificio</option>
          <option value="M0">M0</option>
          <option value="W0">W0</option>
        </select>

        <label>Categoria:</label>
        <select name="Categoria" value={formData.Categoria} onChange={handleInputChange} required>
          <option value="">Seleziona la categoria</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <input type="text" name="Tipologia" placeholder="Tipologia" value={formData.Tipologia} onChange={handleInputChange} required />
        <input type="text" name="Marca" placeholder="Marca" value={formData.Marca} onChange={handleInputChange} />
        <input type="text" name="Modello" placeholder="Modello" value={formData.Modello} onChange={handleInputChange} />
        <input type="text" name="PN" placeholder="PN" value={formData.PN} onChange={handleInputChange} required />
        <input type="text" name="SN" placeholder="SN" value={formData.SN} onChange={handleInputChange} />
        <input type="number" name="Quantità" placeholder="Quantità" value={formData.Quantità} onChange={handleInputChange} />
        <input type="date" name="DataArrivo" value={formData.DataArrivo} onChange={handleInputChange} required />

        <button type="submit">{editing ? "Modifica Materiale" : "Aggiungi Materiale"}</button>
      </form>
      
      
    {/* Filtri */}
      <h3>Filtra Materiali</h3>
      <div className="filter-container">
        <select name="NomePalazzina" value={filters.NomePalazzina} onChange={handleFilterChange}>
          <option value="">Tutte le Palazzine</option>
          <option value="M0">M0</option>
          <option value="W0">W0</option>
        </select>

        <select name="Categoria" value={filters.Categoria} onChange={handleFilterChange}>
          <option value="">Tutte le Categorie</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <input type="text" name="Tipologia" placeholder="Filtra per Tipologia" value={filters.Tipologia} onChange={handleFilterChange} />
      </div>


      <h3>Materiali Presenti</h3>
      <table>
        <thead>
          <tr>
            <th>Palazzina</th>
            <th>Categoria</th>
            <th>Tipologia</th>
            <th>Marca</th>
            <th>Modello</th>
            <th>PN</th>
            <th>SN</th>
            <th>Quantità</th>
            <th>Data Arrivo</th>
            <th>Azioni</th>
          </tr>
        </thead>
        <tbody>
          {materials.map((mat) => (
            <tr key={mat.ID} className={formData.ID === mat.ID ? "selected-row" : ""}>
              <td>{mat.NomePalazzina}</td>
              <td>{mat.Categoria}</td>
              <td>{mat.Tipologia}</td>
              <td>{mat.Marca || "—"}</td>
              <td>{mat.Modello || "—"}</td>
              <td>{mat.PN}</td>
              <td>{mat.SN || "—"}</td>
              <td>{mat.Quantità}</td>
              <td>{mat.DataArrivo}</td>
              <td>
                <button onClick={() => handleEdit(mat)}>✏️ Modifica</button>
                <button onClick={() => handleDelete(mat.ID)}>❌ Elimina</button> 
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MaterialiMagazzino;


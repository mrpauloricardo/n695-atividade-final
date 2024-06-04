import React, { useEffect, useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

const API_URL = "http://localhost:8080/api/";

const BoardAdmin = () => {
  const [clients, setClients] = useState([]);
  const [editingClient, setEditingClient] = useState(null);
  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get(API_URL + "clients");
        setClients(response.data);
      } catch (error) {
        const errorMessage = 
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        console.error('API error:', errorMessage);

        if (error.response && error.response.status === 401) {
          console.error("Unauthorized access - logging out");
          // EventBus.dispatch("logout");
        }

        setClients([]);
      }
    };

    fetchClients();
  }, []);

  const deleteClient = async (id) => {
    try {
      await axios.delete(API_URL + "clients/" + id);
      setClients(clients.filter(client => client.id !== id));
    } catch (error) {
      console.error('Error deleting client:', error);
    }
  };

  const editClient = (client) => {
    setEditingClient(client);
    setNewUsername(client.username);
    setNewEmail(client.email);
  };

  const saveClient = async () => {
    try {
      const response = await axios.put(`${API_URL}clients/${editingClient.id}`, {
        username: newUsername,
        email: newEmail
      });
      setClients(clients.map(client => (client.id === editingClient.id ? response.data : client)));
      setEditingClient(null);
      setNewUsername("");
      setNewEmail("");
    } catch (error) {
      console.error('Error updating client:', error);
    }
  };

  return (
    <div className="container">
      <header className="my-4">
        <h2 className="text-center">Lista de Usuários</h2>
        <ul className="list-group">
          {clients.map(client => (
            <li key={client.id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <strong>{client.username}</strong>
                <p className="mb-0">{client.email}</p>
              </div>
              <div>
                <button className="btn btn-primary btn-sm mr-2" onClick={() => editClient(client)}>Editar</button>
                <button className="btn btn-danger btn-sm" onClick={() => deleteClient(client.id)}>Deletar</button>
              </div>
            </li>
          ))}
        </ul>
        {editingClient && (
          <div className="mt-4 edit-box">
            <h3>Editar Usuário</h3>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                placeholder="Nome do usuário"
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="Email"
              />
            </div>
            <div>
              <button className="btn btn-success" onClick={saveClient}>Salvar</button>
              <button className="btn-cancel btn btn-secondary ml-2" onClick={() => setEditingClient(null)}>Cancelar</button>
            </div>
          </div>
        )}
      </header>
    </div>
  );
};

export default BoardAdmin;

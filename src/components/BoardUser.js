import React, { useEffect, useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthService from "../services/AuthService";

const API_URL = "http://localhost:8080/api/";

const BoardUser = () => {
  const [user, setUser] = useState(AuthService.getCurrentUser());
  const [editing, setEditing] = useState(false);
  const [newUsername, setNewUsername] = useState(user?.username || "");
  const [newEmail, setNewEmail] = useState(user?.email || "");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${API_URL}clients/${user.username}`);
        setUser(response.data);
        setNewUsername(response.data.username);
        setNewEmail(response.data.email);
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
          AuthService.logout(); // Certifique-se de ter esse método no AuthService
        }

        setUser(null);
      }
    };

    fetchUser();
  }, [user.username]);

  const saveUser = async () => {
    try {
      const response = await axios.put(`${API_URL}clients/${user.id}`, {
        username: newUsername,
        email: newEmail
      });
      setUser(response.data);
      AuthService.updateCurrentUser(response.data); // Atualiza o currentUser no AuthService
      setEditing(false);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  if (!user) {
    return <div className="container">Carregando...</div>;
  }

  return (
    <div className="container">
      <header className="my-4">
        <h2 className="text-center">Perfil do Usuário</h2>
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">{user.username}</h4>
            <p className="card-text">{user.email}</p>
            <button className="btn btn-primary" onClick={() => setEditing(true)}>Editar</button>
          </div>
        </div>
        {editing && (
          <div className="mt-4 edit-box">
            <h3>Editar Perfil</h3>
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
              <button className="btn btn-success" onClick={saveUser}>Salvar</button>
              <button className="btn-cancel btn btn-secondary ml-2" onClick={() => setEditing(false)}>Cancelar</button>
            </div>
          </div>
        )}
      </header>
    </div>
  );
};

export default BoardUser;
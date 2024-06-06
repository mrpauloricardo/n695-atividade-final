import React, { useEffect, useState } from 'react';
import { Routes, Route, Link } from "react-router-dom";
import '../src/styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import BoardAdmin from "./components/BoardAdmin";
import BoardUser from "./components/BoardUser";
import Home from './components/Home';
import Login from './components/Login';
import Profile from "./components/Profile";
import Register from './components/Register';
import ThemeButton from './components/ThemeButton';
import { ThemeProvider } from './components/ThemeContext';

import EventBus from "./common/EventBus";
import AuthService from './services/AuthService';

function App() {
  const [darkMode] = useState(false);
  
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }

    EventBus.on("logout", () => {
      logout();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, []);

  const logout = () => {
    AuthService.logout();
    setShowModeratorBoard(false);
    setShowAdminBoard(false);
    setCurrentUser(undefined);
  };

  return (
    <ThemeProvider>
      <div className={`App ${darkMode ? 'theme-dark' : 'theme-light'}`}>
      <div className='container'>
        <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
          <div className="col-md-3 mb-2 mb-md-0">
            <a href={"/"} className="d-inline-flex link-body-emphasis text-decoration-none">Logo</a>
          </div>

          <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
            <li><a href={"/home"} className="nav-link px-2">Home</a></li>
            {showAdminBoard && (
              <li><a href={"/admin"} className="nav-link px-2">Área do Administrador</a></li>
            )}
            {showModeratorBoard && (
              <li><a href={"/mod"} className="nav-link px-2">Área do Moderador</a></li>
            )}
            {currentUser && (
              <li><a href={"/user"} className="nav-link px-2">Área do Usuário</a></li>
            )}
          </ul>

          {currentUser ? (
            <div className="col-md-3 text-end">
              <a href={"/profile"} className="profile-name">{currentUser.username}</a>
              <Link to={"login"}>
                <button onClick={logout} type="button" className="btn-logout btn btn-primary">Sair</button>
              </Link>
            </div>

          ) : (
            <div className="col-md-3 text-end">
              <Link to="/login">
                <button type="button" className="btn btn-outline-primary me-2">Entrar</button>
              </Link>
              <Link to="/register">
                <button type="button" className="btn btn-primary">Registrar</button>
              </Link>
            </div>  
        )}
        </header>

        <ThemeButton />

        <Routes>
          <Route exact path={"/"} element={<Home />} />
          <Route exact path={"/home"} element={<Home />} />
          <Route exact path={"/login"} element={<Login />} />
          <Route exact path={"/register"} element={<Register />} />
          <Route exact path={"/profile"} element={<Profile />} />
          <Route exact path={"/user"} element={<BoardUser />} />
          <Route exact path={"/admin"} element={<BoardAdmin />} />
        </Routes>
      </div>
    </div>
    </ThemeProvider>
    
  );
};

export default App;
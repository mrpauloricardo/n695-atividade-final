import React, { useEffect, useState } from 'react';
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
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

import AuthService from './services/AuthService';

function App() {
  const [darkMode] = useState(false);
  
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }

    
  }, []);

  const logout = () => {
    AuthService.logout();
    setShowModeratorBoard(false);
    setShowAdminBoard(false);
    setCurrentUser(undefined);
    navigate("/login");
  };

  return (
    <ThemeProvider>
      <div className={`App ${darkMode ? 'theme-dark' : 'theme-light'}`}>
        <Navbar expand="md" className="mb-4">
          <Container>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to={"/home"}>Home</Nav.Link>
                {showAdminBoard && (
                  <Nav.Link as={Link} to={"/admin"}>Área do Administrador</Nav.Link>
                )}
                {showModeratorBoard && (
                  <Nav.Link as={Link} to={"/mod"}>Área do Moderador</Nav.Link>
                )}
                {currentUser && (
                  <Nav.Link as={Link} to={"/user"}>Área do Usuário</Nav.Link>
                )}
              </Nav>
              <Nav>
                {currentUser ? (
                  <NavDropdown title={currentUser.username} id="basic-nav-dropdown" className="mb-2">
                    <NavDropdown.Item as={Link} to={"/profile"}>Perfil</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={logout}>Sair</NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  <>
                    <Nav.Link as={Link} to={"/login"}>Entrar</Nav.Link>
                    <Nav.Link as={Link} to={"/register"}>Registrar</Nav.Link>
                  </>
                )}
                <ThemeButton />
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Container>
          <Routes>
            <Route exact path={"/"} element={<Home />} />
            <Route exact path={"/home"} element={<Home />} />
            <Route exact path={"/login"} element={<Login />} />
            <Route exact path={"/register"} element={<Register />} />
            <Route exact path={"/profile"} element={<Profile />} />
            <Route exact path={"/user"} element={<BoardUser />} />
            <Route exact path={"/admin"} element={<BoardAdmin />} />
          </Routes>
        </Container>
      </div>
    </ThemeProvider>
  );
};

export default App;

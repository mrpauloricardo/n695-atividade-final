import React from "react";
import { ReactComponent as ImageDark } from "../assets/home-image-dark.svg";
import { ReactComponent as ImageLight } from "../assets/home-image-light.svg";
import { useTheme } from './ThemeContext';

const Home = () => {
  const { theme } = useTheme();

  return (
    <div className={`App ${theme} container col-xl-10 col-xxl-8 px-4 py-5`}>
      <div className="row align-items-center g-lg-5 py-5">
        <div className="col-lg-7 text-center text-lg-start">
          <h1 className="display-4 fw-bold lh-1 text-body-emphasis mb-3">Sistema de Gerenciamento de Usuários</h1>
          <p className="col-lg-10 fs-4">Organize e controle seus colaboradores.</p>
        </div>
        <div className="col-md-10 col-lg-5 d-flex justify-content-center align-items-center">
          {theme === 'light' ? <ImageLight /> : <ImageDark />}
        </div>
      </div>
    </div>
  );
};

export default Home;

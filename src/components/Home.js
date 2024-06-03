import React from "react";

const Home = () => {
  return (
    <div className="container col-xl-10 col-xxl-8 px-4 py-5">
      <div className="row align-items-center g-lg-5 py-5">
        <div className="col-lg-7 text-center text-lg-start">
          <h1 className="display-4 fw-bold lh-1 text-body-emphasis mb-3">Sistema de Gerenciamento de Usuários</h1>
          <p className="col-lg-10 fs-4">Organize e controle seus colaboradores.</p>
        </div>
        <div className="col-md-10 mx-auto col-lg-5">
          <form className="p-4 p-md-5 border rounded-3 bg-body-tertiary">
            <div className="form-floating mb-3">
              <input type="email" className="form-control" id="floatingInput" placeholder="Digite seu email"/>
              <label htmlFor="floatingInput">Email</label>
            </div>
            <div className="form-floating mb-3">
              <input type="password" className="form-control" id="floatingPassword" placeholder="Digite sua senha"/>
              <label htmlFor="floatingPassword">Senha</label>
            </div>
            <button className="w-100 btn btn-lg btn-primary" type="submit">Entrar</button>
            <hr className="my-4"/>
            <small className="text-body-secondary">Não tem uma conta? Registre-se.</small>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
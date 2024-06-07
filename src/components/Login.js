import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import AuthService from "../services/AuthService";

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Campo obrigatório.'),
  password: yup
    .string()
    .required('Campo obrigatório.')
});

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema)
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const onSubmit = (data) => {
    setMessage("");
    setLoading(true);

    AuthService.login(data.username, data.password).then(
      () => {
        navigate("/profile");
        window.location.reload();
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setLoading(false);
        setMessage(resMessage);
      }
    );
  };

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <img src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" alt="profile-img" className="profile-img-card" />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label className="label" htmlFor="username">Nome de usuário</label>
            <input type="text" className="form-control" name="username" {...register('username')} />
            {errors.username && <div className="invalid-feedback d-block">{errors.username.message}</div>}
          </div>
          <div className="form-group">
            <label className="label" htmlFor="password">Senha</label>
            <input type="password" className="form-control" name="password" {...register('password')} />
            {errors.password && <div className="invalid-feedback d-block">{errors.password.message}</div>}
          </div>
          <div className="form-group">
            <button className="btn-form btn btn-primary btn-block" disabled={loading}>
              {loading && (
                <span className="spinner spinner-border spinner-border-sm"></span>
              )}
              <span>Entrar</span>
            </button>
          </div>
          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
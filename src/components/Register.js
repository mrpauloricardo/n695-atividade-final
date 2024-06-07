import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import AuthService from "../services/AuthService";

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Campo obrigatório.')
    .min(3, 'O nome de usuário deve possuir entre 3 e 20 caracteres.')
    .max(20, 'O nome de usuário deve possuir entre 3 e 20 caracteres.'),
  email: yup
    .string()
    .required('Campo obrigatório.')
    .email('Este email não é válido.'),
  password: yup
    .string()
    .required('Campo obrigatório.')
    .min(6, 'A senha deve possuir entre 6 e 40 caracteres.')
    .max(40, 'A senha deve possuir entre 6 e 40 caracteres.')
});

const Register = (props) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema)
  });

  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const onSubmit = (data) => {
    setMessage("");
    setSuccessful(false);

    AuthService.register(data.username, data.email, data.password).then(
      (response) => {
        setMessage(response.data.message);
        setSuccessful(true);
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setMessage(resMessage);
        setSuccessful(false);
      }
    );
  };

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <img src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" alt="profile-img" className="profile-img-card" />
        <form onSubmit={handleSubmit(onSubmit)}>
          {!successful && (
            <div>
              <div className="form-group">
                <label className="label" htmlFor="username">Nome de usuário</label>
                <input type="text" className="form-control" name="username" {...register('username')} />
                {errors.username && <div className="invalid-feedback d-block">{errors.username.message}</div>}
              </div>
              <div className="form-group">
                <label className="label" htmlFor="email">Email</label>
                <input type="text" className="form-control" name="email" {...register('email')} />
                {errors.email && <div className="invalid-feedback d-block">{errors.email.message}</div>}
              </div>
              <div className="form-group">
                <label className="label" htmlFor="password">Senha</label>
                <input type="password" className="form-control" name="password" {...register('password')} />
                {errors.password && <div className="invalid-feedback d-block">{errors.password.message}</div>}
              </div>
              <div className="form-group">
                <button className="btn-form btn btn-primary btn-block">Registrar</button>
              </div>
            </div>
          )}
          {message && (
            <div className="form-group">
              <div className={
                successful ? "alert alert-success" : "alert alert-danger"}
                role="alert" > {message}
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Register;
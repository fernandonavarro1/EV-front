import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../context/authContext.js";
import { isValidEmail } from "../utils/validators"; 


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login, loading } = useAuth();
  const [emailError, setEmailError] = useState('');


  useEffect(() => {
    if (email && !isValidEmail(email)) {
      setEmailError('El correo electrónico no es válido');
    } else {
      setEmailError('');
    }
  }, [email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      return; // No envía el formulario si hay errores
    }
    try {
      const response = await login(email, password)
      if(response.status === 200){
        navigate('/panel')
      }
    } catch (error) {
      alert('Datos incorrectos');
    }
  };

  if (loading) {
    return (<div><h2>Login</h2>
    <div>Iniciando sesión...</div></div>);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="E-mail"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
      {emailError && <p style={{ color: 'red', fontSize: '12px'}}>{emailError}</p>}
    </form>
  );
};

export default Login;

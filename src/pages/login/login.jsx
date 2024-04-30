import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../../petitions/petition'; // Importa la función loginUser
import './login.css'; // Importa los estilos CSS

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginUser(formData.email, formData.password);
      console.log('Inicio de sesión exitoso.');
      navigate("/product");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className='container'>
    <div className='loginContainer'>
      <h1>Comercializadora Azocar</h1>
      <h2>Iniciar Sesión</h2>
      {error && <p className="error">{error}</p>} {/* Muestra el mensaje de error */}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Correo:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder='Escribe tu correo'/>
        </div>
        <div>
          <label htmlFor="password">Contraseña:</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} placeholder='Escribe tu contraseña'/>
        </div>
        <button type="submit">Iniciar Sesión</button>
      </form>
      <p>¿No tienes una cuenta? <Link to="/register">Regístrate aquí</Link></p>
    </div>
    </div>
  );
}

export default Login;

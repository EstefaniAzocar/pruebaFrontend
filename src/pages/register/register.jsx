import { useState } from 'react';
import { Link, useNavigate  } from 'react-router-dom';
import { registerUser } from '../../petitions/petition'; // Importa la función RegisterUser
import './register.css'; // Importa los estilos CSS

function Register() {
  const navegate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name:''
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
    if (formData.password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres');
      return;
    }
    try {
      await registerUser(formData); // Modificado aquí
      console.log('Usuario registrado exitosamente.');
      navegate("/login");
    } catch (error) {
      setError(error.message);
    }
  };
  

  return (
    <div className='container'>
    <div className='registerContainer'>
    <h1 >Comercializadora Azocar</h1>
      {error && <p className="error">{error}</p>} {/* Mostrar el mensaje de error */}
      <form onSubmit={handleSubmit}>
      <h2>Registrarse</h2>
      <div>
  <label htmlFor="nombre">Nombre:</label>
  <input type="text" id="nombre" name="name" value={formData.name} onChange={handleChange} placeholder='Escribe tu nombre' />
</div>

        <div>
          <label htmlFor="email">Correo:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange}  placeholder='Escribe tu correo'/>
        </div>
        <div>
          <label htmlFor="password">Contraseña:</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} placeholder='Escribe tu contraseña'/>
        </div>
        <button type="submit">Registrarse</button>
      </form>
      <p>¿Ya tienes una cuenta? <Link to="/login">Inicia sesión aquí</Link></p>
    </div>
    </div>
  );
}

export default Register;

import axios from 'axios';

const API_URL = 'http://localhost:3020'; // Reemplaza con la URL correcta de tu servidor

const handleRequestError = (error, defaultMessage) => {
  if (error.response && error.response.data.errors) {
    throw new Error(error.response.data.errors[0].msg);
  } else if (error.response && error.response.data.message === 'El correo electrónico ya está registrado') {
    throw new Error('El correo electrónico ya está registrado');
  } else {
    console.error('Error en la petición:', error.response.data);
    throw new Error(defaultMessage);
  }
};

const registerUser = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/api/user/register`, formData);
    console.log('Respuesta de registro:', response.data);
    return response.data;
  } catch (error) {
    handleRequestError(error, 'Error al registrar usuario');
  }
};

const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/api/user/login`, { email, password });
    console.log('Respuesta de inicio de sesión:', response.data);
    const token = response.data.data.token; // Obtener el token del response
    console.log("token que trae del backend", token)
    localStorage.setItem('token', token); // Guardar el token en localStorage
    console.log("que guardoo",token)
    return token; // Devolver el token
  } catch (error) {
    handleRequestError(error, 'Credenciales inválidas. Inténtalo de nuevo.');
  }
};


const getProductData = async (token) => {
  try {
    console.log("que token traes:", token)
    const response = await axios.get(`${API_URL}/api/product`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${token}`
      }
    });
    console.log('Respuesta de la ruta protegida:', response.data);
    const res = await response.data
    return res
  } catch (error) {
    // console.error('Error al obtener datos de la ruta protegida:', error.message)
    throw new Error('Error al obtener datos de la ruta protegida');
  }
}

export { loginUser, registerUser, getProductData };

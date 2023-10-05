import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProfesorPage = ({ id }) => {
  const [userData, setUserData] = useState({}); // Cambiado a un objeto vacío

  const peticionGet = async () => {
    try {
      const response = await axios.get(`https://my-json-server.typicode.com/doncornejo27/probarAPI/contenido/${id}`);
      setUserData(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    peticionGet();
  }, [id]);

  console.log(userData);

  // Renderiza la información del usuario
  return (
    <div>
      <h1>Perfil de Usuario</h1>
      <p>ID del usuario: {userData.id}</p>
      <p>Nombre: {userData.name}</p>
      {/* Agrega más información específica del usuario aquí */}
    </div>
  );
};

export default ProfesorPage;

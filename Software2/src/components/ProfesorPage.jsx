import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";

const ProfesorPage = () => {
  const [userData, setUserData] = useState({}); // Cambiado a un objeto vacío

  const { id } = useParams();
  const usuarioId = parseInt(id);

  const peticionGet = async () => {
    try {
      const response = await axios.get(`https://my-json-server.typicode.com/doncornejo27/probarAPI/contenido/${usuarioId}`);
      setUserData(response.data);
    } catch (error) {
      console.error('Error:', error);
  
      // Verificar si el error es un error 404 (Not Found)
      if (error.response && error.response.status === 404) {
        // Redirigir al usuario a la URL deseada
        window.location.href = '/Administrativos/buscar-profesor';
      }
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

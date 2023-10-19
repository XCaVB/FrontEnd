import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from "react-router-dom";
import "../css/Pages.css";

const ProfesorPage = () => {
  const [userData, setUserData] = useState({});

  const { id } = useParams();
  const usuarioId = parseInt(id);

  const peticionGet = async () => {
    try {
      const response = await axios.get(`https://my-json-server.typicode.com/XCaVB/APIProfesores/contenido/${usuarioId}`);
      setUserData(response.data);
    } catch (error) {
      console.error('Error:', error);
  
      if (error.response && error.response.status === 404) {
        window.location.href = '/Administrativos/buscar-profesor';
      }
    }
  };

  useEffect(() => {
    peticionGet();
  }, [id]);

  return (
    <div className='contenedorPrincipal'>
      <div className='horarioProfesor'>
          <h1>Horario profesor {userData.name}</h1>
          <h3>Contacto: {userData.correo}</h3>
      </div>
      <div className='bloqueBoton'>
        <button><Link to={"/Administrativos/buscar-profesor"}>Regresar</Link></button>
        <hr/>
        <button>Agregar Cursos</button>
        <button>XDD</button>
        <button>Pan Con Pan</button>
        <button>Queso y Jamon</button>
      </div>
      <div className='bloqueBoton'>
        <hr/>
        <button>Descargar Horario</button>
      </div>
    </div>
  );
};

export default ProfesorPage;

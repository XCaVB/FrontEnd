import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import { getUsuariosID, getProfesores } from '../../../api/horario.api';
import horario from "../../../data/horarioCalendario"
import { ColorHorario } from './colorHorario';

export function ProfesorPage({matrizD, matrizV}) {
  const { id } = useParams();
  const usuarioId = parseInt(id);
  const armar_horario = horario

  const [usuarios, setUsuarios]= useState([]);
  const [horarioD, setHorarioD] = useState(matrizD);
  const [horarioV, setHorarioV] = useState(matrizV);

  const peticionGet = async () => {
    try {
      // Utiliza la función correspondiente para obtener la información del profesor.
      const responseProfesor = await getProfesores();

      // Realiza la comprobación de usuarioId en los datos obtenidos por getProfesores
      for (const profesor of responseProfesor.data) {
        if (profesor.id === usuarioId) {
          const responseUser = await getUsuariosID(profesor.user);
          setUsuarios(responseUser.data);
          // Si usuarioId coincide con el "user" de un profesor, establece los horarios
          setHorarioD(JSON.parse(profesor.horarioDiurno));
          setHorarioV(JSON.parse(profesor.horarioVespertino));
          break; // Puedes salir del bucle una vez que encuentres una coincidencia
        }
      }
    } catch (error) {
      console.error('Error:', error);
  
      if (error.response && error.response.status === 404) {
        window.location.href = '/administrativos/buscar-profesor';
      }
    }
  };

  useEffect(() => {
    peticionGet();
  }, [id]);
  
  const navigate = useNavigate()

  return (
    <div>
      <div className='d-flex flex-column m-0' style={{background: '#03102C', color: 'white'}}>
        <div className='d-flex col-12 justify-content-center m-0'>
        <h1 className='h1'>Horario profesor {usuarios.first_name}</h1>
        </div>
        <div className='d-flex justify-content-center col-12 m-0'>
            <h3><i className='fa fa-address-card mr-2'></i><a className="text-light" href={`mailto:${usuarios.email}`}>{usuarios.email}</a></h3>
            <button className="btn ml-5 mb-2" style={{color: 'white', background: 'grey'}} onClick={() => navigate(`/administrativos/buscar-profesor`)}>Volver</button> 
        </div>
      </div>

      <div className='d-flex'>
        <div className='d-flex flex-column col-2' style={{background: '#03102C'}}>
          <button className="btn btn-danger m-2" style={{color: 'white', background: '#A90429'}} onClick={() => navigate(`/administrativos/buscar-profesor/${id}/editar-horario`)}>
            Crear/Editar horario
          </button> 
          <button className="btn btn-danger m-2" style={{color: 'white', background: '#A90429'}} disabled>Descargar</button>
        </div>

        <div id="accordion" className='col-10 p-5 mx-auto'>

        {/* HORARIO DIURNO */}
        <div className="card">
          <div className="card-header">
            <div className="card-link" data-toggle="collapse" data-target="#collapseOne" style={{cursor: 'pointer'}}>
            Jornada Diurna
            </div>
          </div>
          <div id="collapseOne" className="collapse show" data-parent="#accordion">
            <div className="card-body">
              <div className="container p-0 col-10" style={{border: '10px solid #03102C', borderCollapse: 'collapse', height: '60vh', overflowY: 'auto'}}>
                <table className="table-fixed table table-bordered">
                  <thead className="sticky-top">
                    <tr style={{background: 'gray', color:'white', textAlign: 'center'}}>
                      <th scope="col" style={{ width: '16%' }}>Hora</th>
                      <th scope="col" style={{ width: '14%' }}>Lunes</th>
                      <th scope="col" style={{ width: '14%' }}>Martes</th>
                      <th scope="col" style={{ width: '14%' }}>Miércoles</th>
                      <th scope="col" style={{ width: '14%' }}>Jueves</th>
                      <th scope="col" style={{ width: '14%' }}>Viernes</th>
                      <th scope="col" style={{ width: '14%' }}>Sabado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {armar_horario.horarioD.map((fila, index) => (
                      <tr key={index}>
                      <td style={{background:'gray', color:'white', textAlign:'center'}}>{fila.hora}</td>
                      <td className="p-1 "><ColorHorario estado={horarioD[index][0]}/></td>
                      <td className="p-1 "><ColorHorario estado={horarioD[index][1]}/></td>
                      <td className="p-1 "><ColorHorario estado={horarioD[index][2]}/></td>
                      <td className="p-1 "><ColorHorario estado={horarioD[index][3]}/></td>
                      <td className="p-1 "><ColorHorario estado={horarioD[index][4]}/></td>
                      <td className="p-1 "><ColorHorario estado={horarioD[index][5]}/></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* HORARIO VESPERTINO */}
        <div className="card">
          <div className="card-header">
            <div className="collapsed card-link" data-toggle="collapse" data-target="#collapseTwo" style={{cursor: 'pointer'}}>
              Jornada Vespertina
            </div>
          </div>
          <div id="collapseTwo" className="collapse" data-parent="#accordion">
            <div className="card-body">
              <div className="container p-0 col-10" style={{border: '10px solid #03102C', borderCollapse: 'collapse', height: '60vh', overflowY: 'auto'}}>
                <table className="table-fixed table table-bordered">
                  <thead className="sticky-top">
                    <tr style={{background: 'gray', color:'white', textAlign: 'center'}}>
                      <th scope="col" style={{ width: '16%' }}>Hora</th>
                      <th scope="col" style={{ width: '14%' }}>Lunes</th>
                      <th scope="col" style={{ width: '14%' }}>Martes</th>
                      <th scope="col" style={{ width: '14%' }}>Miércoles</th>
                      <th scope="col" style={{ width: '14%' }}>Jueves</th>
                      <th scope="col" style={{ width: '14%' }}>Viernes</th>
                      <th scope="col" style={{ width: '14%' }}>Sabado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {armar_horario.horarioV.map((fila, index) => (
                      <tr key={index}>
                      <td style={{background:'gray', color:'white', textAlign:'center'}}>{fila.hora}</td>
                      <td className="p-1 "><ColorHorario estado={horarioV[index][0]}/></td>
                      <td className="p-1 "><ColorHorario estado={horarioV[index][1]}/></td>
                      <td className="p-1 "><ColorHorario estado={horarioV[index][2]}/></td>
                      <td className="p-1 "><ColorHorario estado={horarioV[index][3]}/></td>
                      <td className="p-1 "><ColorHorario estado={horarioV[index][4]}/></td>
                      <td className="p-1 "><ColorHorario estado={horarioV[index][5]}/></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};
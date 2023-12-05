import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { getUsuariosID, getProfesores, getAllCursos, getPlanificacionProfe } from '../../../api/horario.api';
import horario from "../../../data/horarioCalendario"
import logoSM from "../../../images/logo-sm.png"
import { ColorHorario } from './colorHorario';

export function ProfesorPage({matrizD, matrizV, secretario}) {
  const { id } = useParams();
  const usuarioId = parseInt(id);
  const armar_horario = horario

  const [usuarios, setUsuarios]= useState([]);
  const [horarioD, setHorarioD] = useState(matrizD);
  const [horarioV, setHorarioV] = useState(matrizV);
  const [moduloD, setModuloD] = useState();
  const [moduloV, setModuloV] = useState();
  const [profesor, setProfesor] = useState();
  const [curso, setCurso] = useState();
  const [planificaciones, setPlanificaciones] = useState();
  const [matrizCompleta, setMatrizCompleta] = useState();
  const [matricesSeparadas, setMatricesSeparadas] = useState();
  const [jornadas, setJornadas] = useState();


  const peticionGet = async () => {
    try {
      // Utiliza la función correspondiente para obtener la información del profesor.
      const responseProfesor = await getProfesores();
      const responseCurso = await getAllCursos();
      setCurso(responseCurso.data);
      const responsePlanificacion = await getPlanificacionProfe(usuarioId);
      setPlanificaciones(responsePlanificacion.data);

      // Realiza la comprobación de usuarioId en los datos obtenidos por getProfesores
      for (const profesoreh of responseProfesor.data) {
        if (profesoreh.id === usuarioId) {
          const responseUser = await getUsuariosID(profesoreh.user);
          setUsuarios(responseUser.data);
          // Si usuarioId coincide con el "user" de un profesor, establece los horarios
          setProfesor(profesoreh);
          setHorarioD(JSON.parse(profesoreh.horarioDiurno));
          setHorarioV(JSON.parse(profesoreh.horarioVespertino));
          setModuloD(JSON.parse(profesoreh.modulosDiurno));
          setModuloV(JSON.parse(profesoreh.modulosVespertino));
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

  const transformarArregloAMatriz = () => {
    if (planificaciones && planificaciones.length > 0){// Define los días y las horas
    const datos = planificaciones;
    const dias = ['LU', 'MA', 'MI', 'JU', 'VI', 'SA'];
    const horas = ['8:30-9:15', '9:25-10:10', '10:20-11:05', '11:15-12:00', '12:10-12:55', '13:05-13:50', '14:00-14:45', '14:55-15:50', '15:50-16:35', '16:45-17:30', '17:40-18:25', '18:35-19:20', '19:30-20:15', '20:25-21:10'];

    // Crea un objeto para almacenar las listas de módulos
    let listasModulos = {};
    let matrices = {};

    // Recorre cada objeto del arreglo de datos
    for (let objeto of datos) {
        // Parsea la cadena de texto 'modulos' a un arreglo
        let modulos = JSON.parse(objeto.modulos);

        // Si no existe una lista para este curso, la crea
        if (!listasModulos[objeto.curso]) {
            listasModulos[objeto.curso] = [];
        }

        // Agrega los módulos a la lista correspondiente
        listasModulos[objeto.curso].push(...modulos);
    }
    
    for (let curso in listasModulos) {
      // Crea una matriz vacía
      let matriz = Array(horas.length).fill().map(() => Array(dias.length).fill(0));

      // Recorre cada módulo del arreglo
      for (let modulo of listasModulos[curso]) {
          // Divide el módulo en día y hora
          let [dia, hora] = modulo.split(' ');

          // Encuentra el índice del día y la hora
          let indiceDia = dias.indexOf(dia);
          let indiceHora = horas.indexOf(hora);

          // Si el día y la hora existen, coloca el curso en la matriz
          if (indiceDia !== -1 && indiceHora !== -1) {
              matriz[indiceHora][indiceDia] = parseInt(curso);
          }
      }

      // Agrega la matriz al arreglo de matrices
      matrices[parseInt(curso)] = matriz;
  }

  // Crea una matriz vacía
  let matriz = Array(horas.length).fill().map(() => Array(dias.length).fill(0));

  // Recorre cada objeto del arreglo de datos
  for (let objeto of datos) {
      // Parsea la cadena de texto 'modulos' a un arreglo
      let modulos = JSON.parse(objeto.modulos);

      // Recorre cada módulo del arreglo
      for (let modulo of modulos) {
          // Divide el módulo en día y hora
          let [dia, hora] = modulo.split(' ');

          // Encuentra el índice del día y la hora
          let indiceDia = dias.indexOf(dia);
          let indiceHora = horas.indexOf(hora);

          // Si el día y la hora existen, coloca un 71 en la matriz
          if (indiceDia !== -1 && indiceHora !== -1) {
              matriz[indiceHora][indiceDia] = objeto.curso;
          }
      }
  }

  setMatrizCompleta(matriz);
  setMatricesSeparadas(matrices);
}
};

const obtenerJornadas = () => {
  if (planificaciones && planificaciones.length > 0 && matricesSeparadas) {
    let jornadas = {};

    for (let planificacion of planificaciones) {
      if (matricesSeparadas[planificacion.curso]) {
        jornadas[planificacion.curso] = planificacion.jornada;
      }
    }

    // Actualiza el estado 'jornadas' con los datos obtenidos
    setJornadas(jornadas);
  }
};



useEffect(() => {
  const realizarTransformaciones = () => {
    if (planificaciones && planificaciones.length > 0 && usuarios) {
      transformarArregloAMatriz();
      obtenerJornadas();
    }
  };

  realizarTransformaciones();
}, [planificaciones, usuarios]);

useEffect(() => {
  // Esta función se ejecutará al cargar la página
  peticionGet();
}, [id]);
  
  
  const navigate = useNavigate()
  console.log(secretario);
  return (
    <div>
      <div className='d-flex flex-column m-0' style={{background: '#03102C', color: 'white'}}>
        <div className='d-flex col-12 justify-content-center m-0'>
        <h1 className='h1'>HORARIO PROFESOR(A) {usuarios.first_name}</h1>
        </div>
        <div className='d-flex justify-content-center col-12 m-0 border-bottom border-danger'>
            <h3><i className='fa fa-address-card mr-2'></i><a className="text-light" href={`mailto:${usuarios.email}`}>{usuarios.email}</a></h3>
            <button className="btn ml-5 mb-2" style={{color: 'white', background: 'grey'}} onClick={()=>navigate(-1)}>Volver
            </button> 
    
            <button onClick={()=>(transformarArregloAMatriz())}>Profe
            </button> 
            <button onClick={()=>(console.log(matrizCompleta))}>completa
            </button> 
            <button onClick={()=>(console.log(matricesSeparadas))}>separada
            </button> 
            <button onClick={()=>(console.log(planificaciones))}>plani
            </button> 
            <button onClick={()=>(console.log(obtenerJornadas()))}>plani
            </button> 
            <button onClick={()=>(console.log(planificaciones))}>asdasd
            </button> 
            <button onClick={()=>(Object.keys(jornadas).forEach((X) => {console.log(X)}))}>asdsdasdasd
            </button>
        </div>
      </div>

      <div className='d-flex'>
        <div className='d-flex flex-column col-2' style={{background: '#03102C'}}>
          <button className="btn btn-danger mb-2 mr-2 ml-2 mt-4" style={{color: 'white', background: '#A90429', height:'10vh'}} onClick={() => navigate(`/administrativos/buscar-profesor/${id}/editar-horario`, {state: {info: secretario}})}>
            Crear/Modificar horario profesor(a)
          </button> 
          <button className="btn btn-danger m-2" style={{color: 'white', background: '#A90429'}} disabled>Descargar</button>
          <img src={logoSM} alt='logoSmall' className='img-fluid my-auto'/>
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
                      <td className="p-1 ">
                        <ColorHorario estado={horarioD[index][0]} modulo={moduloD && moduloD[index] && moduloD[index][0]} jornadas={jornadas} />
                      </td>
                      <td className="p-1 ">
                        <ColorHorario estado={horarioD[index][1]} modulo={moduloD && moduloD[index] && moduloD[index][1]} jornadas={jornadas}/>
                      </td>
                      <td className="p-1 ">
                        <ColorHorario estado={horarioD[index][2]} modulo={moduloD && moduloD[index] && moduloD[index][2]} jornadas={jornadas}/>
                      </td>
                      <td className="p-1 ">
                        <ColorHorario estado={horarioD[index][3]} modulo={moduloD && moduloD[index] && moduloD[index][3]} jornadas={jornadas}/>
                      </td>
                      <td className="p-1 ">
                        <ColorHorario estado={horarioD[index][4]} modulo={moduloD && moduloD[index] && moduloD[index][4]} jornadas={jornadas}/>
                      </td>
                      <td className="p-1 ">
                        <ColorHorario estado={horarioD[index][5]} modulo={moduloD && moduloD[index] && moduloD[index][5]} jornadas={jornadas}/>
                      </td>
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
                      <td className="p-1 ">
                        <ColorHorario estado={horarioV[index][0]} modulo={moduloV && moduloV[index] && moduloV[index][0]} />
                      </td>
                      <td className="p-1 ">
                        <ColorHorario estado={horarioV[index][1]} modulo={moduloV && moduloV[index] && moduloV[index][1]} />
                      </td>
                      <td className="p-1 ">
                        <ColorHorario estado={horarioV[index][2]} modulo={moduloV && moduloV[index] && moduloV[index][2]} />
                      </td>
                      <td className="p-1 ">
                        <ColorHorario estado={horarioV[index][3]} modulo={moduloV && moduloV[index] && moduloV[index][3]} />
                      </td>
                      <td className="p-1 ">
                        <ColorHorario estado={horarioV[index][4]} modulo={moduloV && moduloV[index] && moduloV[index][4]} />
                      </td>
                      <td className="p-1 ">
                        <ColorHorario estado={horarioV[index][5]} modulo={moduloV && moduloV[index] && moduloV[index][5]} />
                      </td>
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
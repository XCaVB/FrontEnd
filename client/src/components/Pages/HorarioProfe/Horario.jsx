import { updateHorario} from '../../../api/horario.api'
import React, { useState } from "react";
import { BotonHorario } from "./botonHorario";
import horario from "../../../data/horarioCalendario"
import "../../../css/styles.css"
import { useParams } from 'react-router-dom';

export function Horario({matrizD, matrizV, data}) {
    
  // Datos horario
  const armar_horario = horario
  const [matrizDiurno, setMatrizDiurno] = useState(matrizD)
  const [matrizVespertino, setMatrizVespertino] = useState(matrizV)

  const sacarDatoD = (lista) => {
    matrizDiurno[lista[1]][lista[2]] = lista[0]
  }

  const sacarDatoV = (lista) => {
    matrizVespertino[lista[1]][lista[2]] = lista[0]
  }

  const params = useParams();

  async function convertirAString(listaDeListas1, listaDeListas2) {
    let resultado1 = JSON.stringify(listaDeListas1);
    let resultado2 = JSON.stringify(listaDeListas2);

    const nuevosDatos = {
      carrera: data.carrera,
      departamento: data.departamento,
      jornada: data.jornada,
      horarioDiurno: resultado1,
      horarioVespertino: resultado2,
      user: data.user
  }

    try {
      await updateHorario(params.id, nuevosDatos);
      window.alert("Horario actualizado con éxito :)")
    } catch {
      window.alert("Ocurrió un error. Intentalo de nuevo.")
    }
  }

  return (
    <div>
      <div className="container">
      <h1>Horario de Clases</h1>
      <div className="row justify-content-end">
        <div className="d-flex mr-4">
          <div className='rounded-circle mr-1' style={{ width: '20px', height: '20px', marginRight: '10px', background:'white', border: '2px solid'}}/>
          <span className="p">No seleccionado</span>
        </div>
        <div className="d-flex mr-4">
          <div className='rounded-circle mr-1' style={{ width: '20px', height: '20px', marginRight: '10px', background:'green', border: '2px solid'}}/>
          <span className="p">Presencial</span>
        </div>
        <div className="d-flex mr-4">
          <div className='rounded-circle mr-1' style={{ width: '20px', height: '20px', marginRight: '10px', background:'blue', border: '2px solid'}}/>
          <span className="p">En línea</span>
        </div>
      </div>
      </div>
      
      <div className='container'>
      <div id="accordion">

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
                      <td className="p-1"><BotonHorario onDatosEnviados={sacarDatoD} fila={index} columna={0} estado={matrizDiurno[index][0]}/></td>
                      <td className="p-1 "><BotonHorario onDatosEnviados={sacarDatoD} fila={index} columna={1} estado={matrizDiurno[index][1]}/></td>
                      <td className="p-1 "><BotonHorario onDatosEnviados={sacarDatoD} fila={index} columna={2} estado={matrizDiurno[index][2]}/></td>
                      <td className="p-1 "><BotonHorario onDatosEnviados={sacarDatoD} fila={index} columna={3} estado={matrizDiurno[index][3]}/></td>
                      <td className="p-1 "><BotonHorario onDatosEnviados={sacarDatoD} fila={index} columna={4} estado={matrizDiurno[index][4]}/></td>
                      <td className="p-1 "><BotonHorario onDatosEnviados={sacarDatoD} fila={index} columna={5} estado={matrizDiurno[index][5]}/></td>
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
                    <td className="p-1"><BotonHorario onDatosEnviados={sacarDatoV} fila={index} columna={0} estado={matrizVespertino[index][0]}/></td>
                    <td className="p-1 "><BotonHorario onDatosEnviados={sacarDatoV} fila={index} columna={1} estado={matrizVespertino[index][1]}/></td>
                    <td className="p-1 "><BotonHorario onDatosEnviados={sacarDatoV} fila={index} columna={2} estado={matrizVespertino[index][2]}/></td>
                    <td className="p-1 "><BotonHorario onDatosEnviados={sacarDatoV} fila={index} columna={3} estado={matrizVespertino[index][3]}/></td>
                    <td className="p-1 "><BotonHorario onDatosEnviados={sacarDatoV} fila={index} columna={4} estado={matrizVespertino[index][4]}/></td>
                    <td className="p-1 "><BotonHorario onDatosEnviados={sacarDatoV} fila={index} columna={5} estado={matrizVespertino[index][5]}/></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
        <div className='col-2 m-2'>
          <div className="btn rounded border justify-content-end" onClick={() => convertirAString(matrizDiurno, matrizVespertino)} style={{background:'black', color:'white'}}>Aplicar Cambios</div>
        </div>
      </div>
    </div>
    );
  }
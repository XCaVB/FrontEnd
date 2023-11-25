import { updateProfesor, createAuditoria, getHoraChile } from '../../../api/horario.api'
import { useState } from "react";
import { BotonHorario } from "./botonHorario";
import horario from "../../../data/horarioCalendario"
import "../../../css/styles.css"
import exito from "../../../images/exito.gif"
import error from "../../../images/error.gif"
import { useLocation, useParams } from 'react-router-dom';

export function Horario({matrizD, matrizV, data, modificar}) {

  // Datos horario
  const [alerta, setAlerta] = useState(0)
  const armar_horario = horario
  const matrizDiurno = matrizD
  const matrizVespertino = matrizV

  const sacarDatoD = (lista) => {
    matrizDiurno[lista[1]][lista[2]] = lista[0]
    topeHorario()
  }

  const sacarDatoV = (lista) => {
    matrizVespertino[lista[1]][lista[2]] = lista[0]
    topeHorario()
  }

  const topeHorario = () => {
    for (let fila = 11; fila < 14; fila++) {
      for (let columna = 0; columna < 6; columna ++) {
        if (matrizDiurno[fila][columna] === 1){
          matrizVespertino[fila-11][columna] = 2
        }
        if (matrizDiurno[fila][columna] === 0){
          if (matrizVespertino[fila-11][columna] === 2){
            matrizVespertino[fila-11][columna] = 0
          }  
        }
        if (matrizVespertino[fila-11][columna] === 1) {
          matrizDiurno[fila][columna] = 2
        }
        if (matrizVespertino[fila-11][columna] === 0) {
          if (matrizDiurno[fila][columna] === 2){
            matrizDiurno[fila][columna] = 0
          }
        }
      }
    }
  }

  const params = useParams();
  let info = useLocation();

  {/* Preparar matrices y enviarlas a la base de datos */}
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

    //Guardar fecha y hora actual para notificaciones
    let fechaHora = (await getHoraChile()).data.datetime
    fechaHora = fechaHora.split("T")
    fechaHora[1] = fechaHora[1].slice(0,5)

    const auditoria = {evento: "MODIFICÓ", objetivo: "HORARIO", fechaHora: fechaHora.toString(), user: info.state.userInfo.id

  }
    
    try {
      await updateProfesor(params.id, nuevosDatos)
      setAlerta(1)
      reRender()
      await createAuditoria(auditoria)
      
    } catch {
      setAlerta(2)
    }
  }

  const [render, setRender] = useState(false)
  const reRender = () => {
    if (render){
      setRender(false)
    } else {
      setRender(true)
    }
  }

  $(document).ready(function(){
    $('.toast').toast({delay:3000})
    $('.toast').toast('show');
    if (alerta == 1){
      $('.toast').on('hidden.bs.toast', function(){
        window.location.reload()
      });
    } else {
      $('.toast').on('hidden.bs.toast', function(){
        setAlerta(0)
      });
    }
  });
  
  return (
    <div>

      {/*EXITO*/ alerta == 1 && 
          <div className="toast shadow" style={{position: 'absolute', top:'50%', left:'50%', transform: 'translate(-50%, -50%)', zIndex:999999}}>
            <div className="toast-header bg-success text-light justify-content-center">
              ¡Todo correcto!
            </div>
            <div className="toast-body bg-light">
              <img className="img-fluid" src={exito}/>
              <p className='h2 text-success text-center font-weight-bold'>¡Disponibilidad actualizada con éxito!</p>
            </div>
          </div>}
        
        {/*ERROR*/ alerta == 2 && 
          <div className="toast shadow" style={{position: 'absolute', top:'50%', left:'50%', transform: 'translate(-50%, -50%)', zIndex:999999}}>
          <div className="toast-header bg-danger text-light">
            ¡Error!
          </div>
          <div className="toast-body bg-light">
            <img className="img-fluid" src={error}/>
            <p className='h2 text-danger text-center font-weight-bold'>Ha ocurrido un problema, intentalo de nuevo</p>
          </div>
        </div>}

      <div className="container-flex">
      <h2 className='h2 text-center' style={{background: '#03102C', color:'white'}}>Horario de Clases</h2>
      <div className="row justify-content-center m-0">
        {modificar && <div className='alert alert-warning justify-self-start mb-1 mr-5 p-0'><strong><i className='fa fa-exclamation-triangle'></i> Alerta -</strong> Estás modificando el horario.</div>}
        <div className="d-flex mr-4 align-items-center">
          <div className='rounded-circle mr-1' style={{ width: '20px', height: '20px', marginRight: '10px', background:'white', border: '2px solid'}}/>
          <span className="p">No seleccionado</span>
        </div>
        <div className="d-flex mr-4 align-items-center">
          <div className='rounded-circle mr-1' style={{ width: '20px', height: '20px', marginRight: '10px', background:'green', border: '2px solid'}}/>
          <span className="p">Disponible</span>
        </div>
        <div className="d-flex mr-4 align-items-center ">
          <div className='rounded-circle mr-1' style={{ width: '20px', height: '20px', marginRight: '10px', background:'red', border: '2px solid'}}/>
          <span className="p">No disponible/Tope horario</span>
        </div>
      </div>
      </div>
      
      <div className='container'>
      <div id="accordion">

        {/* HORARIO DIURNO */}
        <div className="card">
          <div className="card-header">
            <div className="card-link" onClick={reRender} data-toggle="collapse" data-target="#collapseOne" style={{cursor: 'pointer'}}>
            Jornada Diurna
            </div>
          </div>
          <div id="collapseOne" className="collapse show" data-parent="#accordion">
            <div className="card-body shadow">
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
                      <td className="p-1"><BotonHorario onDatosEnviados={sacarDatoD} fila={index} columna={0} estado={matrizDiurno[index][0]} modificar={modificar}/></td>
                      <td className="p-1"><BotonHorario onDatosEnviados={sacarDatoD} fila={index} columna={1} estado={matrizDiurno[index][1]} modificar={modificar}/></td>
                      <td className="p-1"><BotonHorario onDatosEnviados={sacarDatoD} fila={index} columna={2} estado={matrizDiurno[index][2]} modificar={modificar}/></td>
                      <td className="p-1"><BotonHorario onDatosEnviados={sacarDatoD} fila={index} columna={3} estado={matrizDiurno[index][3]} modificar={modificar}/></td>
                      <td className="p-1"><BotonHorario onDatosEnviados={sacarDatoD} fila={index} columna={4} estado={matrizDiurno[index][4]} modificar={modificar}/></td>
                      <td className="p-1"><BotonHorario onDatosEnviados={sacarDatoD} fila={index} columna={5} estado={matrizDiurno[index][5]} modificar={modificar}/></td>
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
          <div className="collapsed card-link" onClick={reRender} data-toggle="collapse" data-target="#collapseTwo" style={{cursor: 'pointer'}}>
            Jornada Vespertina
          </div>
        </div>
        <div id="collapseTwo" className="collapse" data-parent="#accordion">
          <div className="card-body shadow">
            <div className="d-flex p-0 col-10 mx-auto" style={{border: '10px solid #03102C', borderCollapse: 'collapse', height: '60vh', overflowY: 'auto'}}>
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
                    <td className="p-1"><BotonHorario onDatosEnviados={sacarDatoV} fila={index} columna={0} estado={matrizVespertino[index][0]} modificar={modificar}/></td>
                    <td className="p-1"><BotonHorario onDatosEnviados={sacarDatoV} fila={index} columna={1} estado={matrizVespertino[index][1]} modificar={modificar}/></td>
                    <td className="p-1"><BotonHorario onDatosEnviados={sacarDatoV} fila={index} columna={2} estado={matrizVespertino[index][2]} modificar={modificar}/></td>
                    <td className="p-1"><BotonHorario onDatosEnviados={sacarDatoV} fila={index} columna={3} estado={matrizVespertino[index][3]} modificar={modificar}/></td>
                    <td className="p-1"><BotonHorario onDatosEnviados={sacarDatoV} fila={index} columna={4} estado={matrizVespertino[index][4]} modificar={modificar}/></td>
                    <td className="p-1"><BotonHorario onDatosEnviados={sacarDatoV} fila={index} columna={5} estado={matrizVespertino[index][5]} modificar={modificar}/></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
        <div className='col-2 mt-2 p-0'>
          {!modificar && <button className="btn rounded border shrink" style={{background:'black', color:'white'}} disabled>Aplicar Cambios</button>}
          {modificar && <button className="btn rounded border" onClick={() => convertirAString(matrizDiurno, matrizVespertino)} style={{background:'black', color:'white'}} data-toggle="modal" data-target="#exito">Aplicar Cambios</button>}
        </div>
      </div>
    </div>
    );
  }
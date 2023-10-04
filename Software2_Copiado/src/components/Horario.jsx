import React, { useState } from "react";
import { BotonHorario } from "./botonHorario";
import horario from "../data/horarioCalendario"
import "../css/styles.css"

export function Horario(props) {
    
    // Datos horario
  const armar_horario = horario
  const [datosRecibidos, setDatosRecibidos] = useState(null)
  
  const manejarDatosBoton = (datos) => {
    setDatosRecibidos(datos)
  }

  const elegirHora = (estado, dia, hora) => {
    console.log("Elegiste el día "+ dia + " en el horario "+ hora +" hrs. Quedó en "+estado);
  }

  const sacarDato = (dato) => {
    console.log("dato es -> "+dato);
    setDatosRecibidos(dato);
    console.log("datosRecibidos es -> "+datosRecibidos);
  }

  return (
    <div style={{height: '80vh'}}>
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
      
      <div className="container p-0" style={{borderCollapse: 'collapse', height: '70%', overflowY: 'auto'}}>
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
            {armar_horario.map((fila, index) => (
                <tr key={index}>
                <td style={{background:'gray', color:'white', textAlign:'center'}}>{fila.hora}</td>
                {/*<td onClick={e => elegirHora(fila.lunes, "Lunes", fila.hora)} style={{cursor: "pointer"}}>{fila.lunes}</td>*/}
                <td className="p-1"><BotonHorario onDatosEnviados={sacarDato}/></td>
                <td className="p-1 "><BotonHorario onDatosEnviados={sacarDato}/></td>
                <td className="p-1 "><BotonHorario onDatosEnviados={sacarDato}/></td>
                <td className="p-1 "><BotonHorario onDatosEnviados={sacarDato}/></td>
                <td className="p-1 "><BotonHorario onDatosEnviados={sacarDato}/></td>
                <td className="p-1 "><BotonHorario onDatosEnviados={sacarDato}/></td>
                </tr>
            ))}
            </tbody>
        </table>
      </div>
    </div>
    
      

    );
  }
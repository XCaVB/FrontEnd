import React, { useState } from "react";
import { BotonHorario } from "./botonHorario";
import horario from "../data/horarioCalendario"
import "../css/styles.css"

export function Horario() {
    
    // Datos horario
  const armar_horario = horario
  const [datosRecibidos, setDatosRecibidos] = useState(null)
  
  const manejarDatosBoton = (datos) => {
    setDatosRecibidos(datos)
  }

  const elegirHora = (estado, dia, hora) => {
    console.log("Elegiste el día "+ dia + " en el horario "+ hora +" hrs. Quedó en "+estado);
  }

  return (
    <div className="container">
      <h1>Horario de Clases</h1>
      <div >
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
                <td className="p-1 "><BotonHorario onDatosEnviados={() => {manejarDatosBoton(), elegirHora()}}/></td>
                <td onClick={e => elegirHora(fila.martes, "Martes", fila.hora)} style={{cursor: "pointer"}}>{fila.martes}</td>
                <td onClick={e => elegirHora(fila.miercoles, "Miércoles", fila.hora)} style={{cursor: "pointer"}}>{fila.miercoles}</td>
                <td onClick={e => elegirHora(fila.jueves, "Jueves", fila.hora)} style={{cursor: "pointer"}}>{fila.jueves}</td>
                <td onClick={e => elegirHora(fila.viernes, "Viernes", fila.hora)} style={{cursor: "pointer"}}>{fila.viernes}</td>
                <td onClick={e => elegirHora(fila.sabado, "Sábado", fila.hora)} style={{cursor: "pointer"}}>{fila.sabado}</td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    </div>
    );
  }
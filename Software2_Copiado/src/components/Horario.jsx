import React, { useEffect, useState } from "react";
import { BotonHorario } from "./botonHorario";
import horario from "../data/horarioCalendario"
import "../css/styles.css"

export function Horario({matriz}) {
    
    // Datos horario
  const armar_horario = horario
  const [datosRecibidos, setDatosRecibidos] = useState([])
  const [matrizNueva, setMatrizNueva] = useState(matriz)

  useEffect(() => {
    console.log(datosRecibidos[0]);
  })

  const sacarDato = (lista) => {
    setDatosRecibidos(lista)
    matrizNueva[lista[1]][lista[2]] = lista[0]

  }

  function matrizString(mat) {
    let resultado = '[';
    
    for (let i = 0; i < mat.length; i++) {
      for (let j = 0; j < mat[i].length; j++) {
        resultado += mat[i][j] + ' ';
      }
      resultado += '\n';
    }
    
    console.log(resultado);
    return resultado;
  }

  function convertirAString(listaDeListas) {
    let resultado = JSON.stringify(listaDeListas);
    console.log(resultado);
    return resultado
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
      
      <div className="container p-0" style={{border: '2px solid', borderCollapse: 'collapse', height: '60vh', overflowY: 'auto'}}>
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
                <td className="p-1"><BotonHorario onDatosEnviados={sacarDato} fila={index} columna={0} estado={matrizNueva[index][0]}/></td>
                <td className="p-1 "><BotonHorario onDatosEnviados={sacarDato} fila={index} columna={1} estado={matrizNueva[index][1]}/></td>
                <td className="p-1 "><BotonHorario onDatosEnviados={sacarDato} fila={index} columna={2} estado={matrizNueva[index][2]}/></td>
                <td className="p-1 "><BotonHorario onDatosEnviados={sacarDato} fila={index} columna={3} estado={matrizNueva[index][3]}/></td>
                <td className="p-1 "><BotonHorario onDatosEnviados={sacarDato} fila={index} columna={4} estado={matrizNueva[index][4]}/></td>
                <td className="p-1 "><BotonHorario onDatosEnviados={sacarDato} fila={index} columna={5} estado={matrizNueva[index][5]}/></td>
                </tr>
            ))}
            </tbody>
        </table>
      </div>
      <div className="row mt-4 mr-4 justify-content-end">
        <div className="btn rounded border justify-content-end" onClick={() => convertirAString(matrizNueva)} style={{background:'black', color:'white'}}>Aplicar Cambios</div>
      </div>
    </div>
    );
  }
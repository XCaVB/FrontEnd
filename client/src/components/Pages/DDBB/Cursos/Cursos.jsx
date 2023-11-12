import { useEffect, useState } from "react"
import { ModalCurso } from "./modalCurso"
import { getAllCursos, getCursoID } from "../../../../api/horario.api"

export function Cursos( {alerta} ) {

	const [cursos, setCursos] = useState(null)
  const [ID, setID] = useState(null)

  useEffect(() => async function loadCurso() {
    try {
      const {data} = await getAllCursos();
      setCursos(data)
    } catch {
      alerta(2)
    }
  }, [])

  const [elementoSeleccionado, setElementoSeleccionado] = useState(null)
  
  function manejarModal(datoModal){
    setElementoSeleccionado(datoModal)
    setID('entrar')
  }

  const sacarAlerta = (estado) => {
    alerta(estado)
    setID(null)
  }
  
  return(
    <div>
      <div className="table-responsive" style={{height: '60vh'}}>
        <table className="table table-sm table-striped table-bordered table-hover">
          <thead className="sticky-top">
            
            <tr style={{background: 'gray', color:'white', textAlign: 'center'}}>
              <th style={{width: '5%'}}>ID</th>
              <th style={{width: '20%'}}>Materia</th>
              <th style={{width: '20%'}}>Curso</th>
              <th style={{width: '55%'}}>Asignatura</th>
            </tr>
          </thead>
          <tbody>
            {cursos && cursos.map((curso) => (
                <tr key={curso.id} style={{textAlign: 'center'}}>
                <td>{curso.id}</td>
                <td>{curso.materia}</td>
                <td>{curso.Curso}</td>
                <td>{curso.nombreAsignatura}</td>
                <td className="btn btn-dark align-content-center|" onClick={ () => manejarModal(curso) } data-toggle="modal" data-target={`#entrar${curso.id}`}><i className="fa fa-gear"></i></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>  
        {/* Agregar otro a la BBDD */}
        <div className="btn btn-success m-2" data-toggle="modal" data-target="#agregar" onClick={() => setID('agregar')}>+</div>
      {ID === "entrar" && <ModalCurso identificador={ID+String(elementoSeleccionado.id)} data={elementoSeleccionado} alertaEnviada={sacarAlerta}/>}
      {ID === "agregar" && <ModalCurso identificador={ID} data={{id: null, materia:'', Curso:'', nombreAsignatura:''}} alertaEnviada={sacarAlerta}/>}
    </div>
  )
}
import { useState } from "react"
import { createPlanificacion, updatePlanificacion, deletePlanificacion } from "../../../../api/horario.api"

export function ModalPlanificacion( {alertaEnviada, identificador, data1, docentes, usuarios, cursos} ) {
  
  const [id] = useState(data1.id)
  const [periodo, setPeriodo] = useState(data1.periodo)
  const [actividad, setActividad] = useState(data1.actividad)
  const [jornada, setJornada] = useState(data1.jornada)
  const [profesor, setProfesor] = useState(data1.profesor)
  const [curso, setCurso] = useState(data1.curso)
  const [eliminar, setEliminar] = useState(true)
  const [enviar, setEnviar] = useState(true)

	const [jornadaEstado] = useState( () => {
		if (data1.jornada.toUpperCase() == "DIURNO") {
			return true
		} else {
			return false
		}
	})
  async function enviarAgregar(){
    const data = 
        {periodo: periodo, 
        actividad: actividad,
        jornada: jornada,
        profesor: profesor,
        curso: curso,
    }
    try {
      await createPlanificacion(data)
      alertaEnviada(1)
    } catch {
      alertaEnviada(2)
    }
  }

  async function enviarActualizar(){
    const data = {periodo: periodo, actividad: actividad, jornada: jornada, profesor: profesor, curso: curso}
    try {
      await updatePlanificacion(id,data)
      alertaEnviada(1)
    } catch {
      alertaEnviada(2)
    }
  }

  async function enviarEliminar(){
    try {
      await deletePlanificacion(id)
      alertaEnviada(1)
    } catch {
      alertaEnviada(2)
    }
  }

  return(
  <div className="modal fade" id={identificador} data-backdrop='static'>
    <div className="modal-dialog">
      <div className="modal-content">
    
        <div className="modal-header">
          {identificador === "agregar" && <h4 className="modal-title">Agregando planificación</h4>}
          {identificador === `entrar${data1.id}` && <h4 className="modal-title">Modificando planificación</h4>}
            <button type="button" className="close" data-dismiss="modal" onClick={() => alertaEnviada(0)}>&times;</button>
        </div>
      
        <div className="modal-body pb-0">
          <form className="was-validated" >

						{/* Lista de docentes (enlazado con usuarios) */}
            <div className="form-group">
              <label htmlFor="docente">Docente asociado</label>
                <select className="custom-select" id="docente" defaultValue={data1.profesor} onChange={e => {setProfesor(e.target.value)}} required>
                  <option key="-1" disabled>--Elegir un docente--</option>
                  {usuarios.forEach((usuario) => {
                    docentes.forEach((profesorD) => {
                      if (usuario.id == profesorD.user) {
                        return <option key={usuario.id} value={usuario.user}> {usuario.email} </option>
                      }
                    })
                  })
                  }
                </select>
              <div className="invalid-feedback">Elige un docente.</div>
            </div>
						
						{/* Lista de cursos */}
						<div className="form-group">
              <label htmlFor="curso">Asignatura asociada</label>
                <select className="custom-select" id="curso" defaultValue={data1.curso} onChange={e => {setCurso(e.target.value)}} required>
                  <option key="-1" disabled>--Elegir una asignatura--</option>
                  {cursos.map(asignatura => {
                    if (asignatura.id) {
                      return <option key={asignatura.id} value={asignatura.id}> {asignatura.nombreAsignatura} </option>
                    }
                  })}
                </select>
              <div className="invalid-feedback">Elige una asignatura.</div>
            </div>

            <div className="form-group">
              <label htmlFor="periodo">Período</label>
              <input type="text" className="form-control" id="periodo" placeholder="Ingresar un periodo" name="periodo" defaultValue={data1.periodo} onChange={e => setPeriodo(e.target.value)}/>
              <div className="invalid-feedback">Se requiere llenar este campo.</div>
            </div>
            <div className="form-group">
              <label htmlFor="actividad">Actividad</label>
              <input type="text" className="form-control" id="actividad" placeholder="Ingresar tipo de actividad" name="actividad" defaultValue={data1.actividad} onChange={e => setActividad(e.target.value)} required/>
              <div className="invalid-feedback">Se requiere llenar este campo.</div>
            </div>

						<div className="custom-control custom-radio custom-control-inline">
							<input type="radio" className="custom-control-input" id="customRadio" name="example" value="DIURNO" onChange={() => setJornada('DIURNO')} defaultChecked={jornadaEstado}/>
							<label className="custom-control-label text-dark" htmlFor="customRadio">DIURNO</label>
						</div>
						<div className="custom-control custom-radio custom-control-inline">
							<input type="radio" className="custom-control-input" id="customRadio2" name="example" value="VESPERTINO" onChange={() => setJornada('VESPERTINO')} defaultChecked={!jornadaEstado}/>
							<label className="custom-control-label text-dark" htmlFor="customRadio2">VESPERTINO</label>
						</div>

						{/* Confirmar realizar cambios */}
						<div className="custom-control custom-switch d-flex align-content-center mt-3 mb-3">
							<input type="checkbox" className="custom-control-input form-check-input" id="switch1" onChange={() => {enviar?setEnviar(false):setEnviar(true)}} required/>
							<label className="custom-control-label" htmlFor="switch1"></label>
							<div className="valid-feedback">Correcto</div>
              <div className="invalid-feedback">Marca esta casilla para confirmar los cambios</div>
						</div>
            <div className="d-flex justify-content-between mb-2">
              {identificador === "agregar" && <button type="button" className="btn btn-success" data-dismiss="modal" onClick={enviarAgregar} disabled={enviar}>Enviar</button>}
              {identificador === `entrar${data1.id}` && <button type="button" className="btn btn-success" data-dismiss="modal" onClick={enviarActualizar} disabled={enviar}>Enviar</button>}
              {identificador === `entrar${data1.id}` && <div className="input-group justify-content-end">
                <div className="input-group-prepend border rounded">
                  <input type="checkbox" id="eliminar" className="m-1" style={{cursor:'pointer'}} onChange={() => {eliminar?setEliminar(false):setEliminar(true)}}></input>
                </div>
                <button type="button" className="btn btn-danger rounded-0" data-dismiss="modal" onClick={enviarEliminar} disabled={eliminar}>Eliminar planificación</button>
              </div>}
            </div> 
          </form>
        </div>
      </div>
    </div>
  </div>
  )
};
import { useState } from "react"
import { createCurso, updateCurso, deleteCurso } from "../../../../api/horario.api"

export function ModalCurso( {alertaEnviada, identificador, data} ) {
  
  const [id] = useState(data.id)
  const [materia, setMateria] = useState(data.materia)
  const [curso, setCurso] = useState(data.curso)
  const [asignatura, setAsignatura] = useState(data.nombreAsignatura)
  const [eliminar, setEliminar] = useState(true)
  const [enviar, setEnviar] = useState(true)

  async function enviarAgregar(){
    const data = {materia: materia, Curso: curso, nombreAsignatura: asignatura}
    try {
      await createCurso(data)
      alertaEnviada(1)
    } catch {
      alertaEnviada(2)
    }
  }

  async function enviarActualizar(){
    const data = {materia: materia, Curso: curso, nombreAsignatura: asignatura}
    try {
      await updateCurso(id,data)
      alertaEnviada(1)
    } catch {
      alertaEnviada(2)
    }
  }

  async function enviarEliminar(){
    try {
      await deleteUsuario(id)
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
          {identificador === "agregar" && <h4 className="modal-title">Agregando curso</h4>}
          {identificador === `entrar${data.id}` && <h4 className="modal-title">Modificando curso</h4>}
            <button type="button" className="close" data-dismiss="modal" onClick={() => alertaEnviada(0)}>&times;</button>
        </div>
      
        <div className="modal-body pb-0">
          <form className="was-validated" >
            <div className="form-group">
              <label htmlFor="materia">Materia</label>
              <input type="text" className="form-control" id="materia" placeholder="Ingresar materia" name="materia" defaultValue={data.materia} onChange={e => setMateria(e.target.value)} required/>
              <div className="invalid-feedback">Se requiere llenar este campo.</div>
            </div>
            <div className="form-group">
              <label htmlFor="curso">Curso</label>
              <input type="text" className="form-control" maxLength={4} id="curso" placeholder="Ingresar curso" name="curso" defaultValue={data.Curso} onChange={e => setCurso(e.target.value)} required/>
              <div className="invalid-feedback">Se requiere llenar este campo.</div>
            </div>
            <div className="form-group">
              <label htmlFor="asignatura">Nombre asignatura</label>
              <input type="text" className="form-control" id="asignatura" placeholder="Ingresar nombre de asignatura" name="asignatura" defaultValue={data.nombreAsignatura} onChange={e => setAsignatura(e.target.value.toUpperCase())} required/>
              <div className="invalid-feedback">Se requiere llenar este campo.</div>
            </div>
            <div className="form-group form-check">
              <label className="form-check-label">
                <input className="form-check-input" type="checkbox" name="remember" onChange={() => {enviar?setEnviar(false):setEnviar(true)}} required/>
                <div className="valid-feedback">Correcto</div>
                <div className="invalid-feedback">Marca esta casilla para confirmar los cambios</div>
              </label>
            </div>
            <div className="d-flex justify-content-between mb-2">
              {identificador === "agregar" && <button type="button" className="btn btn-success" data-dismiss="modal" onClick={enviarAgregar} disabled={enviar}>Enviar</button>}
              {identificador === `entrar${data.id}` && <button type="button" className="btn btn-success" data-dismiss="modal" onClick={enviarActualizar} disabled={enviar}>Enviar</button>}
              {identificador === `entrar${data.id}` && <div className="input-group justify-content-end">
                <div className="input-group-prepend border rounded">
                  <input type="checkbox" id="eliminar" className="m-1" style={{cursor:'pointer'}} onChange={() => {eliminar?setEliminar(false):setEliminar(true)}}></input>
                </div>
                <button type="button" className="btn btn-danger rounded-0" data-dismiss="modal" onClick={enviarEliminar} disabled={eliminar}>Eliminar usuario</button>
              </div>}
            </div> 
          </form>
        </div>
      </div>
    </div>
  </div>
  )
};
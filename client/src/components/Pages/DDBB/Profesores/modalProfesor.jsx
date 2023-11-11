import { useState } from "react"
import { createProfesor, updateProfesor, deleteProfesor } from "../../../../api/horario.api"

export function ModalProfesor( {alertaEnviada, identificador, data} ) {
  
  const [id] = useState(data.id)
  const [carrera, setCarrera] = useState(data.carrera)
  const [departamento, setDepartamento] = useState(data.departamento)
  const [jornada, setJornada] = useState(data.jornada)
  const [user, setUser] = useState(data.user)
  const [eliminar, setEliminar] = useState(true)
  const [enviar, setEnviar] = useState(true)

  async function enviarAgregar(){
    const data = 
        {carrera: carrera, 
        departamento: departamento,
        jornada: jornada,
        periodoSemestral: true,
        periodoTrimestral: true,
        bloqueoSemestral: true,
        bloqueoTrimestral: true,
        horarioDiurno: "[[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0]]",
        horarioVespertino: "[[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0]]",
        user: user}
    try {
      await createProfesor(data)
      alertaEnviada(1)
    } catch {
      alertaEnviada(2)
    }
  }

  async function enviarActualizar(){
    const data = {carrera: carrera, departamento: departamento, jornada: jornada}
    try {
      await updateProfesor(id,data)
      alertaEnviada(1)
    } catch {
      alertaEnviada(2)
    }
  }

  async function enviarEliminar(){
    try {
      await deleteProfesor(id)
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
          {identificador === "agregar" && <h4 className="modal-title">Agregando profesor</h4>}
          {identificador === `entrar${data.id}` && <h4 className="modal-title">Modificando profesor</h4>}
            <button type="button" className="close" data-dismiss="modal" onClick={() => alertaEnviada(0)}>&times;</button>
        </div>
      
        <div className="modal-body pb-0">
          <form className="was-validated" >
            <div className="form-group">
              <label htmlFor="username">Nombre de usuario</label>
              <input type="text" className="form-control" id="username" placeholder="Ingresar nombre de usuario (nombre antes de @)" name="username" defaultValue={data.username.split('@')[0]} onChange={e => setUsername(e.target.value)} required/>
              <div className="invalid-feedback">Se requiere llenar este campo.</div>
            </div>
            <div className="form-group">
              <label htmlFor="nombre">Nombre</label>
              <input type="text" className="form-control" id="nombre" placeholder="Ingresar Nombre Apellido" name="nombre" defaultValue={data.first_name} onChange={e => setNombre(e.target.value)} required/>
              <div className="invalid-feedback">Se requiere llenar este campo.</div>
            </div>
            <div className="form-group">
              <label htmlFor="correo">Correo</label>
              <input type="text" className="form-control" id="correo" placeholder="Ingresar correo@direccion.com" name="correo" defaultValue={data.email} onChange={e => setCorreo(e.target.value)} required/>
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
                <button type="button" className="btn btn-danger rounded-0" data-dismiss="modal" onClick={enviarEliminar} disabled={eliminar}>Eliminar profesor</button>
              </div>}
            </div> 
          </form>
        </div>
      </div>
    </div>
  </div>
  )
};
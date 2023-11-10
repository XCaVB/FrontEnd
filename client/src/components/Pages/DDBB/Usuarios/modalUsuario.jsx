import { useState } from "react"
import { createUsuario, updateUsuario, deleteUsuario } from "../../../../api/horario.api"

export function ModalUsuario( {alertaEnviada, identificador, data} ) {
  
  const [id] = useState(data.id)
  const [nombre, setNombre] = useState(data.first_name)
  const [username, setUsername] = useState(data.username)
  const [correo, setCorreo] = useState(data.email)
  const [eliminar, setEliminar] = useState(true)
  const [enviar, setEnviar] = useState(true)

  async function enviarAgregar(){
    const data = {first_name: nombre, last_name:'', username: username, correo: correo}
    try {
      await createUsuario(data)
      alertaEnviada(1)
    } catch {
      alertaEnviada(2)
    }
  }

  async function enviarActualizar(){
    const data = {name: nombre, username: username, correo: correo}
    try {
      await updateUsuario(id,data)
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

  const cerrarModal = () => {
    
  }

  return(
  <div className="modal fade" id={identificador} data-backdrop='static'>
    <div className="modal-dialog">
      <div className="modal-content">
    
        <div className="modal-header">
          {identificador === "agregar" && <h4 className="modal-title">Agregando usuario</h4>}
          {identificador === `entrar${data.id}` && <h4 className="modal-title">Modificando usuario</h4>}
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
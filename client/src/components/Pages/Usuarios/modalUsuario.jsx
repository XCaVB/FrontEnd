import { useEffect, useState } from "react"
import { createUsuario, updateUsuario, deleteUsuario } from "../../../api/horario.api"

export function ModalUsuario( {onDatosEnviados, alertaEnviada, identificador, data} ) {
  
  const [id] = useState(data.id)
  const [nombre, setNombre] = useState(data.name)
  const [rut, setRut] = useState(data.rut)
  const [correo, setCorreo] = useState(data.correo)
  const [eliminar, setEliminar] = useState(true)
  const [enviar, setEnviar] = useState(true)

  const enviarDatosAPadre = () => {
    onDatosEnviados(false)
  }

  async function enviarAgregar(){
    const data = {name: nombre, rut: rut, correo: correo}
    try {
      await createUsuario(data)
      alertaEnviada(1)
    } catch {
      alertaEnviada(2)
    }
  }

  async function enviarActualizar(){
    const data = {name: nombre, rut: rut, correo: correo}
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

  return(
  <div className="modal fade" id={identificador} data-backdrop='static'>
    <div className="modal-dialog">
      <div className="modal-content">
    
        <div className="modal-header">
          {identificador==="agregar" && <h4 className="modal-title">Agregando usuario</h4>}
          {identificador==="entrar" && <h4 className="modal-title">Modificando usuario</h4>}
            <button type="button" className="close" data-dismiss="modal" onClick={enviarDatosAPadre}>&times;</button>
        </div>
      
        <div className="modal-body pb-0">
          <form className="was-validated" >
            <div className="form-group">
              <label htmlFor="nombre">Nombre</label>
              <input type="text" className="form-control" id="nombre" placeholder="Ingresar Nombre Apellido" name="nombre" defaultValue={nombre} onChange={e => setNombre(e.target.value)} required/>
              <div className="invalid-feedback">Se requiere llenar este campo.</div>
            </div>
            <div className="form-group">
              <label htmlFor="rut">Rut</label>
              <input type="text" className="form-control" id="rut" placeholder="Ingresar 12.345.678-9" name="rut" defaultValue={rut} onChange={e => setRut(e.target.value)} required/>
              <div className="invalid-feedback">Se requiere llenar este campo.</div>
            </div>
            <div className="form-group">
              <label htmlFor="correo">Correo</label>
              <input type="text" className="form-control" id="correo" placeholder="Ingresar correo@direccion.com" name="correo" defaultValue={correo} onChange={e => setCorreo(e.target.value)} required/>
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
              {identificador === "agregar" && <button type="button" className="btn" data-dismiss="modal" onClick={enviarAgregar} disabled={enviar}>Enviar</button>}
              {identificador === "entrar" && <button type="button" className="btn" data-dismiss="modal" onClick={enviarActualizar} disabled={enviar}>Enviar</button>}
              {identificador === "entrar" && <div className="input-group justify-content-end">
                <div className="input-group-prepend border rounded">
                  <input type="checkbox" className="m-1" style={{cursor:'pointer'}} onChange={() => {eliminar?setEliminar(false):setEliminar(true)}}></input>
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
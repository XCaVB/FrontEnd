import { useEffect, useState } from "react"
import { createUsuario, updateUsuario, deleteUsuario } from "../../../api/horario.api"

export function ModalUsuario( {onDatosEnviados, id, data} ) {

  console.log(data)

  const [nombre, setNombre] = useState(data.name)
  const [rut, setRut] = useState(data.rut)
  const [correo, setCorreo] = useState(data.correo)

  const enviarDatosAPadre = () => {
    onDatosEnviados(false)
  }

  return(
  <div className="modal fade" id={id} data-backdrop='static'>
    <div className="modal-dialog">
      <div className="modal-content">
    
        <div className="modal-header">
          {id==="agregar" && <h4 className="modal-title">Agregando usuario</h4>}
          {id==="entrar" && <h4 className="modal-title">Modificando usuario</h4>}
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
                <input className="form-check-input" type="checkbox" name="remember" required/>
                <div className="valid-feedback">Correcto</div>
                <div className="invalid-feedback">Marca esta casilla para confirmar los cambios</div>
              </label>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <button type="submit" className="btn btn-green">Enviar</button>
              {id==="entrar" && <button type="button" className="btn btn-danger m-0" data-bs-toggle="popover" title="¿Estás seguro que quieres eliminar esto?" data-bs-content="<a className='btn btn-danger'>Confimar</button>" data-bs-html="true">Eliminar usuario</button>}
            </div> 
          </form>
        </div>
      </div>
    </div>
  </div>
  )
}
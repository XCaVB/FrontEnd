import { useEffect, useState } from "react"

export function ModalUsuario({id, data}) {

    return(
    <div className="modal" id={id}>
      <div className="modal-dialog">
        <div className="modal-content">
      
          <div className="modal-header">
            {!data && <h4 className="modal-title">Agregando usuario</h4>}
            {data && <h4 className="modal-title">Modificando usuario</h4>}
              <button type="button" className="close" data-dismiss="modal">&times;</button>
          </div>
        
          <div className="modal-body pb-0">
            <form className="was-validated">
              <div className="form-group">
                <label htmlFor="nombre">Nombre</label>
                <input type="text" className="form-control" id="nombre" placeholder="Ingresar NOMBRE APELLIDO" name="nombre" defaultValue={data && data.name} required/>
                <div className="invalid-feedback">Se requiere llenar este campo.</div>
              </div>
              <div className="form-group">
                <label htmlFor="rut">Rut</label>
                <input type="text" className="form-control" id="rut" placeholder="Ingresar 12.345.678-9" name="rut" defaultValue={data && data.rut} required/>
                <div className="invalid-feedback">Se requiere llenar este campo.</div>
              </div>
              <div className="form-group">
                <label htmlFor="correo">Correo</label>
                <input type="text" className="form-control" id="correo" placeholder="Ingresar correo@direccion.com" name="correo" defaultValue={data && data.correo} required/>
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
                {data && <button type="submit" className="btn btn-danger m-0" >Eliminar usuario</button>}
              </div> 
            </form>
          </div>
        </div>
      </div>
    </div>
    )
}
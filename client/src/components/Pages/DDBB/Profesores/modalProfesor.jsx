import { useState } from "react"
import { createProfesor, updateProfesor, deleteProfesor } from "../../../../api/horario.api"

export function ModalProfesor( {alertaEnviada, identificador, data1, data2} ) {
  
  const [id] = useState(data1.id)
  const [carrera, setCarrera] = useState(data1.carrera)
  const [departamento, setDepartamento] = useState(data1.departamento)
  const [jornada, setJornada] = useState(data1.jornada)
  const [user, setUser] = useState(data1.user)
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
        modulosDiurno: "[[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0]]",
        modulosVespertino: "[[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0]]",
        user: user}
    try {
      await createProfesor(data)
      alertaEnviada(1)
    } catch {
      alertaEnviada(2)
    }
  }

  async function enviarActualizar(){
    const data = {carrera: carrera, departamento: departamento, jornada: jornada, user: user}
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
          {identificador === "agregar" && <h4 className="modal-title">Agregando docente</h4>}
          {identificador === `entrar${data1.id}` && <h4 className="modal-title">Modificando docente</h4>}
            <button type="button" className="close" data-dismiss="modal" onClick={() => alertaEnviada(0)}>&times;</button>
        </div>
      
        <div className="modal-body pb-0">
          <form className="was-validated" >
            <div className="form-group">
              <label htmlFor="usuario">Usuario asociado</label>
                <select className="custom-select" id="usuario" defaultValue={data1.user} onChange={e => {setUser(e.target.value)}} required>
                  <option key="-1" disabled>--Elegir un usuario--</option>
                  {data2.map(usuario => {
                    if (usuario.id != 1) {
                      return <option key={usuario.id} value={usuario.id}> {usuario.email} </option>
                    }
                  })}
                </select>
              <div className="invalid-feedback">Elige un usuario.</div>
            </div>
            <div className="form-group">
              <label htmlFor="carrera">Carrera</label>
              <input type="text" className="form-control" id="carrera" placeholder="Ingresar una carrera" name="carrera" defaultValue={data1.carrera} onChange={e => setCarrera(e.target.value)}/>
              <div className="invalid-feedback">Se requiere llenar este campo.</div>
            </div>
            <div className="form-group">
              <label htmlFor="departamento">Departamento</label>
              <input type="text" className="form-control" id="departamento" placeholder="Ingresar departamento" name="departamento" defaultValue={data1.departamento} onChange={e => setDepartamento(e.target.value)} required/>
              <div className="invalid-feedback">Se requiere llenar este campo.</div>
            </div>
            <div className="form-group">
              <label htmlFor="jornada">Jornada</label>
              <input type="text" className="form-control" id="jornada" placeholder="Ingresar jornada" name="jornada" defaultValue={data1.jornada} onChange={e => setJornada(e.target.value)}/>
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
              {identificador === `entrar${data1.id}` && <button type="button" className="btn btn-success" data-dismiss="modal" onClick={enviarActualizar} disabled={enviar}>Enviar</button>}
              {identificador === `entrar${data1.id}` && <div className="input-group justify-content-end">
                <div className="input-group-prepend border rounded">
                  <input type="checkbox" id="eliminar" className="m-1" style={{cursor:'pointer'}} onChange={() => {eliminar?setEliminar(false):setEliminar(true)}}></input>
                </div>
                <button type="button" className="btn btn-danger rounded-0" data-dismiss="modal" onClick={enviarEliminar} disabled={eliminar}>Eliminar docente</button>
              </div>}
            </div> 
          </form>
        </div>
      </div>
    </div>
  </div>
  )
};
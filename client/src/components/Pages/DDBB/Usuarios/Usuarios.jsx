import { useEffect, useState } from "react"
import { ModalUsuario } from "./modalUsuario"
import { getAllUsuarios } from "../../../../api/horario.api"

export function Usuarios( {alerta} ) {

  const [usuarios, setUsuarios] = useState(null)
  const [ID, setID] = useState(null)

  useEffect(() => async function loadUsuario() {
    try {
      const {data} = await getAllUsuarios();
      setUsuarios(data)
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
              <th style={{width: '4%'}}>ID</th>
              <th style={{width: '32%'}}>Nombre</th>
              <th style={{width: '32%'}}>Correo</th>
              <th style={{width: '32%'}}>Grupos</th>
            </tr>
          </thead>
          <tbody>
            {usuarios && usuarios.map((usuario) => (
                usuario.username !== "admin" && <tr key={usuario.id} style={{textAlign: 'center'}}>
                <td>{usuario.id}</td>
                <td>{usuario.first_name}</td>
                <td>{usuario.email}</td>
                <td>{usuario.groups}</td>
                <td className="btn btn-dark align-content-center|" onClick={ () => manejarModal(usuario) } data-toggle="modal" data-target={`#entrar${usuario.id}`}><i className="fa fa-gear"></i></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>  
        {/* Agregar otro a la BBDD */}
        <div className="btn btn-success m-2" data-toggle="modal" data-target="#agregar" onClick={() => setID('agregar')}>+</div>
      {ID === "entrar" && <ModalUsuario identificador={ID+String(elementoSeleccionado.id)} data={elementoSeleccionado} alertaEnviada={sacarAlerta}/>}
      {ID === "agregar" && <ModalUsuario identificador={ID} data={{id: null, username:'', first_name:'', email:''}} alertaEnviada={sacarAlerta}/>}
    </div>
  )
}
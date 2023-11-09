import { useEffect, useState } from "react"
import { Header } from "../../../Headers/Header"
import { ModalUsuario } from "./modalUsuario"
import { getAllUsuarios } from "../../../../api/horario.api"

export function Usuarios( {alerta} ) {

  const [usuarios, setUsuarios] = useState(null)
  const [ID, setID] = useState('')

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
  }

  const sacarAlerta = (estado) => {
    alerta(estado)
  }

  console.log(elementoSeleccionado);
  return(
    <div>
      <div className="table-responsive">
        <table className="table table-sm table-striped table-bordered">
          <thead>
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
                <td>{usuario.first_name +" "+ usuario.last_name}</td>
                <td>{usuario.email}</td>
                <td>{usuario.groups}</td>
                <td><div className="btn btn-secondary" style={{height:'3vh'}} onClick={ ( () => {manejarModal(usuario); setID('entrar');} ) } data-toggle="modal" data-target="#entrar">Modificar</div></td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Agregar otro a la BBDD */}
        <div className="btn btn-success mb-2" data-toggle="modal" data-target="#agregar" onClick={() => setID('agregar')}>+</div>
      </div>  
      {ID === "entrar" && <ModalUsuario identificador={elementoSeleccionado.id} data={elementoSeleccionado} alertaEnviada={sacarAlerta}/>}
      {ID === "agregar" && <ModalUsuario identificador={ID} data={{id: null, name:'', rut:'', correo:''}} alertaEnviada={sacarAlerta}/>}
    </div>
  )
}
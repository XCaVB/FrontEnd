import { useEffect, useState } from "react"
import { ModalProfesor } from "./modalProfesor"
import { getAllProfesores, getUsuario, getAllUsuarios } from "../../../../api/horario.api"

export function Profesores( {alerta} ) {

  const [profesores, setProfesores] = useState(null)
	const [usuarios, setUsuarios] = useState(null)
  const [ID, setID] = useState(null)

  useEffect(() => async function loadProfesor() {
    try {
      const {data} = await getAllProfesores();
      setProfesores(data)
      const respuesta = await getAllUsuarios();
      const users = respuesta.data
      setUsuarios(users) 
    } catch {
      alerta(2)
    }
  }, [])

  const [elementoSeleccionado, setElementoSeleccionado] = useState(null)
  
  const mostrarNombre = (cosa) => {
    let nombre = ""
    usuarios.forEach((usuario) => {
      if (usuario.id == cosa){
        nombre = usuario.first_name
      }
    })
    return <td>{nombre}</td>
  }
  
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
              <th style={{width: '24%'}}>Usuario</th>
              <th style={{width: '24%'}}>Carrera</th>
              <th style={{width: '24%'}}>Departamento</th>
              <th style={{width: '24%'}}>Jornada</th>
            </tr>
          </thead>
          <tbody>
            {profesores && profesores.map((profesor) => (
                <tr key={profesor.id} style={{textAlign: 'center'}}>
                <td>{profesor.id}</td>
                {usuarios && mostrarNombre(profesor.user)}
                <td>{profesor.carrera}</td>
                <td>{profesor.departamento}</td>
                <td>{profesor.jornada}</td>
                <td className="btn btn-dark align-content-center|" onClick={ () => manejarModal(profesor) } data-toggle="modal" data-target={`#entrar${profesor.id}`}><i className="fa fa-gear"></i></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>  
        {/* Agregar otro a la BBDD */}
        <div className="btn btn-success m-2" data-toggle="modal" data-target="#agregar" onClick={() => setID('agregar')}>+</div>
      {ID === "entrar" && <ModalProfesor identificador={ID+String(elementoSeleccionado.id)} data={elementoSeleccionado} alertaEnviada={sacarAlerta}/>}
      {ID === "agregar" && <ModalProfesor identificador={ID} data={{id: null, carrera:'', jornada:'', user:''}} alertaEnviada={sacarAlerta}/>}
    </div>
  )
}
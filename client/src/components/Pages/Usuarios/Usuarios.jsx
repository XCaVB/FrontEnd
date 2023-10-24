import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Header } from "../../Headers/Header"
import { ModalUsuario } from "./modalUsuario"
import { getAllUsuarios } from "../../../api/horario.api"

export function Usuarios() {

  const [usuarios, setUsuarios] = useState(null)
  const [ID, setID] = useState('')

  useEffect(() => async function loadUsuario() {
    try {
      const {data} = await getAllUsuarios();
      setUsuarios(data)
    } catch {
      setAlerta(2)
    }
  }, [])

  async function loadUsuarios(){
    try {
      const {data} = await getAllUsuarios();
      setUsuarios(data)
    } catch {
      setAlerta(2)
    }
  }

  const [elementoSeleccionado, setElementoSeleccionado] = useState(null)
  const [visible, setVisible] = useState(false)
  const [alerta, setAlerta] = useState(0)

  function manejarModal(datoModal){
    setElementoSeleccionado(datoModal)
    setVisible(true)
  }

  const sacarDato = (estado) => {
    setVisible(estado)
  }

  const sacarAlerta = (estado) => {
    setAlerta(estado)
  }

  return(
    <div>
      <Header/>
      
      {/*---ALERTAS---*/}
      <div className="row justify-content-center m-5">

      {/* EXITO */}
      {alerta===1 && <div className="alert alert-success alert-dismissible fade show col-5">
        <button type="button" className="close" data-dismiss="alert" onClick={() => setAlerta(0)}>&times;</button>
        <strong>¡Exito!</strong> Operación realizada exitosamente.
        </div>}

      {/* ERROR */}
      {alerta===2 && <div className="alert alert-danger alert-dismissible fade show col-5">
        <button type="button" className="close" data-dismiss="alert" onClick={() => setAlerta(0)}>&times;</button>
        <strong>¡Error!</strong> Ha ocurrido un error inesperado, intentalo de nuevo.
        </div>}
      </div>

      <div className="row justify-content-center mr-0">
        <div className="container border m-2 col-10">
          <div className="row justify-content-center border p-2" style={{background:'#03102C', color:'white', fontSize: 22}}>
            DB Management
          </div>
          <div className="row">
            <div className="form-group col-2">
              <label htmlFor="sel1">Mostrar</label>
              <select className="form-control" id="sel1">
                <option>Usuario</option>
                <option disabled>Profesor</option>
                <option disabled>Clase</option>
                <option disabled>Otra opcion</option>
                <option disabled>Opcion 5</option>
                <option disabled>Opcion 6</option>
              </select>
            </div>
            <div type="button" className="btn align-self-center p-1" style={{background: 'grey', color:'white'}} onClick={loadUsuarios}>&#8635;</div>
          </div>
          

          <div className="table-responsive">
            <table className="table table-sm table-bordered">
              <thead>
                <tr style={{background: 'gray', color:'white', textAlign: 'center'}}>
                  <th style={{width: '4%'}}>ID</th>
                  <th style={{width: '32%'}}>Nombre</th>
                  <th style={{width: '32%'}}>Rut</th>
                  <th style={{width: '32%'}}>Correo</th>
                </tr>
              </thead>
              <tbody>
                {usuarios && usuarios.map((usuario) => (
                  <tr key={usuario.id} style={{textAlign: 'center'}}>
                    <td>{usuario.id}</td>
                    <td>{usuario.name}</td>
                    <td>{usuario.rut}</td>
                    <td>{usuario.correo}</td>
                    <td><div className="btn btn-secondary" style={{height:'3vh'}} onClick={ ( () => {manejarModal(usuario); setID('entrar');} ) } data-toggle="modal" data-target="#entrar">Modificar</div></td>
                  </tr>
                  
                ))}
                {/* Agregar otro a la BBDD */}
                <tr style={{textAlign: 'center'}}> 
                  <td>
                    <div className="btn btn-success" data-toggle="modal" data-target="#agregar" onClick={() => setID('agregar')}>+</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>  
        </div>
      </div>

   
      {visible && <ModalUsuario identificador={ID} data={elementoSeleccionado} onDatosEnviados={sacarDato} alertaEnviada={sacarAlerta}/>}
      {ID==="agregar" && <ModalUsuario identificador={ID} data={{id: null, name:'', rut:'', correo:''}} onDatosEnviados={sacarDato} alertaEnviada={sacarAlerta}/>}
     
    </div>
  
    )
}
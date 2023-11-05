import { useEffect, useState } from "react"
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


  console.log(usuarios);
  return(
    <div>
      <Header estado={"cerrar"}/>
      
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
            <div type="button" className="btn align-self-center p-1" style={{background: 'grey', color:'white'}} onClick={loadUsuarios}><i className="fa fa-refresh m-1"></i>Actualizar tabla</div>
            
            <p className="align-self-center ml-5 mr-2 mb-0">Ordenar por: </p>
            <div className="form-check-inline">
              <label className="form-check-label">
                <input type="radio" className="form-check-input" name="optradio" defaultChecked onClick={() => setUsuarios(usuarios.sort((a, b) => a.id - b.id))}></input>ID
              </label>
            </div>
            <div className="form-check-inline">
              <label className="form-check-label">
                <input type="radio" className="form-check-input" name="optradio" onChange={() => {const porNombre = usuarios.sort((a, b) => a.first_name.localeCompare(b.first_name)); setUsuarios(porNombre)}}></input>Nombre
              </label>
            </div>
            <div className="form-check-inline">
              <label className="form-check-label">
                <input type="radio" className="form-check-input" name="optradio" onChange={() => setUsuarios(usuarios.sort((a, b) => a.rut - b.rut))}></input>Rut
              </label>
            </div>
          </div>
          

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
        </div>
      </div>

      {visible && <ModalUsuario identificador={ID} data={elementoSeleccionado} onDatosEnviados={sacarDato} alertaEnviada={sacarAlerta}/>}
      {ID==="agregar" && <ModalUsuario identificador={ID} data={{id: null, name:'', rut:'', correo:''}} onDatosEnviados={sacarDato} alertaEnviada={sacarAlerta}/>}
     
    </div>
  
    )
}
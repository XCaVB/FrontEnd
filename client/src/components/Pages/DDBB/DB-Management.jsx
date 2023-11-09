import { useEffect, useState } from "react"
import { Header } from "../../Headers/Header"
import { getAllUsuarios } from "../../../api/horario.api"
import { Usuarios } from "./Usuarios/Usuarios"

export function DB_Management() {

  const [mostrar, setMostrar] = useState("usuarios")
  const [alerta, setAlerta] = useState(0)

  const sacarAlerta = (estado) => {
    setAlerta(estado)
  }

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
            <div type="button" className="btn align-self-center p-1" style={{background: 'grey', color:'white'}} ><i className="fa fa-refresh m-1"></i>Actualizar tabla</div>
            
            <p className="align-self-center ml-5 mr-2 mb-0">Ordenar por: </p>
            <div className="form-check-inline">
              <label className="form-check-label">
                <input type="radio" className="form-check-input" name="optradio" defaultChecked></input>ID
              </label>
            </div>
            <div className="form-check-inline">
              <label className="form-check-label">
                <input type="radio" className="form-check-input" name="optradio"></input>Nombre
              </label>
            </div>
            <div className="form-check-inline">
              <label className="form-check-label">
                <input type="radio" className="form-check-input" name="optradio" ></input>Rut
              </label>
            </div>
          </div>
          
          {/*-- TABLAS --*/}
          {mostrar === "usuarios" && <Usuarios alerta={sacarAlerta}/>}
        </div>
      </div>
    </div>
  
    )
}
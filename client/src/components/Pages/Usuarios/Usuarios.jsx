import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Header } from "../../Headers/Header"
import { getAllUsuarios } from "../../../api/horario.api"

export function Usuarios() {

  const [usuarios, setUsuarios] = useState(null)

  useEffect(() => async function loadUsuario() {
    try {
      const {data} = await getAllUsuarios();
      setUsuarios(data)
    } catch {
      window.alert("ERROR. INTENTA DE NUEVO.")
    }
  }, [])

  return(
    <div>
      <Header/>
      <button className="btn btn-grey m-3" style={{borderStyle: 'solid', borderColor: 'black'}}>Volver</button>

      <div className="row justify-content-center">
        <div className="container border m-2 col-10">
          <div className="row justify-content-center border p-2">
            DB Management
          </div>
          <div className="form-group col-2">
            <label htmlFor="sel1">[REVISAR SI VA ESTO]Filtrar por:</label>
            <select className="form-control" id="sel1">
              <option>No filtrar</option>
              <option>Usuario</option>
              <option>Clase</option>
            </select>
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
                    <td><div className="btn btn-secondary">+</div></td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>  
        </div>
      </div>
    </div>
      
        
    )
}
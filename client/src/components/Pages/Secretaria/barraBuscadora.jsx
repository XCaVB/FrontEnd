import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import "../../../css/barraBuscadora.css"
import { getUsuarios, getUsuariosID, getProfesores, getProfesoresID,} from '../../../api/horario.api';

export function BarraBuscadora(){
    
    const [usuarios, setUsuarios]= useState([]);
    const [tablaUsuarios, setTablaUsuarios]= useState([]);
    const [profesor, setProfesor]= useState([]);
    const [tablaProfesor, setTablaProfesor]= useState([]);
    const [busqueda, setBusqueda]= useState('');
    
    const peticionGet = async () => {
        try {
        // Realiza la solicitud para obtener usuarios
            const responseUser = await getUsuarios();
            setUsuarios(responseUser.data);
            setTablaUsuarios(responseUser.data);
            console.log(responseUser.data);
        // Realiza la solicitud para obtener profesores   
            const responseProfe = await getProfesores();
            setProfesor(responseProfe.data);
            setTablaProfesor(responseProfe.data);
            console.log(responseProfe.data);
        } catch (error) {
            console.log(error);

        }
    };

    const handleChange=e=>{
        setBusqueda(e.target.value);
        filtrar(e.target.value);
      }

    const filtrar=(terminoBusqueda)=>{
        var resultadosBusqueda=tablaUsuarios.filter((elemento)=>{
            if(elemento.name.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
            || elemento.rut.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
            ){
            return elemento;
            }
        });
        setUsuarios(resultadosBusqueda);
    }

    useEffect(()=>{
        peticionGet();
    },[])

    return(
        <div>
            <hr />
          <div className="containerInput">
            <input
              className="form-control inputBuscar"
              value={busqueda}
              placeholder="Búsqueda por Nombre o Rut"
              onChange={handleChange}
            />
          </div>
          <div className="table-responsive">
            <table className="table table-sm table-bordered">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Rut</th>
                  <th>Carrera</th>
                  <th>Departamento</th>
                  <th>Jornada</th>
                </tr>
              </thead>
              <tbody>
                {profesor && usuarios && profesor.map((profesor) => {
                  // Encuentra el usuario correspondiente para este profesor (ajusta la lógica según tus datos)
                  const usuarioCorrespondiente = usuarios.find((usuario) => usuario.id === profesor.user);
      
                  // Verifica si cualquiera de las celdas es "N/A"
                  const mostrarFila = (
                    profesor.id !== 'N/A' &&
                    usuarioCorrespondiente &&
                    usuarioCorrespondiente.name !== 'N/A' &&
                    usuarioCorrespondiente.rut !== 'N/A' &&
                    profesor.carrera !== 'N/A' &&
                    profesor.departamento !== 'N/A' &&
                    profesor.jornada !== 'N/A'
                  );
      
                  // Renderiza la fila solo si no contiene "N/A"
                  return mostrarFila && (
                    <tr key={profesor.id}>
                      <td>{profesor.id}</td>
                      <td>
                        <Link to={`/Administrativos/buscar-profesor/${profesor.id}`}>
                          {usuarioCorrespondiente ? usuarioCorrespondiente.name : 'N/A'}
                        </Link>
                      </td>
                      <td>{usuarioCorrespondiente ? usuarioCorrespondiente.rut : 'N/A'}</td>
                      <td>{profesor.carrera}</td>
                      <td>{profesor.departamento}</td>
                      <td>{profesor.jornada}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
    );
}
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import "../../../css/barraBuscadora.css"
import { getUsuarios, getUsuariosRut , getProfesores} from '../../../api/horario.api';

export function BarraBuscadora(){
    
    const [usuarios, setUsuarios]= useState([]);
    const [tablaUsuarios, setTablaUsuarios]= useState([]);
    const [profesor, setProfesor]= useState([]);
    const [usuariosRut, setUsuariosRut]= useState([]);

    const [busqueda, setBusqueda]= useState('');
    
    const peticionGet = async () => {
        try {
        // Realiza la solicitud para obtener profesores   
            const responseProfe = await getProfesores();
            setProfesor(responseProfe.data);
            console.log(responseProfe.data);

            
            const responseUser = await getUsuarios();
            setUsuarios(responseUser.data);
            setTablaUsuarios(responseUser.data);
            console.log(responseUser.data);

            const responseUserRut = await getUsuariosRut();
            setUsuariosRut(responseUserRut.data)
            console.log(responseUserRut.data);

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
            if(elemento.username.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
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
              className="form-control inputBuscar text-center"
              value={busqueda}
              placeholder="Búsqueda por Nombre"
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
                {profesor && usuarios && usuariosRut && profesor.map((profesor) => {
                  // Encuentra el usuario correspondiente para este profesor (ajusta la lógica según tus datos)
                  const usuarioCorrespondiente = usuarios.find((usuario) => usuario.id === profesor.user);
                  const usuarioRutCorrespondiente = usuariosRut.find((usuarioRut) => usuarioRut.user === profesor.user);

      
                  // Verifica si cualquiera de las celdas es "N/A"
                  const mostrarFila = (
                    profesor.id !== 'N/A' &&
                    usuarioCorrespondiente &&
                    usuarioCorrespondiente.username !== 'N/A' &&
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
                          {usuarioCorrespondiente ? usuarioCorrespondiente.first_name : 'N/A'}
                        </Link>
                      </td>
                      <td>{usuarioRutCorrespondiente ? usuarioRutCorrespondiente.rut : 'N/A'}</td>
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
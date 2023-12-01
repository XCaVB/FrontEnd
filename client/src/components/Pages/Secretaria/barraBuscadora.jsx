import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"
import "../../../css/barraBuscadora.css"
import { getUsuarios, getUsuariosRut , getProfesores} from '../../../api/horario.api';

export function BarraBuscadora(){
    
    const [usuarios, setUsuarios]= useState([]);
    const [tablaUsuarios, setTablaUsuarios]= useState([]);
    const [profesor, setProfesor]= useState([]);
    const [usuariosRut, setUsuariosRut]= useState([]);

    const [busqueda, setBusqueda]= useState('');
    const [filtro, setFiltro] = useState("nombre")
    
    const peticionGet = async () => {
        try {
        // Realiza la solicitud para obtener profesores   
            const responseProfe = await getProfesores();
            setProfesor(responseProfe.data);
            
            const responseUser = await getUsuarios();
            setUsuarios(responseUser.data);
            setTablaUsuarios(responseUser.data);

            const responseUserRut = await getUsuariosRut();
            setUsuariosRut(responseUserRut.data)

        } catch (error) {
            console.log(error);

        }
    };

    const handleChange=e=>{
        setBusqueda(e.target.value);
        filtrar(e.target.value);
      }

    const filtrar=(terminoBusqueda)=>{
      let resultadosBusqueda = null
      if (filtro == "nombre") {
        resultadosBusqueda=tablaUsuarios.filter((elemento)=>{
          if(elemento.first_name.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())) {
            return elemento
            setUsuarios(resultadosBusqueda);
          }   
        });
      }

      /*if (filtro == "rut") {
        resultadosBusqueda = usuariosRut.filter((elemento)=>{
          if(elemento.rut.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())) {
            return elemento
            setUsuariosRut(resultadosBusqueda)
          }  
        });
      }*/ //AUN NO FUNCIONA, DEJENLO MORIR NOMAS

        setUsuarios(resultadosBusqueda);
    }

    const disponibilidad = (horarioDiurno, horarioVespertino) => {
      let disponible = false
      
      const horarioD = JSON.parse(horarioDiurno)
      horarioD.forEach((fila) => {
        fila.map((columna) => {
          if (columna == 1) {
            disponible = true
          }
        })
      })
      
      const horarioV = JSON.parse(horarioVespertino)
      horarioV.forEach((fila) => {
        fila.map((columna) => {
          if (columna == 1) {
            disponible = true
          }
        })
      })

      if (disponible) {
        return <i className="fa fa-check-circle text-success mx-auto"></i>
      } else {
        return <i className="fa fa-times-circle rounded text-danger mx-auto"></i>
      }
    }
    
    useEffect(()=>{
        peticionGet();
    },[])

    const navigate = useNavigate()
    const info = useLocation()
    //console.log(info);
    return(
        <div className="container rounded mt-4 shadow col-10" style={{border: 'solid 3px #A90429'}}>
          <div className="row justify-content-center p-2 mb-3" style={{background:'#03102C', color:'white', fontSize: 22}}>
            Planificar Horario a Docentes
          </div>
  
            <div className="row m-2">
              <div className="input-group-prepend">
                <select className="form-control" id="sel1" style={{background: '#A90429', color:'white'}} onChange={e => setFiltro(e.target.value)}>
                <option value={"nombre"}>Nombre</option>
                {/*<option value={"rut"}>RUT</option>
                <option value={"carrera"}>Carrera</option>*/}
              </select>
              </div>
              <input className="form-control inputBuscar text-center flex-grow-1" value={busqueda} placeholder={`Buscar por ${filtro}`} onChange={handleChange}/>
            </div>

          <div className="table-responsive" style={{height:'70vh'}}>
            <table className="table table-sm table-striped table-bordered table-hover">
              <thead className="sticky-top">
                <tr style={{background: 'gray', color:'white', textAlign: 'center'}}>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Rut</th>
                  <th>Carrera</th>
                  <th>Departamento</th>
                  <th>Jornada</th>
                  <th>Disponibilidad</th>
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
                        <div onClick={() => navigate(`/Administrativos/buscar-profesor/${profesor.id}`, {state:{data: info.state.data}})} style={{color: 'black', fontWeight: 'bold', cursor:'pointer'}}>
                          {usuarioCorrespondiente ? usuarioCorrespondiente.first_name : 'N/A'}
                        </div>
                      </td>
                      <td>{usuarioRutCorrespondiente ? usuarioRutCorrespondiente.rut : 'N/A'}</td>
                      <td>{profesor.carrera}</td>
                      <td>{profesor.departamento}</td>
                      <td>{profesor.jornada}</td>
                      <td>{profesor && disponibilidad(profesor.horarioDiurno, profesor.horarioVespertino)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="row justify-content-end">
            <Link className="btn m-2" to={'/db-management'} style={{background: '#A90429', color:'white'}}>DB MANAGEMENT<i className="fa fa-database ml-1"/></Link>
          </div>
        </div>
    );
}
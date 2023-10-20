import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import "../../../css/barraBuscadora.css"
import axios from "axios";

export function BarraBuscadora(){

    const [usuarios, setUsuarios]= useState([]);
    const [tablaUsuarios, setTablaUsuarios]= useState([]);
    const [busqueda, setBusqueda]= useState('');

    const peticionGet=async()=>{
        await axios.get('https://my-json-server.typicode.com/doncornejo27/probarAPI/contenido')
        .then(response=>{
            setUsuarios(response.data);
            setTablaUsuarios(response.data);
            console.log(usuarios);
        }).catch(error=>{
            console.log(error);
        })
    }

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
            <hr/>
            <div className="containerInput">
                <input 
                    className="form-control inputBuscar"
                    value={busqueda}
                    placeholder="Busqueda por Nombre o Rut"
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
                            <th>Jornada Diurna</th>
                            <th>Jornada Vespertina</th>
                        </tr>
                    </thead>

                    <tbody>
                        {usuarios &&
                        usuarios.map((usuario)=>(
                            <tr key={usuario.id}>
                                <td>{usuario.id}</td>
                                <td>
                                    <Link to={`/Administrativos/buscar-profesor/${usuario.id}`}>{usuario.name}
                                    </Link>
                                </td>
                                <td>{usuario.rut}</td>
                                <td>{usuario.carrera}</td>
                                <td>{usuario.departamento}</td>
                                <td>{usuario.jornada.diurna}</td>
                                <td>{usuario.jornada.vespertina}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>        
        </div>
    );
}
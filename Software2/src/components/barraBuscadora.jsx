import { useEffect, useState } from "react";
import "../css/barraBuscadora.css"
import axios from "axios";

export function BarraBuscadora(){

    const [usuarios, setUsuarios]= useState([]);
    const [tablaUsuarios, setTablaUsuarios]= useState([]);
    const [busqueda, setBusqueda]= useState('');

    const peticionGet=async()=>{
        await axios.get('https://jsonplaceholder.typicode.com/users')
        .then(response=>{
            setUsuarios(response.data);
            setTablaUsuarios(response.data);
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
            || elemento.company.name.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
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
                    placeholder="Busqueda por Nombre o Empresa"
                    onChange={handleChange}
                />
            </div>
            <div className="table-responsive">
                <table className="table table-sm table-bordered">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Telefono</th>
                            <th>Nombre de Usuario</th>
                            <th>Correo</th>
                            <th>Sitio Web</th>
                            <th>Ciudad</th>
                            <th>Empresa</th>
                        </tr>
                    </thead>

                    <tbody>
                        {usuarios &&
                        usuarios.map((usuario)=>(
                            <tr key={usuario.id}>
                                <td>{usuario.id}</td>
                                <td>{usuario.name}</td>
                                <td>{usuario.phone}</td>
                                <td>{usuario.username}</td>
                                <td>{usuario.email}</td>
                                <td>{usuario.website}</td>
                                <td>{usuario.address.city}</td>
                                <td>{usuario.company.name}</td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>        
        </div>
    );
}
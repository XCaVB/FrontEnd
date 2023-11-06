import React, { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import "../../../css/Pages.css";
import { getProfesores, getUsuarios } from '../../../api/horario.api';

export function EdicionHoraria() {
    const { id } = useParams();
    const usuarioId = parseInt(id);
    const [usuarios, setUsuarios] = useState([]);
    const [tablaUsuarios, setTablaUsuarios] = useState([]);
    const [profesor, setProfesor] = useState([]);
    const [busqueda, setBusqueda] = useState('');;


    const peticionGet = async () => {
        try {
            const responseUser = await getUsuarios();
            setUsuarios(responseUser.data)
            console.log(responseUser.data)

            const responseProfe = await getProfesores();
            setProfesor(responseProfe.data);
            console.log(responseProfe.data);



        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleChange = e => {
        setBusqueda(e.target.value);
        filtrar(e.target.value);
    };

    const filtrar = terminoBusqueda => {
        var resultadosBusqueda = tablaUsuarios.filter(elemento => {
            if (elemento.username.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())) {
                return elemento;
            }
        });
        setTablaUsuarios(resultadosBusqueda);
    };
    
    useEffect(() => {
        peticionGet();

    }, [id]);

    return (
        <div>
            <div className='contenedorPrincipal'>
                <div className='horarioProfesor'>
                    <div className='d-flex'>
                        <h1 className='col-11'>Asignacion al profesor {}</h1>
                        <button onClick={()=>{console.log()}}></button>
                        <button className="btn paginaSecretarioDerecha col-1"><Link to={`/Administrativos/buscar-profesor/${id}/`} style={{ color: "white" }}>Volver Atras</Link></button>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className='col-6'>
                    <div className="d-flex p-2 justify-content-center">
                        <input
                            className="form-control inputBuscar text-center"
                            value={busqueda}
                            placeholder="Búsqueda por Nombre"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="table-responsive">
                    <table className="table table-sm table-bordered">
                        <thead className='text-center'>
                            <tr>
                                <th>ID</th>
                                <th>Curso</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                    </div>
                </div>
                <div className='col-6'>
                    <div className='container'>
                        <div className="table-responsive">
                            <table className="table table-sm table-bordered">
                                <thead className='text-center'>
                                    <tr>
                                        <th>Asignaturas Inscritas</th>
                                        <th>Acción</th> {/* Columna para el botón de eliminación */}
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className='text-center'>
                        <button onClick={()=>{}}>Guardar Cambios</button>
                    </div>
                    <hr/>
                    <div className='container'>
                        <div className="table-responsive">
                            <table className="table table-sm table-bordered">
                                <thead className='text-center'>
                                    <tr>
                                        <th>Asignaturas Previamente Inscritas</th>
                                        <th>Acción</th> {/* Columna para el botón de eliminación */}
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
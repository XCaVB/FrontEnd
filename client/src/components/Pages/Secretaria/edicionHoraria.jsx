import React, { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import "../../../css/Pages.css";
import { getProfesores, getUsuarios, getCurso, getPlanificacionAcad, createPlanificacionAcad, deletePlanificacionAcad} from '../../../api/horario.api';

export function EdicionHoraria() {
    const { id } = useParams();
    const usuarioId = parseInt(id);
    const [usuarios, setUsuarios] = useState([]);
    const [profesor, setProfesor] = useState([]);
    const [busqueda, setBusqueda] = useState('');

    const [cursos, setCursos] = useState([]);
    const [cursosDisponibles, setCursosDisponibles] = useState([]);
    const [cursosSeleccionados, setCursosSeleccionados] = useState([]);
    const [cursosToShow, setCursosToShow] = useState(10);
    const cursosToShowIncrement = 10;
    const [cursosOriginales, setCursosOriginales] = useState([]); // Mantenemos una copia de los cursos originales

    const [planificacionAcad, setPlanificacionAcad] = useState([]);
    const [cursoPeriodos, setCursoPeriodos] = useState({});
    const [cursoJornada, setCursoJornada] = useState({});
    const [cursoActividad, setCursoActividad] = useState({});

    const peticionGet = async () => {
        try {
            const responseUser = await getUsuarios();
            setUsuarios(responseUser.data);

            const responseProfe = await getProfesores();
            setProfesor(responseProfe.data);

            const responseCurso = await getCurso();
            const cursosData = responseCurso.data;
            setCursosOriginales(cursosData); // Almacenamos la copia de los cursos originales
            setCursos(cursosData);
            setCursosDisponibles(cursosData);

            const responsePlanificacionAcad = await getPlanificacionAcad();
            setPlanificacionAcad(responsePlanificacionAcad.data)

        } catch (error) {
            console.error('Error:', error);
        }
    };

    const filtrar = terminoBusqueda => {
        const resultadosBusqueda = cursosOriginales.filter(elemento => {
            const cumpleTerminoBusqueda = elemento.nombreAsignatura.toLowerCase().includes(terminoBusqueda.toLowerCase());
            const yaSeleccionado = cursosSeleccionados.some(curso => curso.id === elemento.id);
            return cumpleTerminoBusqueda && !yaSeleccionado;
        });
    
        // Solo recalcular la lista de cursos disponibles si el término de búsqueda ha cambiado o si el usuario ha hecho clic en el botón "Mostrar más cursos"
        if (terminoBusqueda !== this.state.busqueda || this.state.mostrarMasCursos) {
            setCursosDisponibles(resultadosBusqueda);
        }
    
        const resultadosSeleccionados = cursosSeleccionados.filter(elemento => {
            return elemento.nombreAsignatura.toLowerCase().includes(terminoBusqueda.toLowerCase());
        });
        setCursosSeleccionados(resultadosSeleccionados);
    };
    

    const handleChange = e => {
        setBusqueda(e.target.value);
        filtrar(e.target.value);
    };

    const agregarCurso = (curso, periodo, jornada, actividad) => {
        const cursoConTipo = { ...curso, periodo, jornada, actividad };
        setCursosSeleccionados([...cursosSeleccionados, cursoConTipo]);
      
        const cursosRestantes = cursosDisponibles.filter((c) => c.id !== curso.id);
        setCursosDisponibles(cursosRestantes);
      };
      

    const eliminarCurso = (curso) => {
        // Filtra la lista de cursos seleccionados para mantener todos los cursos excepto el que se va a eliminar.
        const cursosRestantes = cursosSeleccionados.filter((c) => c.id !== curso.id);
        setCursosSeleccionados(cursosRestantes);
      
        // Agrega el curso nuevamente a la lista de cursos disponibles.
        setCursosDisponibles([...cursosDisponibles, curso]);
      };

    const getCursoDetails = (cursoId) => {
        const cursoEncontrado = cursos.find((curso) => curso.id === cursoId);
        return cursoEncontrado || {};
    };

    const handlePeriodoChange = (cursoId, periodo) => {
        setCursoPeriodos({ ...cursoPeriodos, [cursoId]: periodo });
      };
    const handleJornadaChange = (cursoId, jornada) => {
        setCursoJornada({ ...cursoJornada, [cursoId]: jornada });
    };
    const handleActividadChange = (cursoId, actividad) => {
        setCursoActividad({ ...cursoActividad, [cursoId]: actividad });
    };
    

    const guardarCambiosAPI = async () => {
        for (const cursoSeleccionado of cursosSeleccionados) {
            const { id, periodo, actividad, jornada } = cursoSeleccionado;
    
            // Verificar si ya existe una planificación académica para el profesor, curso, período, actividad y jornada seleccionados.
            const planificacionExistente = planificacionAcad.find(item => {
                return item.profesor === usuarioId && item.curso === id && item.periodo === "202310" && item.periodo === "202305" && item.actividad === actividad && item.jornada === jornada;
            });
    
            console.log(planificacionExistente);
    
            if (!planificacionExistente) {
                // Si no existe una planificación, crear una nueva utilizando la función createPlanificacionAcad
                try {
                    const periodoNuevo = periodo === "Semestral" ? 202310 : periodo === "Trimestral" ? 202305 : periodo;
    
                    await createPlanificacionAcad({
                        periodo: periodoNuevo,
                        actividad: actividad, // Reemplaza esto con el valor correcto
                        jornada: jornada, // Reemplaza esto con el valor correcto
                        modulos: 'Null',
                        profesor: usuarioId,
                        curso: id,
                    });
    
                    // Refrescar la lista de planificaciones académicas después de crear una nueva
                    const responsePlanificacionAcad = await getPlanificacionAcad();
                    setPlanificacionAcad(responsePlanificacionAcad.data);
                    alert("Cambios guardados");
                } catch (error) {
                    alert('Error al crear la planificación académica:', error);
                }
            }
        }
    };

    const eliminarCursoAPI = async (planificacionId) => {
        try {
            // Llamada a la API para eliminar la planificación académica por su ID
            await deletePlanificacionAcad(planificacionId);
    
            // Actualizar la lista de planificaciones académicas después de eliminar
            const responsePlanificacionAcad = await getPlanificacionAcad();
            setPlanificacionAcad(responsePlanificacionAcad.data);
    
            // Mostrar un mensaje o realizar otras acciones necesarias después de eliminar
            alert("Curso eliminado exitosamente");
        } catch (error) {
            // Manejar el error, mostrar un mensaje de error, etc.
            console.error('Error al eliminar la planificación académica:', error);
        }
    };
    

    useEffect(() => {
        peticionGet();
    }, [id]);

    return (
        <div>
            <div className='contenedorPrincipal'>
                <div className='horarioProfesor'>
                    <div className='d-flex'>
                        <h1 className='col-11'>Asignación al profesor{' '}
                            {profesor.map((item) => {
                                if (item.id === usuarioId) {
                                    const usuarioAsociado = usuarios.find(usuario => usuario.id === item.user);
                                    return usuarioAsociado ? usuarioAsociado.username : '';
                                }
                                return null;
                            })}
                        </h1>
                        <button className="btn paginaSecretarioDerecha col-1"><Link to={`/Administrativos/buscar-profesor/${id}/`} style={{ color: "white" }}>Volver Atras</Link>
                        </button>
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
                    <div className='text-center'>ASIGNATURAS PARA INSCRIBIR</div>
                    <div className="table-responsive">
                        <table className="table table-sm table-bordered">
                            <thead className='text-center'>
                                <tr>
                                    <th>Materia</th>
                                    <th>Curso</th>
                                    <th>Asignatura</th>
                                    <th>Periodo</th>
                                    <th>Jornada</th>
                                    <th>Actividad</th>
                                    <th>Acción</th>
                                </tr>
                            </thead>
                            <tbody>
                            {cursosDisponibles
                                .filter((curso) => curso.nombreAsignatura.toLowerCase().includes(busqueda.toLowerCase()))
                                .slice(0, cursosToShow)
                                .map((curso) => (
                                <tr key={curso.id}>
                                    <td className="text-center">{curso.materia}</td>
                                    <td className="text-center">{curso.Curso}</td>
                                    <td className="text-center">{curso.nombreAsignatura}</td>
                                    <td className="text-justify">
                                        <label>
                                            <input
                                                type="radio"
                                                name={`periodo-${curso.id}`}
                                                value="Semestral"
                                                checked={cursoPeriodos[curso.id]?.includes("Semestral")}
                                                onChange={() => handlePeriodoChange(curso.id, "Semestral")}
                                            />
                                            Semestral
                                        </label>
                                        <label>
                                            <input
                                                type="radio"
                                                name={`periodo-${curso.id}`}
                                                value="Trimestral"
                                                checked={cursoPeriodos[curso.id]?.includes("Trimestral")}
                                                onChange={() => handlePeriodoChange(curso.id, "Trimestral")}
                                            />
                                            Trimestral
                                        </label>
                                    </td>
                                    <td className="text-justify">
                                        <label>
                                            <input
                                                type="radio"
                                                name={`jornada-${curso.id}`}
                                                value="Diurno"
                                                checked={cursoJornada[curso.id]?.includes("Diurno")}
                                                onChange={() => handleJornadaChange(curso.id, "Diurno")}
                                            />
                                            Diurno
                                        </label>
                                        <label>
                                            <input
                                                type="radio"
                                                name={`jornada-${curso.id}`}
                                                value="Vespertino"
                                                checked={cursoJornada[curso.id]?.includes("Vespertino")}
                                                onChange={() => handleJornadaChange(curso.id, "Vespertino")}
                                            />
                                            Vespertino
                                        </label>
                                    </td>
                                    <td>
                                        <select
                                            className="form-control"
                                            id="sel1"
                                            onChange={(e) => handleActividadChange(curso.id, e.target.value)}
                                            value={cursoActividad[curso.id] || 'Selecciona'}
                                        >
                                            <option disabled>Selecciona</option>
                                            <option value={"Teoría"}>Teoría</option>
                                            <option value={"Taller"}>Taller</option>
                                            <option value={"Laboratorio"}>Laboratorio</option>
                                            <option value={"Ayudantía"}>Ayudantía</option>
                                            <option value={"Terreno"}>Terreno</option>
                                            <option value={"Apoyo Docente"}>Apoyo Docente</option>
                                        </select>
                                    </td>
                                    <td className="text-center">
                                    <button onClick={() => {
                                        if (!cursoPeriodos[curso.id]) {
                                            alert("Selecciona un Periodo");
                                        } else if (!cursoJornada[curso.id]) {
                                            alert("Selecciona una Jornada");
                                        } else if (!cursoActividad[curso.id]) {
                                            alert("Selecciona una Actividad");
                                        } else {
                                            const periodo = cursoPeriodos[curso.id];
                                            const jornada = cursoJornada[curso.id];
                                            const actividad = cursoActividad[curso.id];
                                            agregarCurso(curso, periodo, jornada, actividad);
                                        }
                                    }}>
                                        Agregar
                                    </button>
                                    </td>
                                </tr>
                                ))
                            }
                            </tbody>
                        </table>
                        {busqueda === '' && (
                            <div className="text-center">
                                <button onClick={() => setCursosToShow(cursosToShow + cursosToShowIncrement)}>
                                    Mostrar más cursos
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                <div className='col-6'>
                    <div className='container'>
                    <div className='text-center'>ASIGNATURAS INSCRITAS</div>
                        <div className="table-responsive">
                            <table className="table table-sm table-bordered">
                                <thead className='text-center'>
                                    <tr>
                                        <th>Materia</th>
                                        <th>Curso</th>
                                        <th>Asignaturas Inscritas</th>
                                        <th>Periodo</th>
                                        <th>Jornada</th>
                                        <th>Actividad</th>
                                        <th>Acción</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cursosSeleccionados.map((curso) => (
                                        <tr key={curso.id}>
                                            <td className='text-center'>{curso.materia}</td>
                                            <td className='text-center'>{curso.Curso}</td>
                                            <td className='text-center'>{curso.nombreAsignatura}</td>
                                            <td className='text-center'>{curso.periodo}</td>
                                            <td className='text-center'>{curso.jornada}</td>
                                            <td className='text-center'>{curso.actividad}</td>
                                            <td className='text-center'>
                                                <button onClick={() => eliminarCurso(curso)}>
                                                    Eliminar
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className='text-center'>
                        <button onClick={guardarCambiosAPI}>Guardar Cambios</button> 
                    </div>
                    <hr/>
                    <div className='container'>
                        <div className="table-responsive">
                            <table className="table table-sm table-bordered">
                                <thead className='text-center'>
                                    <tr>
                                        <th>Materia</th>
                                        <th>Curso</th>
                                        <th>Asignaturas Previas</th>
                                        <th>Periodo</th>
                                        <th>Jornada</th>
                                        <th>Actividad</th>
                                        <th>Acción</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {planificacionAcad.map((item) => {
                                if (item.profesor === usuarioId) {
                                    const cursoDetails = getCursoDetails(item.curso);
                                    return (
                                    <tr key={item.id}>
                                        <td className='text-center'>{cursoDetails.materia}</td>
                                        <td className='text-center'>{cursoDetails.Curso}</td>
                                        <td className='text-center'>{cursoDetails.nombreAsignatura}</td>
                                        <td className='text-center'>{item.periodo}</td>
                                        <td className='text-center'>{item.jornada}</td>
                                        <td className='text-center'>{item.actividad}</td>
                                        <td className='text-center'>
                                            <button onClick={() => eliminarCursoAPI(item.id)}>
                                                Eliminar
                                            </button>
                                        </td>

                                    </tr>
                                    );
                                } else {
                                    return null; // No renderizar elementos que no cumplen con la condición
                                }
                                })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
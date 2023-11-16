import React, { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import "../../../css/Pages.css";
import horario from "../../../data/horarioCalendario"
import horarioBase from '../../../data/horarioBase';
import { getProfesores, getUsuarios, getCurso, getPlanificacionAcad, createPlanificacionAcad, deletePlanificacionAcad} from '../../../api/horario.api';

export function EdicionHoraria() {
    const armar_horario = horario
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

    const [jornadita, setJornadita] = useState();
    const [modalTitle, setModalTitle] = useState('Debes seleccionar una Jornada'); // Título inicial del modal
    const matrizDiurno = horarioBase.horarioDiurnoBase;
    const matrizVespertino = horarioBase.horarioVespertinoBase;

    const [nombreAsignatura, setNombreAsignatura] = useState();

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
    
        // Cambiar el título del modal según la jornada seleccionada
        if (jornada === 'Diurno') {
            setModalTitle('Modulo Diurno');
            setJornadita('Diurno');
        } else if (jornada === 'Vespertino') {
            setModalTitle('Modulo Vespertino');
            setJornadita('Vespertino');
        }
    };
    const handleActividadChange = (cursoId, actividad) => {
        setCursoActividad({ ...cursoActividad, [cursoId]: actividad });
    };
    
    const [horarioD, setHorarioD] = useState();
    const [horarioV, setHorarioV] = useState();
    const [moduloDPlanificacion, setModuloDPlanificacion] = useState([]);
    const [moduloVPlanificacion, setModuloVPlanificacion] = useState();
    const [moduloDCompleto, setModuloDCompleto] = useState();
    const [moduloVCompleto, setModuloVCompleto] = useState();

    useEffect(() => {
    const profesorEncontrado = profesor.find((profesorItem) => profesorItem.id === usuarioId);

    if (profesorEncontrado) {
        setHorarioD(JSON.parse(profesorEncontrado.horarioDiurno));
        setHorarioV(JSON.parse(profesorEncontrado.horarioVespertino));
    }
    }, [profesor, usuarioId]);

    // Función para cerrar el modal y restablecer los modelos
    const cerrarModal = () => {
        // Restablecer modelosVVacios y modelosDVacios
        setModelosVVacios(horarioBase.horarioVespertinoBase);
        setModelosDVacios(horarioBase.horarioDiurnoBase);
    
        // Actualizar horarioD y horarioV con los nuevos modelos
        if (jornadita === 'Diurno') {
            setHorarioD(horarioBase.horarioDiurnoBase);
        } else if (jornadita === 'Vespertino') {
            setHorarioV(horarioBase.horarioVespertinoBase);
        }
    };

    const guardarEnModuloDPlanificacion = () => {
        // Copia de modelosDVacios para su almacenamiento en moduloDPlanificacion
        const nuevosModelosD = { ...modelosDVacios };
    
        // Agregar nuevos modelos en el estado `moduloDPlanificacion`
        setModuloDPlanificacion(nuevosModelosD);
        if (jornadita === 'Diurno') {
            setHorarioD(horarioBase.horarioDiurnoBase);
            console.log(nuevosModelosD)
            console.log('asd')
            console.log(modelosDVacios)
        } else if (jornadita === 'Vespertino') {
            setHorarioV(horarioBase.horarioVespertinoBase);
        }
    };

    // Estado para modelos diurnos y vespertinos
    const [modelosDVacios, setModelosDVacios] = useState({});
    const [modelosVVacios, setModelosVVacios] = useState({});

    // Función para asignar modelo diurno
    const asignarModeloDVacio = (cursoId, nuevaMatriz) => {
        setModelosDVacios(prevModelos => ({
            ...prevModelos,
            [cursoId]: nuevaMatriz
        }));
    };

    // Función para asignar modelo vespertino
    const asignarModeloVVacio = (cursoId, nuevaMatriz) => {
        setModelosVVacios(prevModelos => ({
            ...prevModelos,
            [cursoId]: nuevaMatriz
        }));
    };

    const ColorHorario = (props) => {
        const [color, setColor] = useState(() => {
            if (props.estado === 0) {
                return 'white';
            } else if (props.estado === 1) {
                return 'green';
            } else if (props.estado === 2) {
                return 'red';
            }
        });
    
        useEffect(() => {
            if (props.estado === 0) {
                setColor('white');
            } else if (props.estado === 1) {
                setColor('green');
            } else if (props.estado === 2) {
                setColor('red');
            }
        }, [props.estado]);

        const [presionado, setPresionado] = useState(()=>{
            if (props.asignar > 0){
                return ''
            }
        })
    
        const asignarCursoEnMatriz = () => {
            const cursoSeleccionado = cursos.find((curso) => curso.id === props.asignar);
            if (cursoSeleccionado) {
              setNombreAsignatura(cursoSeleccionado.nombreAsignatura);
            }
        
            if (props.jornadas === 'Vespertino') {
              const nuevaMatrizVespertino = [...horarioV];
              nuevaMatrizVespertino[props.fila][props.columna] = props.asignar;
              asignarModeloVVacio(props.asignar, nuevaMatrizVespertino);
            } else if (props.jornadas === 'Diurno') {
              const nuevaMatrizDiurno = [...horarioD];
              nuevaMatrizDiurno[props.fila][props.columna] = props.asignar;
              asignarModeloDVacio(props.asignar, nuevaMatrizDiurno);
            }
          };
        
          return (
            <div
              className="p-4 w-90 h-90"
              onClick={asignarCursoEnMatriz}
              style={{ background: color, cursor: 'pointer' }}
            >
            </div>
          );
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
                                    return usuarioAsociado ? usuarioAsociado.first_name : '';
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
                                    <th>Modulo</th>
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
                                    <td>
                                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target={`.modal-${curso.id}`}>
                                    Ingreso Horario
                                    </button>
                                    <div class={`modal fade modal-${curso.id}`} tabindex="-1" role="dialog" aria-labelledby={`modalLabel-${curso.id}`} aria-hidden="true">
                                        <div class="modal-dialog modal-xl">
                                            <div class="modal-content">
                                                <div className="modal-header">
                                                    <h5 className="modal-title" id="exampleModalLabel">{modalTitle}</h5>
                                                </div>
                                                <div className="modal-body">
                                                    {/* Contenido del modal */}
                                                    <div id="collapseOne" className="collapse show" data-parent="#accordion">
                                                    <div className="card-body">
                                                    <div className="container p-0 col-10" style={{border: '10px solid #03102C', borderCollapse: 'collapse', height: '60vh', overflowY: 'auto'}}>
                                                        <table className="table-fixed table table-bordered">
                                                        <thead className="sticky-top">
                                                            <tr style={{background: 'gray', color:'white', textAlign: 'center'}}>
                                                            <th scope="col" style={{ width: '16%' }}>Hora</th>
                                                            <th scope="col" style={{ width: '14%' }}>Lunes</th>
                                                            <th scope="col" style={{ width: '14%' }}>Martes</th>
                                                            <th scope="col" style={{ width: '14%' }}>Miércoles</th>
                                                            <th scope="col" style={{ width: '14%' }}>Jueves</th>
                                                            <th scope="col" style={{ width: '14%' }}>Viernes</th>
                                                            <th scope="col" style={{ width: '14%' }}>Sabado</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                        {jornadita === 'Vespertino' ? (
                                                            armar_horario.horarioV.map((fila, index) => (
                                                                <tr key={index}>
                                                                <td style={{background:'gray', color:'white', textAlign:'center'}}>{fila.hora}</td>
                                                                <td className="p-1 "><ColorHorario estado={horarioV[index][0]}
                                                                asignar={curso.id}
                                                                jornadas={jornadita}
                                                                fila={index} columna={0}
                                                                modulo={modelosVVacios[curso.id]}/>
                                                                </td>
                                                                <td className="p-1 "><ColorHorario estado={horarioV[index][1]}
                                                                asignar={curso.id}
                                                                jornadas={jornadita}
                                                                fila={index} columna={1}
                                                                modulo={modelosVVacios[curso.id]}/>
                                                                </td>
                                                                <td className="p-1 "><ColorHorario estado={horarioV[index][2]}
                                                                asignar={curso.id}
                                                                jornadas={jornadita}
                                                                fila={index} columna={2}
                                                                modulo={modelosVVacios[curso.id]}/>
                                                                </td>
                                                                <td className="p-1 "><ColorHorario estado={horarioV[index][3]}
                                                                asignar={curso.id}
                                                                jornadas={jornadita}
                                                                fila={index} columna={3}
                                                                modulo={modelosVVacios[curso.id]}/>
                                                                </td>
                                                                <td className="p-1 "><ColorHorario estado={horarioV[index][4]}
                                                                asignar={curso.id}
                                                                jornadas={jornadita}
                                                                fila={index} columna={4}
                                                                modulo={modelosVVacios[curso.id]}/>
                                                                </td>
                                                                <td className="p-1 "><ColorHorario estado={horarioV[index][5]}
                                                                asignar={curso.id}
                                                                jornadas={jornadita}
                                                                fila={index} columna={5}
                                                                modulo={modelosVVacios[curso.id]}/>
                                                                </td>
                                                                </tr>
                                                            ))
                                                        ) : (
                                                            jornadita === 'Diurno' && (
                                                            armar_horario.horarioD.map((fila, index) => (
                                                                <tr key={index}>
                                                                <td style={{background:'gray', color:'white', textAlign:'center'}}>{fila.hora}</td>
                                                                <td className="p-1 "><ColorHorario estado={horarioD[index][0]}
                                                                asignar={curso.id}
                                                                jornadas={jornadita}
                                                                fila={index} columna={0}
                                                                modulo={modelosDVacios[curso.id]}/>
                                                                </td>
                                                                <td className="p-1 "><ColorHorario estado={horarioD[index][1]}
                                                                asignar={curso.id}
                                                                jornadas={jornadita}
                                                                fila={index} columna={1}
                                                                modulo={modelosDVacios[curso.id]}/>
                                                                </td>
                                                                <td className="p-1 "><ColorHorario estado={horarioD[index][2]}
                                                                asignar={curso.id}
                                                                jornadas={jornadita}
                                                                fila={index} columna={2}
                                                                modulo={modelosDVacios[curso.id]}/>
                                                                </td>
                                                                <td className="p-1 "><ColorHorario estado={horarioD[index][3]}
                                                                asignar={curso.id}
                                                                jornadas={jornadita}
                                                                fila={index} columna={3}
                                                                modulo={modelosDVacios[curso.id]}/>
                                                                </td>
                                                                <td className="p-1 "><ColorHorario estado={horarioD[index][4]}
                                                                asignar={curso.id}
                                                                jornadas={jornadita}
                                                                fila={index} columna={4}
                                                                modulo={modelosDVacios[curso.id]}/>
                                                                </td>
                                                                <td className="p-1 "><ColorHorario estado={horarioD[index][5]}
                                                                asignar={curso.id}
                                                                jornadas={jornadita}
                                                                fila={index} columna={5}
                                                                modulo={modelosDVacios[curso.id]}/>
                                                                </td>
                                                                </tr>
                                                            ))
                                                            )
                                                        )}
                                                        </tbody>
                                                        </table>
                                                    </div>
                                                    </div>
                                                </div>
                                                </div>
                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-secondary" onClick={cerrarModal} data-dismiss="modal">
                                                        Cancelar
                                                    </button>
                                                    <button type="button" className="btn btn-primary" data-dismiss="modal">
                                                        Guardar
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
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
                                            guardarEnModuloDPlanificacion();
                                            
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
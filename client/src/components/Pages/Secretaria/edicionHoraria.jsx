import React, { useEffect, useState } from 'react';
import { getProfesores, getUsuariosID, getCurso, getProfesorCurso, getCursoID, updateCursosHorario, getProfesorCursoID, getProfesoresID } from "../../../api/horario.api";
import { Link, useParams } from "react-router-dom";
import "../../../css/Pages.css";

export function EdicionHoraria() {
    const { id } = useParams();
    const usuarioId = parseInt(id);
    const [usuarios, setUsuarios] = useState([]);
    const [usuarios2, setUsuarios2] = useState([]);
    const [busqueda, setBusqueda] = useState('');

    const [profesor, setProfesor] = useState('');

    const [cursosALL, setCursosALL] = useState([]);
    const [profesorCursos, setProfesorCursos] = useState([]);
    const [cursos, setCursos] = useState([]);

    const [cursosSeleccionados, setCursosSeleccionados] = useState([]); // Nueva variable de estado
    const [cursosSeleccionadosIDs, setCursosSeleccionadosIDs] = useState([]);

    const [mostrarAsignaturasPrevias, setMostrarAsignaturasPrevias] = useState(true);

    const peticionGet = async () => {
        try {
            const responseProfesorCurso = await getProfesorCurso();
            setProfesorCursos(responseProfesorCurso.data);

            const responseCurso = await getCurso();
            setCursosALL(responseCurso.data);

            for (const profesorCurso of responseProfesorCurso.data) {
                if (profesorCurso.profesor === usuarioId) {
                    const responseCurso = await getCursoID(profesorCurso.curso);
                    setCursos(responseCurso.data);
                    console.log(cursos)

                    break; // Puedes salir del bucle una vez que encuentres una coincidencia
                }
            }

            // Utiliza la función correspondiente para obtener la información del profesor.
            const responseProfesor = await getProfesores();

            // Realiza la comprobación de usuarioId en los datos obtenidos por getProfesores
            for (const profesor of responseProfesor.data) {
                if (profesor.id === usuarioId) {
                    setUsuarios2(responseProfesor.data);
                    break; // Puedes salir del bucle una vez que encuentres una coincidencia
                }
            }
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
            if (elemento.name.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())) {
                return elemento;
            }
        });
        setUsuarios(resultadosBusqueda);
    };

    const handleCourseSelection = cursoSeleccionado => {
        if (!cursosSeleccionadosIDs.includes(cursoSeleccionado.id)) {
            // Agrega el curso solo si no está seleccionado
            setCursosSeleccionados([...cursosSeleccionados, cursoSeleccionado]);
            setCursosSeleccionadosIDs([...cursosSeleccionadosIDs, cursoSeleccionado.id]);
        }
    };

    const handleCourseRemoval = cursoRemovido => {
        // Filtra los cursos seleccionados para excluir el curso eliminado
        const nuevosCursosSeleccionados = cursosSeleccionados.filter(curso => curso.id !== cursoRemovido.id);
        setCursosSeleccionados(nuevosCursosSeleccionados);
    
        const nuevosCursosIDs = cursosSeleccionadosIDs.filter(cursoID => cursoID !== cursoRemovido.id);
        setCursosSeleccionadosIDs(nuevosCursosIDs);
    };

    const handleCourseRemovalPrevio = (cursoRemovido) => {
        // Filtra los cursos seleccionados para excluir el curso eliminado
        const nuevosCursosSeleccionados = cursosSeleccionados.filter(curso => curso.id !== cursoRemovido.id);
        setCursosSeleccionados(nuevosCursosSeleccionados);
    
        const nuevosCursosIDs = cursosSeleccionadosIDs.filter(cursoID => cursoID !== cursoRemovido.id);
        setCursosSeleccionadosIDs([...cursosSeleccionadosIDs, cursoRemovido.id]);
        setCursosSeleccionadosIDs(nuevosCursosIDs);
        setMostrarAsignaturasPrevias(false);
    };

    const handleGuardarCambios = async () => {
        try {
            // Verifica si el profesor existe
            if (!usuarioId) {
                console.error('Profesor no encontrado.');
                return;
            }
    
            // Filtra el profesor-curso para encontrar el registro correspondiente
            const profesorCursoActual = profesorCursos.find(item => item.profesor === usuarioId);
    
            if (!profesorCursoActual) {
                console.error('Registro de profesor-curso no encontrado.');
                return;
            }
    
            // Asegúrate de que haya exactamente un curso seleccionado
            if (cursosSeleccionados.length < 1) {
                console.error('Debes seleccionar exactamente un curso como clave primaria.');
                return;
            }
    
            // Toma el ID del curso seleccionado como clave primaria
            const cursoSeleccionadoID = cursosSeleccionados[0].id;
    
            // Actualiza el registro de profesor-curso con el curso seleccionado como clave primaria
            profesorCursoActual.curso = cursoSeleccionadoID;
    
            // Llama a la función de actualización
            await updateCursosHorario(profesorCursoActual.id, profesorCursoActual);
            window.alert("Cursos actualizados con éxito :)")
    
        } catch (error) {
            console.error('Error al guardar la clave primaria:', error);
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
                        <h1 className='col-11'>Asignacion al profesor {usuarios.name}</h1>
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
                        {cursosALL.map((curso) => (
                            <tr key={curso.id}>
                                <td className='text-center'>{curso.id}</td>
                                <td className='text-center'>
                                    <button onClick={() => {
                                        handleCourseSelection(curso);
                                    }}>
                                        {curso.nombreAsignatura}
                                    </button>
                                </td>
                            </tr>
                        ))}
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
                                    {cursosSeleccionados.map((curso, index) => (
                                        <tr key={index}>
                                            <td className='text-center'>{curso.nombreAsignatura}</td>
                                            <td className='text-center'>
                                                <button onClick={() => {
                                                    handleCourseRemoval(curso);
                                                }}>
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
                        <button onClick={handleGuardarCambios}>Guardar Cambios</button>
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
                                {mostrarAsignaturasPrevias && (
                                    <tr key={cursos.id}>
                                        <td className='text-center'>{cursos.nombreAsignatura}</td>
                                        <td className='text-center'>
                                            <button onClick={() => {
                                                handleCourseRemovalPrevio(cursos);
                                            }}>
                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
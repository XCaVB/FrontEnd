import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from "react-router-dom";
import "../../../css/Pages.css";
import horario from "../../../data/horarioCalendario"
import horarioBase from '../../../data/horarioBase';
import { getProfesores, getUsuarios, getCurso, getPlanificacionAcad, createPlanificacionAcad, deletePlanificacionAcad, updateProfesor} from '../../../api/horario.api';

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
    const [cursosOriginales, setCursosOriginales] = useState([]); // Mantenemos una copia de los cursos originales

    const [planificacionAcad, setPlanificacionAcad] = useState([]);
    const [cursoPeriodos, setCursoPeriodos] = useState({});
    const [cursoJornada, setCursoJornada] = useState({});
    const [cursoModalidad, setCursoModalidad] = useState({});
    const [cursoActividad, setCursoActividad] = useState({});

    const [jornadita, setJornadita] = useState();
    const [modalTitle, setModalTitle] = useState('Debes seleccionar una Jornada'); // Título inicial del modal

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

    const agregarCurso = (curso, periodo, jornada, actividad, modalidad) => {
        const cursoConTipo = { ...curso, periodo, jornada, actividad, modalidad};
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
    const handleModalidadChange = (cursoId, modalidad) => {
        setCursoModalidad({ ...cursoModalidad, [cursoId]: modalidad });
    };
    const [horarioD, setHorarioD] = useState();
    const [horarioV, setHorarioV] = useState();
    const [modelosLlamadaD, setModelosLlamadaD] = useState();
    const [modelosLlamadaV, setModelosLlamadaV] = useState();

    useEffect(() => {
    const profesorEncontrado = profesor.find((profesorItem) => profesorItem.id === usuarioId);

    if (profesorEncontrado) {
        setHorarioD(horarioBase.horarioDiurnoBase);
        setHorarioV(horarioBase.horarioVespertinoBase);
        setModelosLlamadaD(JSON.parse(profesorEncontrado.modulosDiurno))
        setModelosLlamadaV(JSON.parse(profesorEncontrado.modulosVespertino))
    }
    }, [profesor, usuarioId]);
    
    const asignarModulosExistente = ()=>{
        setHorarioD(profesor[usuarioId-1].modulosDiurno)
        setHorarioV(profesor[usuarioId-1].modulosVespertino)
    }
    // Estado para modelos diurnos y vespertinos
    const [modelosDVacios, setModelosDVacios] = useState({});
    const [modelosVVacios, setModelosVVacios] = useState({});

    // Función para asignar modelo diurno
    const asignarModeloDVacio = (nuevaMatriz) => {
        setModelosDVacios(prevModelos => ({
            ...prevModelos,
            nuevaMatriz
        }));
    };

    // Función para asignar modelo vespertino
    const asignarModeloVVacio = (nuevaMatriz) => {
        setModelosVVacios(prevModelos => ({
            ...prevModelos,
            nuevaMatriz
        }));
    };

    const ColorHorario = (props) => {
        const [color, setColor] = useState(() => {
            if (props.estado === 0) {
                return 'white';
            } else if (props.estado > 0) {
                return 'green';
            }
        });
    
        useEffect(() => {
            if (props.estado === 0) {
                setColor('white');
            } else if (props.estado > 0) {
                setColor('green');
            }
        }, [props.estado]);

        const asignarCursoEnMatriz = () => {
            const cursoSeleccionado = cursos.find((curso) => curso.id === props.asignar);
            if (cursoSeleccionado) {    
                let nuevoHorarioV = modelosLlamadaV;
                let nuevoHorarioD = modelosLlamadaD;

              console.log(nuevoHorarioD)
              if (props.jornadas === 'Vespertino') {
                if (modelosLlamadaV[props.fila][props.columna] === props.asignar) {
                  nuevoHorarioV[props.fila][props.columna] = 0;
                  asignarModeloVVacio(nuevoHorarioV);
                } else {
                    // Verificar si previamente hay un ID de curso asignado mayor a 0 en esa posición
                    if (modelosLlamadaV[props.fila][props.columna] > 0) {
                        alert("Ya hay una asignatura")
                    } else {
                        nuevoHorarioV[props.fila][props.columna] = props.asignar;
                        asignarModeloVVacio(nuevoHorarioV);
                    }
                }
              } else if (props.jornadas === 'Diurno') {
                if (modelosLlamadaD[props.fila][props.columna] === props.asignar) {
                  nuevoHorarioD[props.fila][props.columna] = 0;
                  asignarModeloDVacio(nuevoHorarioD);
                  
                } else {
                    // Verificar si previamente hay un ID de curso asignado mayor a 0 en esa posición
                    if (modelosLlamadaD[props.fila][props.columna] > 0) {
                        alert("Ya hay una asignatura")
                    } else {
                      nuevoHorarioD[props.fila][props.columna] = props.asignar;
                      asignarModeloDVacio(nuevoHorarioD);
                    }
                }
              }
            }
          };

          return (
            <div
              className="p-4 w-90 h-90"
              onClick={asignarCursoEnMatriz}
              style={{ background: color , cursor: 'pointer' }}
            >
                {props.nombreA === props.asignar && <p className='text-light'>{cursos[props.asignar-1].nombreAsignatura}</p>}
            </div>
        );
    };

    //Realizar un sistema que agarre el arreglo de modelosDVacios.nuevaMatriz y valla posicion por posicion sacando numeros desde el 1 hasta 200 y los agrege a otro arreglo en la misma posicion que estaban anterior con el mismo numero.
    // MEJOR EN VEZ DE PASARLO COMO UN ARREGLO DE ARREGLOS, SOLO UN ARRGLO BASADO EN EL ID DEL CURSO DICIENDO ESPECIFICAMENTE EL HORARIO (EJ: LU 1200 - 1730).

    // Función para dividir un arreglo en subarreglos basados en la cantidad de elementos
    // Verifica si el objeto modelosDVacios está definido

    const [nuevasMatricesD, setNuevasMatricesD] = useState({});
    const [arreglosPorMatrizD, setArreglosPorMatrizD] = useState({});
    const MatrizComponentD = () => {
        const dias = ['LU', 'MA', 'MI', 'JU', 'VI', 'SA'];
        const horas = ['8:30 - 9:15', '9:25 - 10:10', '10:20 - 11:05', '11:15 - 12:00', '12:10 - 12:55', '13:05 - 13:50', '14:00 - 14:45', '14:55 - 15:50', '15:50 - 16:35', '16:45 - 17:30', '17:40 - 18:25', '18:35 - 19:20', '19:30 - 20:15', '20:25 - 21:10'];
          // Encuentra los números únicos en la matriz
        const numerosUnicos = [...new Set(modelosDVacios.nuevaMatriz.flat())];

        // Crea un objeto para almacenar las nuevas matrices
        let nuevas_matrices = {};

        // Para cada número único, crea una nueva matriz
        for (let numero of numerosUnicos) {
            if (numero !== 0) {  // Ignora los ceros
            // Crea una copia de la matriz original
            let nuevaMatriz = modelosDVacios.nuevaMatriz.map(fila => fila.slice());
            // Reemplaza todos los números que no sean el número actual con ceros
            nuevaMatriz = nuevaMatriz.map(fila => fila.map(valor => valor === numero ? numero : 0));
            // Almacena la nueva matriz en el objeto
            nuevas_matrices[`${numero}`] = nuevaMatriz;
            }
        }

        // Actualiza el estado de forma síncrona
        setNuevasMatricesD(nuevas_matrices);

        // Crea un arreglo vacío para almacenar los arreglos por matriz
        let nuevosArreglosPorMatriz = {};

        // Recorre cada matriz en nuevasMatrices
        for (let numero in nuevas_matrices) {
            let matriz = nuevas_matrices[numero];
            let nuevoArreglo = [];

            // Recorre cada fila y columna de la matriz
            for (let i = 0; i < matriz.length; i++) {
            for (let j = 0; j < matriz[i].length; j++) {
                // Si el número es mayor a 0, agrega el string correspondiente al arreglo
                if (matriz[i][j] > 0) {
                nuevoArreglo.push(`${dias[j]} ${horas[i]}`);
                }
            }
            }

            // Almacena el arreglo en el objeto por número único
            nuevosArreglosPorMatriz[numero] = nuevoArreglo;
        }

        // Actualiza el estado de forma síncrona
        setArreglosPorMatrizD(nuevosArreglosPorMatriz);

        // Devuelve el estado actualizado
        return arreglosPorMatrizD;
        };

    const [nuevasMatricesV, setNuevasMatricesV] = useState({});
    const [arreglosPorMatrizV, setArreglosPorMatrizV] = useState({});
    const MatrizComponentV = () => {
          // Encuentra los números únicos en la matriz
        const numerosUnicos = [...new Set(modelosDVacios.nuevaMatriz.flat())];
      
          // Crea un objeto para almacenar las nuevas matrices
        let nuevas_matrices = {};
      
          // Para cada número único, crea una nueva matriz
        for (let numero of numerosUnicos) {
            if (numero !== 0) {  // Ignora los ceros
              // Crea una copia de la matriz original
              let nuevaMatriz = modelosDVacios.nuevaMatriz.map(fila => fila.slice());
              // Reemplaza todos los números que no sean el número actual con ceros
              nuevaMatriz = nuevaMatriz.map(fila => fila.map(valor => valor === numero ? numero : 0));
              // Almacena la nueva matriz en el objeto
              nuevas_matrices[`${numero}`] = nuevaMatriz;
            
            }
        };
          // Actualiza el estado con las nuevas matrices
        setNuevasMatricesV(nuevas_matrices);
        const dias = ['LU', 'MA', 'MI', 'JU', 'VI', 'SA'];
        const horas = ['19:00 - 19:45', '19:46 - 20:30', '20:40 - 21:25', '21:26 - 22:10', '22:20 - 23:05', '23:05 - 23:50'];

        let nuevosArreglosPorMatriz = {}; // Objeto para almacenar los arreglos por matriz

        // Recorre cada matriz en nuevasMatrices
        for (let numero in nuevas_matrices) {
            let matriz = nuevas_matrices[numero];
            let nuevoArreglo = [];
    
            // Recorre cada fila y columna de la matriz
            for (let i = 0; i < matriz.length; i++) {
                for (let j = 0; j < matriz[i].length; j++) {
                    // Si el número es mayor a 0, agrega el string correspondiente al arreglo
                    if (matriz[i][j] > 0) {
                        nuevoArreglo.push(`${dias[j]} ${horas[i]}`);
                    }
                }
            }
    
            nuevosArreglosPorMatriz[numero] = nuevoArreglo; // Almacena el arreglo en el objeto por número único
        }
    
        // Actualiza el estado con los nuevos arreglos por matriz
        setArreglosPorMatrizV(nuevosArreglosPorMatriz);
        return arreglosPorMatrizV; // Devuelve el estado actualizado
    };

    const guardarCambiosAPI = async () => {
        let modulosTotal;
        try {
            const profesorActualizado = {
                ...profesor[usuarioId-1], // Copia los datos originales del profesor
                modulosDiurno: JSON.stringify(modelosDVacios.nuevaMatriz),
                modulosVespertino: JSON.stringify(modelosVVacios.nuevaMatriz)
            };
    
            // Llamar a la función updateProfesor con el profesor actualizado
            await updateProfesor(usuarioId, profesorActualizado);
        } catch (error) {
            alert('Error al realizar los cambios al profesor:', error);
        }

        for (const cursoSeleccionado of cursosSeleccionados)    {
            const { id, periodo, actividad, jornada, modalidad } = cursoSeleccionado;
    
            // Verificar si ya existe una planificación académica para el profesor, curso, período, actividad y jornada seleccionados.
            const planificacionExistente = planificacionAcad.find(item => {
                return item.profesor === usuarioId && item.curso === id && item.periodo === "202310" && item.periodo === "202305" && item.actividad === actividad && item.jornada === jornada && item.modalidad === modalidad;
            });
            
            console.log(planificacionExistente);
    
            if (!planificacionExistente) {
                // Si no existe una planificación, crear una nueva utilizando la función createPlanificacionAcad
                try {
                    const periodoNuevo = periodo === "Semestral" ? 202310 : periodo === "Trimestral" ? 202305 : periodo;

                    if (jornada === "Diurno") {
                        modulosTotal = MatrizComponentD(); // Asignar valor a modulosTotal
                    } else if (jornada === "Vespertino") {
                        modulosTotal = MatrizComponentV(); // Asignar otro valor a modulosTotal
                    }
    
                    await createPlanificacionAcad({
                        periodo: periodoNuevo,
                        actividad: actividad, // Reemplaza esto con el valor correcto
                        jornada: jornada, // Reemplaza esto con el valor correcto
                        modulos: JSON.stringify(modulosTotal[id]),
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

    const delCursosModuloD = (cursoid) => {
        const indice = modelosLlamadaD.findIndex((curso) => curso[0] === cursoid);
    
        // Si encuentra el índice, reemplaza los elementos por 0
        if (indice !== -1) {
            modelosLlamadaD[indice] = modelosLlamadaD[indice].map(() => 0);
        }
    
        return modelosLlamadaD;
    };    
    const delCursosModuloV = (cursoid) => {
        const indice = modelosLlamadaV.findIndex((curso) => curso[0] === cursoid);
    
        // Si encuentra el índice, reemplaza los elementos por 0
        if (indice !== -1) {
            modelosLlamadaV[indice] = modelosLlamadaV[indice].map(() => 0);
        }
    
        return modelosLlamadaV;
    };

    const eliminarCursoAPI = async (planificacionId, cursoid) => {
        try {
            // Llamada a la API para eliminar la planificación académica por su ID
            await deletePlanificacionAcad(planificacionId);

            delCursosModuloD(cursoid);
            delCursosModuloV(cursoid);
            const profesorActualizado = {
                ...profesor[usuarioId-1], // Copia los datos originales del profesor
                modulosDiurno: JSON.stringify(modelosLlamadaD),
                modulosVespertino: JSON.stringify(modelosLlamadaV)
            };

            // Llamar a la función updateProfesor con el profesor actualizado
            await updateProfesor(usuarioId, profesorActualizado);
            
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
    }, []);

    const navigate = useNavigate()

    return (
        <div>
            <div className='contenedorPrincipal'>
                <div className='d-flex flex-column m-0' style={{background: '#03102C', color: 'white'}}>
                    <div className='d-flex col-12 justify-content-center m-0'>
                        <h1 className='h1'>Asignación al profesor{' '}
                            {profesor.map((item) => {
                                if (item.id === usuarioId) {
                                    const usuarioAsociado = usuarios.find(usuario => usuario.id === item.user);
                                    return usuarioAsociado ? usuarioAsociado.first_name : '';
                                }
                                return null; 
                            })}
                        </h1>
                        <button className="btn ml-5 mb-2" style={{color: 'white', background: 'grey'}} onClick={()=>navigate(-1)}>Volver
                        </button> 
                    </div>
                </div>
            </div>
            <div className="row justify-content-center mr-0">
                <div className="container rounded-lg m-1 shadow col-6" style={{border: 'solid 3px #A90429'}}>
                    <div className="row justify-content-center p-2" style={{background:'#03102C', color:'white', fontSize: 22}}>
                        Seleccion Asignaturas
                    </div>
                    <div className="d-flex justify-content-center m-0">
                        <input
                            className="form-control inputBuscar text-center"
                            value={busqueda}
                            placeholder="Búsqueda por Nombre"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="table-responsive" style={{height: '60vh'}}>
                        <table className="table table-sm table-striped table-bordered table-hover">
                            <thead className='text-center'>
                                <tr style={{background: 'gray', color:'white', textAlign: 'center'}}>
                                    <th>Materia</th>
                                    <th>Curso</th>
                                    <th>Asignatura</th>
                                    <th>Periodo</th>
                                    <th>Jornada</th>
                                    <th>Modalidad</th>
                                    <th>Actividad</th>
                                    <th>Modulo</th>
                                    <th>Acción</th>
                                </tr>
                            </thead>
                            <tbody>
                            {cursosDisponibles
                                .filter((curso) => curso.nombreAsignatura.toLowerCase().includes(busqueda.toLowerCase()))
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
                                    <td className="text-justify">
                                        <label>
                                            <input
                                                type="radio"
                                                name={`modalidad-${curso.id}`}
                                                value="Presencial"
                                                checked={cursoModalidad[curso.id]?.includes("Presencial")}
                                                onChange={() => handleModalidadChange(curso.id, "Presencial")}
                                            />
                                            Presencial
                                        </label>
                                        <label>
                                            <input
                                                type="radio"
                                                name={`modalidad-${curso.id}`}
                                                value="Online"
                                                checked={cursoModalidad[curso.id]?.includes("Online")}
                                                onChange={() => handleModalidadChange(curso.id, "Online")}
                                            />
                                            Online
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
                                    <button className="btn btn-danger m-2" style={{color: 'white', background: '#A90429'}} type="button" data-toggle="modal" data-target={`.modal-${curso.id}`} onClick={()=>(asignarModulosExistente)} >
                                    Ingreso Horario
                                    </button>
                                    <div className={`modal fade modal-${curso.id}`} tabIndex="-1" role="dialog" aria-labelledby={`modalLabel-${curso.id}`} aria-hidden="true">
                                        <div className="modal-dialog modal-xl">
                                            <div className="modal-content">
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
                                                                <td className="p-1 "><ColorHorario estado={modelosLlamadaV[index][0]}
                                                                nombreA={modelosLlamadaV[index][0]}
                                                                asignar={curso.id}
                                                                jornadas={jornadita}
                                                                fila={index} columna={0}
                                                                />
                                                                </td>
                                                                <td className="p-1 "><ColorHorario estado={modelosLlamadaV[index][1]}
                                                                nombreA={modelosLlamadaV[index][1]}
                                                                asignar={curso.id}
                                                                jornadas={jornadita}
                                                                fila={index} columna={1}
                                                                />
                                                                </td>
                                                                <td className="p-1 "><ColorHorario estado={modelosLlamadaV[index][2]}
                                                                nombreA={modelosLlamadaV[index][2]}
                                                                asignar={curso.id}
                                                                jornadas={jornadita}
                                                                fila={index} columna={2}
                                                                />
                                                                </td>
                                                                <td className="p-1 "><ColorHorario estado={modelosLlamadaV[index][3]}
                                                                nombreA={modelosLlamadaV[index][3]}
                                                                asignar={curso.id}
                                                                jornadas={jornadita}
                                                                fila={index} columna={3}
                                                                />
                                                                </td>
                                                                <td className="p-1 "><ColorHorario estado={modelosLlamadaV[index][4]}
                                                                nombreA={modelosLlamadaV[index][4]}
                                                                asignar={curso.id}
                                                                jornadas={jornadita}
                                                                fila={index} columna={4}
                                                                />
                                                                </td>
                                                                <td className="p-1 "><ColorHorario estado={modelosLlamadaV[index][5]}
                                                                nombreA={modelosLlamadaV[index][5]}
                                                                asignar={curso.id}
                                                                jornadas={jornadita}
                                                                fila={index} columna={5}
                                                                />
                                                                </td>
                                                                </tr>
                                                            ))
                                                        ) : (
                                                            jornadita === 'Diurno' && (
                                                            armar_horario.horarioD.map((fila, index) => (
                                                                <tr key={index}>
                                                                <td style={{background:'gray', color:'white', textAlign:'center'}}>{fila.hora}</td>
                                                                <td className="p-1 "><ColorHorario estado={modelosLlamadaD[index][0]}
                                                                nombreA={modelosLlamadaD[index][0]}
                                                                asignar={curso.id}
                                                                jornadas={jornadita}
                                                                fila={index} columna={0}
                                                                />
                                                                </td>
                                                                <td className="p-1 "><ColorHorario estado={modelosLlamadaD[index][1]}
                                                                nombreA={modelosLlamadaD[index][1]}
                                                                asignar={curso.id}
                                                                jornadas={jornadita}
                                                                fila={index} columna={1}
                                                                />
                                                                </td>
                                                                <td className="p-1 "><ColorHorario estado={modelosLlamadaD[index][2]}
                                                                nombreA={modelosLlamadaD[index][2]}
                                                                asignar={curso.id}
                                                                jornadas={jornadita}
                                                                fila={index} columna={2}
                                                                />
                                                                </td>
                                                                <td className="p-1 "><ColorHorario estado={modelosLlamadaD[index][3]}
                                                                nombreA={modelosLlamadaD[index][3]}
                                                                asignar={curso.id}
                                                                jornadas={jornadita}
                                                                fila={index} columna={3}
                                                                />
                                                                </td>
                                                                <td className="p-1 "><ColorHorario estado={modelosLlamadaD[index][4]}
                                                                nombreA={modelosLlamadaD[index][4]}
                                                                asignar={curso.id}
                                                                jornadas={jornadita}
                                                                fila={index} columna={4}
                                                                />
                                                                </td>
                                                                <td className="p-1 "><ColorHorario estado={modelosLlamadaD[index][5]}
                                                                nombreA={modelosLlamadaD[index][5]}
                                                                asignar={curso.id}
                                                                jornadas={jornadita}
                                                                fila={index} columna={5}
                                                                />
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
                                                    <button className="btn btn-danger m-2" style={{color: 'white', background: '#A90429'}} type="button" data-dismiss="modal">
                                                        Cancelar
                                                    </button>
                                                    <button className="btn btn-danger m-2" style={{color: 'white', background: '#A90429'}} type="button" data-dismiss="modal">
                                                        Guardar
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    </td>
                                    <td className="text-center">
                                    <button
                                        className="btn btn-danger m-2"
                                        style={{ color: 'white', background: '#A90429' }}
                                        onClick={() => {
                                            if (!cursoPeriodos[curso.id]) {
                                                alert("Selecciona un Periodo");
                                            } else if (!cursoJornada[curso.id]) {
                                                alert("Selecciona una Jornada");
                                            } else if (!cursoActividad[curso.id]) {
                                                alert("Selecciona una Actividad");
                                            } else if (!cursoModalidad[curso.id]) {
                                                alert("Selecciona una Modalidad");
                                            } else {
                                                    const periodo = cursoPeriodos[curso.id];
                                                    const jornada = cursoJornada[curso.id];
                                                    const actividad = cursoActividad[curso.id];
                                                    const modalidad = cursoModalidad[curso.id];
                                                    agregarCurso(curso, periodo, jornada, actividad, modalidad);
                                                    MatrizComponentD();
                                                    MatrizComponentV();
                                                }
                                        }}
                                    >
                                        Agregar
                                    </button>

                                    </td>
                                </tr>
                                ))
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className='col-5'>
                    <div className="container rounded-lg m-2 shadow col-12" style={{border: 'solid 3px #A90429'}}>
                        <div className="row justify-content-center p-2" style={{background:'#03102C', color:'white', fontSize: 22}}>
                        Asignaturas Agregadas
                        </div>
                        <div className="table-responsive">
                            <table className="table table-sm table-striped table-bordered table-hover">
                                <thead className='text-center'>
                                    <tr style={{background: 'gray', color:'white', textAlign: 'center'}}>
                                        <th>Materia</th>
                                        <th>Curso</th>
                                        <th>Asignatura</th>
                                        <th>Periodo</th>
                                        <th>Jornada</th>
                                        <th>Modalidad</th>
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
                                            <td className='text-center'>{curso.modalidad}</td>
                                            <td className='text-center'>{curso.actividad}</td>
                                            <td className='text-center'>
                                                <button className="btn btn-danger m-2" style={{color: 'white', background: '#A90429'}} onClick={() => eliminarCurso(curso)}>
                                                    Eliminar
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className='text-center'>
                        <button className="btn btn-danger m-2" style={{color: 'white', background: '#A90429'}} onClick={guardarCambiosAPI}>Guardar Cambios</button> 
                        <button onClick={()=>(console.log(MatrizComponent()))}>MODELOSDVA</button>
                        <button onClick={()=>(console.log())}>MODELOSDVA</button>
                    </div>
                    </div>
                    <div className="container rounded-lg m-2 shadow col-12" style={{border: 'solid 3px #A90429'}}>
                        <div className="row justify-content-center p-2" style={{background:'#03102C', color:'white', fontSize: 22}}>
                        Asignaturas Previamente Inscritas
                        </div>
                        <div className="table-responsive">
                            <table className="table table-sm table-striped table-bordered table-hover">
                                <thead className='text-center'>
                                    <tr style={{background: 'gray', color:'white', textAlign: 'center'}}>
                                        <th>Materia</th>
                                        <th>Curso</th>
                                        <th>Asignatura</th>
                                        <th>Periodo</th>
                                        <th>Jornada</th>
                                        <th>Modalidad</th>
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
                                        <td className='text-center'>{item.modalidad}</td>
                                        <td className='text-center'>{item.actividad}</td>
                                        <td className='text-center'>
                                            <button className="btn btn-danger m-2" style={{color: 'white', background: '#A90429'}} onClick={() => eliminarCursoAPI(item.id,cursoDetails.id)}>
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
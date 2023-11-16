import {useState, useEffect} from "react";
import {utils, writeFile} from 'xlsx'
import { getAllPlanificacion, getAllCursos, getAllProfesores, getAllUsuarios, getAllUserData } from "../../../../api/horario.api";
import { ModalPlanificacion } from "./modalPlanificacion";

export function Planificaciones ({alerta}) {

	const [cursos, setCursos] = useState(null)
	const [profesores, setProfesores] = useState(null)
	const [usuarios, setUsuarios] = useState(null)
	const [userData, setUserData] = useState(null)
	const [planificaciones, setPlanificaciones] = useState(null)
	const [ID, setID] = useState(null)

	useEffect(() => async function cargaPlanificacion() {
		try {
			const {data} = await getAllPlanificacion();
			setPlanificaciones(data)
			const usuarios = await getAllUsuarios();
			setUsuarios(usuarios.data)
			const user_data = await getAllUserData();
			setUserData(user_data.data)
			const profesores = await getAllProfesores();
			setProfesores(profesores.data)
			const cursos = await getAllCursos();
			setCursos(cursos.data)
		} catch {
			window.alert("¡Error!")
		}
	}, [])

	const [elementoSeleccionado, setElementoSeleccionado] = useState(null)

	const mostrarDepartamento = (fk, modo) => {
		let departamento = ""
		profesores.forEach((profesor) => {
			if (profesor.id == fk) {
				departamento = profesor.departamento
			}
		})
		
		return (modo == 0)?<td>{departamento}</td>: departamento

	}
  
	const mostrarMateria = (fk, modo) => {
		let materia = ""
		cursos.forEach((curso) => {
			if (curso.id == fk){
				materia = curso.materia
			}
		})
		return (modo == 0)?<td>{materia}</td>: materia
	}

	const mostrarCurso = (fk, modo) => {
		let cursoN = ""
		cursos.forEach((curso) => {
			if (curso.id == fk){
				cursoN = curso.Curso
			}
		})
		return (modo == 0)?<td>{cursoN}</td>: cursoN
	}

	const mostrarRut = (fk, modo) => {
    let rut = ""
		let idUser = 0

    profesores.forEach((profesor) => {
     if (profesor.id == fk) {
			usuarios.forEach((usuario) => {
				if(usuario.id == profesor.id) {
					idUser = usuario.id
				}
			})
		 }
    })

		userData.forEach((user_data) => {
			if (user_data.user == idUser) {
				rut = user_data.rut
			}
		})
    return (modo == 0)?<td>{rut}</td>: rut
  }

  const mostrarNombre = (fk, modo) => {
    let nombre = ""
    profesores.forEach((profesor) => {
     if (profesor.id == fk) {
			usuarios.forEach((usuario) => {
				if(usuario.id == profesor.user) {
					nombre = usuario.first_name
				}
			})
		 }
    })
    return (modo == 0)?<td>{nombre}</td>: nombre
  }

	const mostrarAsignatura = (fk, modo) => {
		let asignatura = ""
		cursos.forEach((curso) => {
			if (curso.id == fk) {
				asignatura = curso.nombreAsignatura
			}
		})
		return (modo == 0)?<td>{asignatura}</td>: asignatura
	}

  function manejarModal(datoModal){
    setElementoSeleccionado(datoModal)
    setID('entrar')
  }

  const sacarAlerta = (estado) => {
    alerta(estado)
    setID(null)
  }

	const armarExcel = () => {

		const filas = planificaciones.map(fila => ({
			campus: "ANTONIO VARAS",
			departamento: mostrarDepartamento(fila.profesor, 1),
			periodo: fila.periodo,
			materia: mostrarMateria(fila.curso, 1),
			curso: mostrarCurso(fila.curso, 1),
			jornada: fila.jornada,
			rut_docente: mostrarRut(fila.profesor, 1),
			nombre_docente: mostrarNombre(fila.profesor, 1),
			asignatura: mostrarAsignatura(fila.curso, 1),
			tipo: fila.actividad
		}))
		
		const headers = [
			"Campus", "Departamento", "Periodo", "Materia", "Curso", "Jornada", "RUT Docente", "Nombre Docente", "Asignatura", "Tipo"
		]

		const workbook = utils.book_new()
		const worksheet = utils.json_to_sheet([])
		
		utils.sheet_add_aoa(worksheet, [headers])
		utils.sheet_add_json(worksheet, filas, {skipHeader: true, origin: -1})
		utils.book_append_sheet(workbook, worksheet, "VARAS 202310")

		const range = utils.decode_range(worksheet["!ref"] ?? "")
		const rowCount = range.e.r;
		const columnCount = range.e.c

		writeFile(workbook, "Programacion_2023.xlsx", {cellStyles: true})
	}
	console.log(elementoSeleccionado);
	return (
		<div>
			<div className="table-responsive" style={{height: '60vh'}}>
					<table className="table table-sm table-striped table-bordered table-hover">
						<thead className="sticky-top">
							
							<tr style={{background: 'gray', color:'white', textAlign: 'center'}}>
								<th style={{width: '2%'}}>ID</th>
								<th style={{width: '10%'}}>Campus</th>
								<th style={{width: '9%'}}>Departamento</th>
								<th style={{width: '8%'}}>Periodo</th>
								<th style={{width: '6%'}}>Materia</th>
								<th style={{width: '6%'}}>Curso</th>
								<th style={{width: '9%'}}>Jornada</th>
								<th style={{width: '9%'}}>Rut docente</th>
								<th style={{width: '12%'}}>Nombre docente</th>
								<th style={{width: '13%'}}>Asignatura</th>
								<th style={{width: '9%'}}>Tipo</th>
							</tr>
						</thead>
						<tbody>
							{planificaciones && planificaciones.map((planificacion) => (
									<tr key={planificacion.id} style={{textAlign: 'center'}}>
									<td>{planificacion.id}</td>
									<td>ANTONIO VARAS</td>
									{profesores && mostrarDepartamento(planificacion.profesor, 0)}
									<td>{planificacion.periodo}</td>
									{cursos && mostrarMateria(planificacion.curso,0 )}
									{cursos && mostrarCurso(planificacion.curso, 0)}
									<td>{planificacion.jornada}</td>
									{profesores && mostrarRut(planificacion.profesor, 0)}
									{profesores && mostrarNombre(planificacion.profesor, 0)}
									{cursos && mostrarAsignatura(planificacion.curso, 0)}
									<td>{planificacion.actividad}</td>
									<td className="btn btn-dark h-100 w-100 align-content-center p-3" onClick={ () => manejarModal(planificacion) } data-toggle="modal" data-target={`#entrar${planificacion.id}`}><i className="fa fa-gear"></i></td>
								</tr>
							))}
						</tbody>
					</table>
				</div>  
        {/* Agregar otro a la BBDD */}
        <div className="btn btn-success m-2" data-toggle="modal" data-target="#agregar" onClick={() => setID('agregar')}>+</div>
				<button className="btn btn-dark shadow" onClick={armarExcel}>
					Descargar Planificación Académica
				</button>
		{ID === "entrar" && <ModalPlanificacion identificador={ID+String(elementoSeleccionado.id)} data1={elementoSeleccionado} usuarios={usuarios} docentes={profesores} cursos={cursos} alertaEnviada={sacarAlerta}/>}
		{ID === "agregar" && <ModalPlanificacion identificador={ID} data1={{id: null, periodo:'', actividad:'', jornada:'', profesor: null, curso: null}} usuarios={usuarios} docentes={profesores} cursos={cursos} alertaEnviada={sacarAlerta}/>}
		</div>
	)
}
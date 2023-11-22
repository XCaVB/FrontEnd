import { Header } from '../../Headers/Header'
import { Horario } from "./Horario"
import { getProfesor } from '../../../api/horario.api'
import horarioBase from "../../../data/horarioBase"
import { useParams, useLocation } from 'react-router-dom'
import { useState, useEffect } from "react"

export function RegistrarDisponible(){

	const [horarioDiurno, setHorarioDiurno] = useState(null)
	const [horarioVespertino, setHorarioVespertino] = useState(null)
	const [data, setData] = useState(null)
	const [modificar, setModificar] = useState(false)
	
	let info = useLocation();
	
	useEffect(() => async function loadHorario() {
		try { /* Cambiar esta funcion cuando se pueda hacer los logins de los usuarios */
					
			const {data} = await getProfesor(info.state.profesorInfo.id);
			setData(data)
			setHorarioDiurno(JSON.parse(data.horarioDiurno))
			setHorarioVespertino(JSON.parse(data.horarioVespertino))
		} catch {
			setHorarioDiurno(horarioBase.horarioDiurnoBase)
			setHorarioVespertino(horarioBase.horarioVespertinoBase)
		}
	}, [])

	const manejarModificacion = (modificar) => {
		if (!modificar){
			setModificar(true)
		} else {
			setModificar(false)
		}
	}

	return(
		<div>
			<Header estado={"cerrar"}/> 
			<div className='d-flex mr-0 mt-3 ml-3 mr-3 shadow' style={{height: '90vh', border: 'solid 3px #A90429', borderRadius: '5px'}}>
				<div className='d-flex flex-column col-2 p-0 m-0 border-left-0 border-bottom-0 border-top-0' style={{border: 'solid 3px #A90429', background: '#03102C'}}>
					<h2 className='h2 text-center m-0 p-0 border-bottom' style={{background: '#03102C', color:'white'}}>Disponibilidad Horaria</h2>
					<p className='h6 text-white'><i className='fa fa-user-circle-o m-1'></i>{info.state.userInfo.first_name+" "+info.state.userInfo.last_name}</p>
					<p className='h6 text-white'><i className='fa fa-envelope m-1'></i>{info.state.userInfo.email}</p>
					<p className='h6 text-white'><i className='fa fa-building-o m-1'></i>Departamento de {info.state.profesorInfo.departamento}</p>
					<p className='h6 text-white'><i className='fa fa-book m-1'></i>{info.state.profesorInfo.carrera}</p>
					{modificar && <button className='btn m-2' onClick={() => manejarModificacion(modificar)} style={{background: '#A90429', color: 'white'}}>Modificar horario</button>}
					{!modificar && <button className='btn btn-outline-danger m-2' onClick={() => manejarModificacion(modificar)} style={{background:'gray', color: 'white'}}>Modificar horario</button>}
					<div className='container rounded p-0' style={{background: 'white', height: '30%', width: '90%', border: 'solid 2px #A90429', marginTop: '30vh'}}>
						<div className='h3 text-center  ' style={{background: '#A90429', color: 'white'}}>Avisos</div>
						<p className='p p-1 text-justify'> ¡Atención! Recuerda que la fecha límite para inscribír tus horas disponibles es [FECHA]. Despues de esa fecha no será posible realizar más cambios.</p>
					</div>
				</div>
				<div className='d-flex flex-column col-10 p-0 m-0'>
					{(horarioDiurno !== null) && (horarioVespertino !== null) && <Horario matrizD={horarioDiurno} matrizV={horarioVespertino} data={data} modificar={modificar}/>}
				</div>
			</div>
		</div>
            
	)
}
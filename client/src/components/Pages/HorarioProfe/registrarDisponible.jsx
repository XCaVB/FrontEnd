import { Header } from '../../Headers/Header'
import { Horario } from "./Horario"
import { getProfesor } from '../../../api/horario.api'
import horarioBase from "../../../data/horarioBase"
import { useParams } from 'react-router-dom'
import { useState, useEffect } from "react"

export function RegistrarDisponible(){

	const [horarioDiurno, setHorarioDiurno] = useState(null)
	const [horarioVespertino, setHorarioVespertino] = useState(null)
	const [data, setData] = useState(null)
	const params = useParams()
	
	useEffect(() => async function loadHorario() {
		try { /* Cambiar esta funcion cuando se pueda hacer los logins de los usuarios */
					
			const {data} = await getProfesor(params.id);
			setData(data)
			setHorarioDiurno(JSON.parse(data.horarioDiurno))
			setHorarioVespertino(JSON.parse(data.horarioVespertino))
		} catch {
			setHorarioDiurno(horarioBase.horarioDiurnoBase)
			setHorarioVespertino(horarioBase.horarioVespertinoBase)
		}
	}, [])

	return(
		<div>
			<Header estado={"cerrar"}/>
			<div className='row mr-0 mt-3 ml-3 mr-3 shadow' style={{height: '90vh', border: 'solid 3px #03102C', borderRadius: '5px'}}>
				<div className='d-flex flex-column col-2 p-0 m-0 border-left-0 border-bottom-0 border-top-0' style={{border: 'solid 3px #03102C', }}>
					<h2 className='h2 text-center m-0 p-0' style={{background: '#03102C', color:'white'}}>Disponibilidad Horaria</h2>
					<button className='btn m-2' style={{background: '#A90429', color: 'white'}}>Modificar horario</button>
					<button className='btn m-2' style={{background: '#A90429', color: 'white'}}>[Ver si dejar o eliminar boton]</button>
				</div>
				<div className='col-10 p-0 m-0'>
					{(horarioDiurno !== null) && (horarioVespertino !== null) && <Horario matrizD={horarioDiurno} matrizV={horarioVespertino} data={data}/>}
				</div>
			</div>
		</div>
            
	)
}
import { ProfesorPage } from './ProfesorPage'
import { getProfesor } from '../../../api/horario.api'
import horarioBase from "../../../data/horarioBase"
import { useParams } from 'react-router-dom'
import { useState, useEffect } from "react"

export function RegistrarHorario({secretario}){


    const [horarioDiurno, setHorarioDiurno] = useState(null)
    const [horarioVespertino, setHorarioVespertino] = useState(null)
    const [data, setData] = useState(null)
    const params = useParams()
    
    useEffect(() => async function loadHorario() {
       
        try {
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
        <div className='container rounded mt-4 mb-4 p-0 col-10' style={{border: 'solid 3px #A90429'}}>
            {(horarioDiurno !== null) && (horarioVespertino !== null) && <ProfesorPage matrizD={horarioDiurno} matrizV={horarioVespertino} secretario={secretario}/>}

        </div>
    )
}
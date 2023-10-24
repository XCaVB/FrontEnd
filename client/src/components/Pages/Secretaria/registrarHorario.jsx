import { ProfesorPage } from './ProfesorPage'
import { getHorario} from '../../../api/horario.api'
import horarioBase from "../../../data/horarioBase"
import { useParams } from 'react-router-dom'
import { useState, useEffect } from "react"

export function RegistrarHorario(){


    const [horarioDiurno, setHorarioDiurno] = useState(null)
    const [horarioVespertino, setHorarioVespertino] = useState(null)
    const [data, setData] = useState(null)
    const params = useParams()
    
    useEffect(() => async function loadHorario() {
        console.log(params);
        try {
            const {data} = await getHorario(params.id);
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
        <>
            {(horarioDiurno !== null) && (horarioVespertino !== null) && <ProfesorPage matrizD={horarioDiurno} matrizV={horarioVespertino} data={data}/>}
        </>
        </div>
    )
}
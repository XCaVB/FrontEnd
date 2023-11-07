import { Header } from '../../Headers/Header'
import { Horario } from "./Horario"
import { getHorario } from '../../../api/horario.api'
import horarioBase from "../../../data/horarioBase"
import { useParams } from 'react-router-dom'
import { useState, useEffect } from "react"

export function RegistrarDisponible(){

    const [horarioDiurno, setHorarioDiurno] = useState(null)
    const [horarioVespertino, setHorarioVespertino] = useState(null)
    const [data, setData] = useState(null)
    const params = useParams()
    
    useEffect(() => async function loadHorario() {
        console.log(params);
        try { /* Cambiar esta funcion cuando se pueda hacer los logins de los usuarios */
            
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
        <>
            <Header estado={"cerrar"}/>
            {(horarioDiurno !== null) && (horarioVespertino !== null) && <Horario matrizD={horarioDiurno} matrizV={horarioVespertino} data={data}/>}
        </>
            
    )
}
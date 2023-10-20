import { useNavigate } from "react-router-dom"

export function HorarioCard({horario}) {

    const navigate = useNavigate()

    return (
        <div style={{background: '#6F0505', cursor: 'pointer'}} onClick={() => navigate(`/horarios/${horario.id}`)}> 
            <h1>{horario.title}</h1>
            <p>{horario.hora_inicio}</p>
            <p>{horario.hora_fin}</p>
            <hr></hr>
        </div>
    )
}
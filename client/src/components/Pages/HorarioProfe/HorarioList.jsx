import { useEffect, useState } from "react"
import { getAllHorarios } from "../../../api/horario.api"
import { HorarioCard } from "./HorarioCard";

export function HorarioList() {

    const [horarios, setHorarios] = useState([]);

    useEffect(() => {
        
        async function loadHorarios(){
            const res = await getAllHorarios();
            setHorarios(res.data);
        }
        loadHorarios();
    }, []);

    return (
        <div>
            {horarios.map((horario) => (
                <HorarioCard key={horario.id} horario={horario}/>
            ))}
        </div>
    )
}
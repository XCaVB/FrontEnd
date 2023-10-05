import { Header } from "./header"
import { Horario } from "./Horario"
import horarioBase from "../data/horarioBase"

export function RegistrarDisponible(){

    return(
        <>
            <Header/>
            <Horario matriz={horarioBase}/>
        </>
            
    )
}
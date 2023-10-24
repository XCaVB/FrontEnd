import { Header } from "../Headers/Header"
import { RegistrarHorario } from "../Pages/Secretaria/registrarHorario"

export function ProfesorHeader(){
    return(
        <div>
            <Header/>
            <RegistrarHorario/>
        </div>
    )
}
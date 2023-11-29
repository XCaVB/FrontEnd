import { useLocation } from "react-router-dom"
import { Header } from "../Headers/Header"
import { RegistrarHorario } from "../Pages/Secretaria/registrarHorario"

export function ProfesorHeader(){

    const info = useLocation()
    return(
        <div>
            <Header estado={"cerrar"}/>
            <RegistrarHorario secretario={info.state}/>
        </div>
    )
}
import { BarraBuscadora } from "../Pages/Secretaria/barraBuscadora"
import { Header } from "../Headers/Header"

export function BuscarProfesor(){

    return(
        <>
            <Header estado={"cerrar"}/>
            <BarraBuscadora/>
        </>
    )
}
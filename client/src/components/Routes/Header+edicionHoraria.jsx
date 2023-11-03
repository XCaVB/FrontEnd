import { Header } from "../Headers/Header"
import { EdicionHoraria } from "../Pages/Secretaria/edicionHoraria"

export function EdicionHeader(){
    return(
        <div>
            <Header estado={"cerrar"}/>
            <EdicionHoraria/>
        </div>
    )
}
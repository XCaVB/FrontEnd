import logo from "../images/logo.png"
import "../css/styles.css"
import { Link } from "react-router-dom"

export function Header(){

    return(
        <header className="header">
                <div className="row align-items-center mr-0">
                    <div className="col-2 logo">
                        {/*Logo UNAB*/}
                        <img src={logo} alt="Logo UNAB" className="img-fluid"/>  
                    </div>
                    <div className="col-8 mr-auto">
                        {/*Nombre UNAB*/}
                        <h1 className="text-center">Planificación Académica</h1>
                    </div>
                    <div className="col-2 p-0">
                        {/*Botón para cerrar sesión*/}
                        <button className="btn cerrar-sesion"><Link to={"/"} style={{color:"white"}}>Cerrar sesión</Link></button> 
                    </div>
                </div>
        </header>
    )
}
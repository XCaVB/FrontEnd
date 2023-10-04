import logo from "../images/logo.png"
import "../css/styles.css"
import { Link } from "react-router-dom"

export function HeaderOut(){

    return(
        <header className="header">
                <div className="row align-items-center">
                    <div className="col-2 logo">
                        {/*Logo UNAB*/}
                        <img src={logo} alt="Logo UNAB" className="img-fluid"/>  
                    </div>
                    <div className="col-9 mr-auto">
                        {/*Nombre UNAB*/}
                        <h1 className="text-center">Universidad Andrés Bello</h1>
                    </div>
                    <div className="col-1">
                        {/*Botón para cerrar sesión*/}
                        <button className="btn cerrar-sesion"><Link to={"/"} style={{color:"white"}}>Salir</Link></button> 
                    </div>
                </div>
        </header>
    )
}
import logo from "../images/logo.png"
import "../css/styles.css"
import { Link } from "react-router-dom"

export function Header(){

    return(
        <header className="header">
            <div className="container">
                <div className="row align-items-cener">
                    <div className="col-2 logo">
                        {/*Logo UNAB*/}
                        <img src={logo} alt="Logo UNAB" className="img-fluid"/>  
                    </div>
                    <div className="col-md-6">
                        {/*Nombre UNAB*/}
                        <h1 className="text-center">Universidad Andrés Bello</h1>
                    </div>
                    <div className="col-md-3 text-right">
                        {/*Botón para cerrar sesión*/}
                        <button className="btn cerrar-sesion"><Link to={"/"} style={{color:"white"}}>Cerrar sesión</Link></button> 
                    </div>
                </div>
            </div>
        </header>
    )
}
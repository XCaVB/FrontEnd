import logo from "../../images/logo.png"
import "../../css/styles.css"
import { Link } from "react-router-dom"

export function Header( {estado} ){

    return(
        <header className="header" style={{padding: 9}}>
                <div className="d-flex align-items-center m-0">
                    <div className="logo">
                        {/*Logo UNAB*/}
                        <img src={logo} alt="Logo UNAB" className="img-fluid"/>  
                    </div>
                    <div className="m-auto">
                        {/*Nombre UNAB*/}
                        <h1 className="text-center">Planificación Académica</h1>
                    </div>
                    <div>
                        {estado === "salir" && <Link className="btn" style={{background: '#A90429', color:'white'}} to={"/"}>Salir</Link>}
                        {estado === "cerrar" && <Link className="btn" style={{background: '#A90429', color:'white'}} to={"/"}>Cerrar sesión</Link>}
                    </div>
                </div>
        </header>
    )
}
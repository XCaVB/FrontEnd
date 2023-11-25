import logo from "../../images/logo.png"
import "../../css/styles.css"
import { Link } from "react-router-dom"


export function Header( {estado} ){


	return(
		<header className="header shadow" style={{padding: 9}}>
			<div className="row justify-content-between align-items-center m-0">
				<div className="logo">
					{/*Logo UNAB*/}
					<img src={logo} alt="Logo UNAB" className="img-fluid"/>  
				</div>
				<div className="mx-auto">
					{/*Nombre Programa*/}
					<h1 className="h1 text-center">Planificación Académica</h1>
				</div>
				<div className="col-1 p-0">
					{/*Boton CERRAR SESION*/}
					{estado === "cerrar" && <Link className="btn" style={{background: '#A90429', color:'white'}} to={"/"}>Cerrar sesión</Link>}
				</div>
			</div>
		</header>
	)
}
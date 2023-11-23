import logo from "../../images/logo.png"
import "../../css/styles.css"
import { Link } from "react-router-dom"

export function Header( {estado} ){

	$(document).ready(function(){
		$('[data-toggle="tooltip"]').tooltip();
	});

	return(
		<header className="header shadow" style={{padding: 9}}>
			<div className="row justify-content-between align-items-center m-0">
				<div className="logo">
					{/*Logo UNAB*/}
					<img src={logo} alt="Logo UNAB" className="img-fluid"/>  
				</div>
				<div className="mx-auto">
					{/*Nombre Programa*/}
					<h1 className="text-center">Planificación Académica</h1>
				</div>
				<div className="d-flex flex-column">
					{/* Notificaciones */}
					<span className="fa fa-bell" data-toggle='modal' data-target='#notificaciones' title="Notificaciones" style={{cursor: 'pointer', fontSize: '30px'}} onClick={() => console.log("Abriendo notificaciones")}><a data-toggle='tooltip'></a></span>
					<span className="badge badge-danger"></span>
				</div>
				<div className="col-1 p-0">
					{/*Boton VOLVER o CERRAR SESION*/}
					{estado === "salir" && <Link className="btn" style={{background: 'gray', color:'white'}} to={"/"}>Volver</Link>}
					{estado === "cerrar" && <Link className="btn" style={{background: '#A90429', color:'white'}} to={"/"}>Cerrar sesión</Link>}
				</div>
			</div>

			{/* Ventana de notificaciones */}
			<div className="modal right fade" id="notificaciones" tabindex="-1" role="dialog" aria-labelledby="myModalLabel2">
				<div className="modal-dialog" role="document">
					<div className="modal-content">

						<div className="modal-header" style={{background:'#A90429'}}>
							<i className=" btn btn-dark fa fa-close" data-dismiss='modal'></i>
							<p className="h3 modal-title mx-auto" id="myModalLabel2">Notificaciones</p>
						</div>

						<div className="modal-body">
							<p className="text-dark"></p>
						</div>
					</div>
				</div>
			</div>
		</header>
		
	)
}
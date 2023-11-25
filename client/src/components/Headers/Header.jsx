import logo from "../../images/logo.png"
import "../../css/styles.css"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react";
import { EventosPorFecha } from "./EventosPorFecha";
import { getAllAuditorias } from "../../api/horario.api";

export function Header( {estado} ){

	const [cacheNotif, setCacheNotif] = useState([])
	

	useEffect(() => async function(){
		const {data} = await getAllAuditorias()
		setCacheNotif(data)
	}, [])

	useEffect(() => {
		const timer = setTimeout(async () => {
			const {data} = await getAllAuditorias()
			setCacheNotif(data)
		}, 60000)
		return () => clearTimeout(timer)
	}, [cacheNotif])

	$(document).ready(function(){
		$('[data-toggle="tooltip"]').tooltip();
	});

	const [eventosAgrupadosArray, setEventosAgrupadosArray] = useState([])

	useEffect(function agruparFecha() {
		// Crear un objeto para almacenar los eventos agrupados por fecha
			const eventosAgrupados = {};
			// Iterar sobre cada evento y agruparlos por fecha
			cacheNotif.forEach((evento) => {
			const fecha = evento.fechaHora.split(",")[0]; // Obtener la fecha sin la hora
			if (!eventosAgrupados[fecha]) {
				eventosAgrupados[fecha] = [];
			}
			eventosAgrupados[fecha].push(evento);
			});

			// Convertir el objeto a un arreglo de objetos
			const eventosAgrupadosArrayX = Object.entries(eventosAgrupados).map(([fecha, eventos]) => ({
			fecha,
			eventos
			}));


			// Ordenar en forma descendente
			const eventosAgrupadosArrayOrdenado = eventosAgrupadosArrayX.sort((a, b) => {
				// Comparar las fechas en formato YYYY-MM-DD
				return new Date(b.fecha) - new Date(a.fecha);
			  });
			  
			setEventosAgrupadosArray(eventosAgrupadosArrayOrdenado)
		}, [cacheNotif])

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
				<div className="d-flex flex-column">
					{/* Notificaciones */}
					<span className="fa fa-history" data-toggle='modal' data-target='#notificaciones' title="Historial de cambios" style={{cursor: 'pointer', fontSize: '30px'}}><span data-toggle='tooltip'></span></span>
					<span className="badge badge-danger"></span>
				</div>
				<div className="col-1 p-0">
					{/*Boton VOLVER o CERRAR SESION*/}
					{estado === "cerrar" && <Link className="btn" style={{background: '#A90429', color:'white'}} to={"/"}>Cerrar sesión</Link>}
				</div>
			</div>

			{/* Ventana de notificaciones */}
			<div className="modal right fade shadow" id="notificaciones" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel2">
				<div className="modal-dialog" role="document">
					<div className="modal-content">

						<div className="modal-header" style={{background:'#A90429'}}>
							<i className=" btn btn-dark fa fa-close" data-dismiss='modal'></i>
							<p className="h4 modal-title mx-auto" id="myModalLabel2">Historial de cambios</p>
						</div>

						<div className="modal-body">
							{/*<div className="text-dark">{cacheNotif.map((cambio) => (
								<div key={cambio.id}>
									<button className="btn d-flex" data-toggle='collapse' data-target={`#cambio${cambio.id}`} onClick={() => flecha(abierto)}> {cambio.fechaHora.split(",")[0]} {} </button>
									<div id={`cambio${cambio.id}`} className="collapse">{`${cambio.fechaHora.split(",")[1]}: texto de ejemplo`}<hr/></div>
								</div>
							))}</div>
							<button className="btn btn-warnig" onClick={() => console.log(eventosAgrupados)}> KI</button>*/}
							<EventosPorFecha eventosAgrupadosArray={eventosAgrupadosArray}/>
						</div>
					</div>
				</div>
			</div>
		</header>
		
	)
}
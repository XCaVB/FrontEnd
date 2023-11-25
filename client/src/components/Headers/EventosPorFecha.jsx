import React, { useEffect, useState } from 'react';
import { getAllUsuarios } from '../../api/horario.api';

export function EventosPorFecha ({ eventosAgrupadosArray }) {
  const [fechaSeleccionada, setFechaSeleccionada] = useState(null);
	const [usuarios, setUsuarios] = useState(null)

  const handleToggleCollapse = (fecha) => {
    setFechaSeleccionada((prevFecha) => (prevFecha === fecha ? null : fecha));
  };


	useEffect(() => async function cargaUsuarios() {
		try {
			const {data} = await getAllUsuarios()
			setUsuarios(data)
		} catch {
			setUsuarios(null)
		}
	}, [])

  const mostrarUsuario = (id) => {
		let username = ""
    {usuarios && usuarios.forEach((usuario) => {
			if (usuario.id == id) {
				username = usuario.username
			}
		})}
		return username
  }

  return (
    <div>
      {eventosAgrupadosArray.map((grupo) => (
        <div key={grupo.fecha}>
          <button className="btn btn-block btn-outline-secondary m-1" type="button" data-toggle="collapse" data-target={`#collapse-${grupo.fecha}`} aria-expanded={fechaSeleccionada === grupo.fecha ? 'true' : 'false'} onClick={() => handleToggleCollapse(grupo.fecha)}>
            {grupo.fecha}
          </button>
          <div
            id={`collapse-${grupo.fecha}`}
            className={`collapse ${fechaSeleccionada === grupo.fecha ? 'show' : ''}`}>
            <div>
              {grupo.eventos.map((evento) => (
                <li key={evento.id} className='text-dark text-justify' style={{fontSize: 11}}>
                  {`${evento.fechaHora.split(",")[1]}: ${usuarios && mostrarUsuario(evento.user)} ${evento.evento} ${evento.objetivo}`}
									<hr/>
                </li>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
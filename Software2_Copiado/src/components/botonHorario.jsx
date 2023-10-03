import React, { useState } from "react"
import { Horario } from "./Horario";

export function BotonHorario(props){

    const [color, setColor] = useState('');
    const [estado, setEstado] = useState(false);

    const cambiarColor = (e) => {
        if(estado == false){
            setEstado(true)
            setColor('green')
        } else {
            setEstado(false)
            setColor('white')
        }
    };

    const enviarDatosAlHorario = () => {
        props.onDatosEnviados(estado)
      }

        return(
        <div className="p-4 w-90 h-90" onClick={(e) => {cambiarColor(); enviarDatosAlHorario();}} style={{cursor: "pointer", background: color}}>

        </div>
    )
};
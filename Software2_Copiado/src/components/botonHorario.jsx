import React, { useState } from "react"
import { Horario } from "./Horario";

export const BotonHorario = (props) => {

    const [color, setColor] = useState('');
    const [estado, setEstado] = useState(0);

    const cambiarColor = (e) => {
        if(estado == 0){
            setEstado(1)
            setColor('green')
        }  
        if(estado == 1){
            setEstado(2)
            setColor('blue')
        }
        if(estado == 2){
            setEstado(0)
            setColor('white')
        }
    };

    const enviarDatosAlHorario = () => {
        props.onDatosEnviados(estado)
      }

    const ambasFunciones = () => {
        cambiarColor();
        enviarDatosAlHorario()
    }
        return(
        <div className="p-4 w-90 h-90" onClick={ambasFunciones} style={{cursor: "pointer", background: color}}>

        </div>
    )
};
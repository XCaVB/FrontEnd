import React, { useEffect, useState } from "react"

export const BotonHorario = (props) => {

    const [color, setColor] = useState(() => {
        if (props.estado === 0){
            return 'white'
        }
        if (props.estado === 1){
            return 'green'
        }
        if (props.estado === 2){
            return 'blue'
        }
    });

    const [estado, setEstado] = useState(props.estado);

    const cambiarColor = (e) => {
        if(estado == 0){
            setEstado(1)
            setColor('white')
        }  
        if(estado == 1){
            setEstado(2)
            setColor('green')
        }
        if(estado == 2){
            setEstado(0)
            setColor('blue')
        }
    };

    const enviarDatosAlHorario = () => {
        props.onDatosEnviados([estado, props.fila, props.columna])
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
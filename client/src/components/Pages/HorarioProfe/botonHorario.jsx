import React, { useEffect, useState } from "react"

export const BotonHorario = (props) => {
    const [color, setColor] = useState(() => {
        if (props.estado === 8){
            return 'white'
        }
        if ( props.texto !== null){
            console.log(props.texto);
            return 'green'
        }
        if (props.estado === 2){
            return 'red'
        }
    });

    {/* Función para realizar el cambio de color al hacer click */}
    const [estado, setEstado] = useState(props.estado);
    const cambiarColor = () => {
        if(estado == 1){
            setEstado(0)
            setColor('white')
        }  
        if(estado == 0){
            setEstado(1)
            setColor('green')
        }
    };

    {/* Envia de vuelta al horario el estado de la casilla */}
    useEffect(() => {
        enviarDatosAlHorario();
    }, [estado])

    {/* Realiza el bloqueo automatico de la casilla que corresponda */}
    useEffect(() => {
        if(props.estado == 2){
            setEstado(2)
            setColor('red')
        }
    })

    {/* Realiza el desbloqueo automatico de la casilla que corresponda */}
    useEffect(() => {
        if (props.estado == 0){
            setEstado(0)
            setColor('white')
        }
    },[props.estado])

    const enviarDatosAlHorario = () => {
        props.onDatosEnviados([estado, props.fila, props.columna])
      }

    const ambasFunciones = () => {
        cambiarColor();
        enviarDatosAlHorario();
    }
        return(
            <div>
                {(!props.modificar ) && <div className="p-4 w-90 h-90" style={{ background: color}}>{props.texto}</div>}
                {(estado != 2 && props.modificar) && <div className="p-4 w-90 h-90" onClick={ambasFunciones} style={{ cursor: "pointer", background: color}}>{props.texto}</div>}
                {(estado == 2 && props.modificar) && <div className="p-4 w-90 h-90" style={{ background: color}}>{props.texto}</div>}
            </div>
            
    )
};
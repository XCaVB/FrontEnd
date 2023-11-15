import { useState } from "react"

export const ColorHorario = (props) => {

    const [color, setColor] = useState(() => {
        if (props.estado === 0){
            return 'white'
        }
        if (props.estado === 1){
            return 'green'
        }
        if (props.estado === 2){
            return 'red'
        }
    });

    const [estado, setEstado] = useState(props.estado);

    return(
        <div className="p-4 w-90 h-90" style={{background: color}}>
        </div>
    )
}
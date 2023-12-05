import { useEffect, useState } from "react";
import { getAllCursos } from "../../../api/horario.api";

export const ColorHorario = (props) => {

    const [curso, setCurso] = useState();
    const peticionGet = async () => {
        try {
          // Utiliza la función correspondiente para obtener la información del profesor.
          const responseCurso = await getAllCursos();
          setCurso(responseCurso.data);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    useEffect(() => {
        peticionGet();
      }, []);

    const [color, setColor] = useState(() => {
        let colorResult = 'white';
        if (props.estado === 1) {
            colorResult = 'green';
        } else if (props.estado === 2) {
            colorResult = 'red';
        } else if (props.modulo !== undefined && props.modulo !== 0 && props.jornadas[props.modulo]) {
            colorResult = 'blue';
        }
        return colorResult;
    });

    useEffect(() => {
        if (props.estado === 0) {
            setColor('white');
        } else if (props.estado === 1) {
            setColor('green');
        } else if (props.estado === 2) {
            setColor('red');
        } else {
            // Itera sobre las claves de jornadas
            Object.keys(props.jornadas).forEach((X) => {
                if (X === props.modulo) {
                    setColor('blue');
                }
            });
        }
    }, [props.estado]);

    const [colores, setColores] = useState(() => {
        let colorResult = 'white';
        if (props.modulo !== undefined && props.modulo !== 0 && props.jornadas[props.modulo]) {
            colorResult = 'blue';
        }
        return colorResult;
    });

    
//Object.keys(props.jornadas).forEach((X)=>{if (X === props.modulo) {"Sipo"}})
    return (
        <div>
        <div
            className="p-4 w-90 h-90"
            style={{ background: color }}
        >
            {(props.modulo !== undefined && props.modulo !== 0 && curso.length > 0) && (
                <span className='text-light'>{curso[props.modulo - 1].nombreAsignatura}</span>
            )}
        </div>
        <div
            className="p-4 w-90 h-90"
            style={{ background: colores }}
        >
            {(props.modulo !== undefined && props.modulo !== 0 && curso.length > 0) && (
                <span className='text-light'>{props.modulo}</span>
            )}
        </div>
        </div>
        
    );
};

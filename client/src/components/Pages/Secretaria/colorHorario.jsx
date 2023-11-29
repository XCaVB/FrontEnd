import { useEffect, useState } from "react";
import { getAllCursos } from "../../../api/horario.api";

export const ColorHorario = (props) => {
    const [color, setColor] = useState(() => {
        if (props.estado === 0) {
            return 'white';
        } else if (props.estado === 1) {
            return 'green';
        } else if (props.estado === 2) {
            return 'red';
        }
    });

    useEffect(() => {
        if (props.estado === 0) {
            setColor('white');
        } else if (props.estado === 1) {
            setColor('green');
        } else if (props.estado === 2) {
            setColor('red');
        }
    }, [props.estado]);

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

    return (
        <div
            className="p-4 w-90 h-90"
            style={{ background: color }}
        >
            {(props.modulo !== undefined && props.modulo !== 0 && curso.length > 0) && (
                <span className='text-light'>{curso[props.modulo - 1].nombreAsignatura}</span>
            )}
        </div>
    );
};

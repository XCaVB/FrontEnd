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
        let colorResult = '';
        const cursos = curso;
        if (props.estado === 0) {
            colorResult = 'white';
        } else if (props.estado === 1) {
            colorResult = 'green';
        } else if (props.estado === 2) {
            colorResult = 'red';
        } else {
            // Itera sobre las claves de jornadas
            Object.keys(jornadas).forEach((X) => {
                if (cursos && X === cursos[props.modulo - 1]) {
                    colorResult = 'blue';
                }
            });
        }
        return colorResult;
    });

    useEffect(() => {
        const cursos = curso;
        if (props.estado === 0) {
            setColor('white');
        } else if (props.estado === 1) {
            setColor('green');
        } else if (props.estado === 2) {
            setColor('red');
        } else {
            // Itera sobre las claves de jornadas
            Object.keys(jornadas).forEach((X) => {
                if (cursos && X === cursos[props.modulo - 1]) {
                    setColor("blue");
                }
            });
        }
    }, [props.estado]);

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

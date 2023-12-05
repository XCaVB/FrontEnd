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

      const obtenerColor = () => {

        let colorResult = '';
        if (props.estado === 0) {
            colorResult = 'white';
        } else if (props.estado === 1) {
            colorResult = '#198754';
        } else if (props.estado === 2) {
            colorResult = 'red';
        }
        return colorResult;
    };

    const color = obtenerColor();

//curso[props.modulo - 1].nombreAsignatura
//Object.keys(props.jornadas)[props.modulo-1]
//Object.keys(props.jornadas)
    return (
        <div
            className="p-4 w-90 h-90"
            style={{ background: color }}
        >
            {props.modulo !== undefined && props.modulo !== 0 && curso && curso.length > 0 && (
                <span className={color === 'white' ? '' : 'text-white'}>
                    {curso[props.modulo - 1].nombreAsignatura}
                </span>
            )}
        </div>
    );
};

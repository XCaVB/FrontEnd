import { useEffect, useState } from "react";

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

    return (
        <div
            className="p-4 w-90 h-90"
            style={{ background: color}}
        ></div>
    );
};

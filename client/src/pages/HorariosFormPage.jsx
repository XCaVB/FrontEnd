import { useEffect } from 'react';
import {useForm} from 'react-hook-form'
import { createHorario, deleteHorario, updateHorario, getHorario} from '../api/horario.api'
import { useNavigate, useParams} from 'react-router-dom'

export function HorariosFormPage() {

    const {
        register, 
        handleSubmit, 
        formState: { errors },
        setValue

    } = useForm();
    const navigate = useNavigate();
    const params = useParams();

    const onSubmit = handleSubmit(async data => {
        if (params.id) {
            await updateHorario(params.id, data);
        } else {
            await createHorario(data);
            navigate('/horarios');
        }

    })

    useEffect(() => {
    async function loadHorario() {
        if (params.id) {
            const {data} = await getHorario(params.id);
            setValue('title', data.title)
            setValue('hora_inicio', data.hora_inicio)
            setValue('hora_fin', data.hora_fin)
        }
    }
    loadHorario();

    }, [])

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="Ingrese título"  
                {...register("title", {required: true})}
                />
                {errors.title && <span>*Este campo es requerido</span>}
                <input type="text" placeholder="00:00:00"
                {...register("hora_inicio", {required: true})}
                />
                {errors.hora_inicio && <span>*Este campo es requerido</span>}
                <input type="text" placeholder="00:00:00"
                {...register("hora_fin", {required: true})}
                />
                {errors.hora_fin && <span>*Este campo es requerido</span>}
                <button>Guardar</button>
            </form>

            {params.id && <button onClick={async () => {
                const aceptado = window.confirm('¿Seguro que quieres hacer esto?')
                if (aceptado) {
                    await deleteHorario(params.id)
                    navigate('/horarios')
                }
            }}>BORRAR</button>
            }
        </div>
    )
}
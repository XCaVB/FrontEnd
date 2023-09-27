import { useState } from "react"
import './ingreso.css'
import { Link } from "react-router-dom"

export function Docentes(){
    const [nombre, setNombre] = useState('')
    const [contraseña, setContraseña] = useState('')
    const [error, setError] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()

        if(nombre === '' || contraseña === ''){
            setError(true)
            return
        }
    }

    return(
        <div>
            <h1>Ingresa tus credenciales docente</h1>

            <form 
                className="ingreso"
                onSubmit={handleSubmit}
            >
                <input 
                    type="text"
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                    placeholder="Correo Electronico"
                />
                <input 
                    type="password"
                    value={contraseña}
                    onChange={e => setContraseña(e.target.value)}
                    placeholder="Contraseña"
                />
                {nombre.length === 0|| contraseña.length === 0
                    ?<button>Iniciar sesión</button>
                    :<button><Link to={"/Docentes/registrar-horarios"}>Iniciar sesion</Link></button>}
            </form>
            {error && <p>Todos los campos son obligatorios</p>}
            <hr />
            <button><Link to={'/'}>SALIR</Link></button>
        </div>
    )
}
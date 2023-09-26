import { useState } from "react"
import './ingreso.css'
import { Link } from "react-router-dom"

export function Administrativos(){
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
            <h1>Ingresa tus credenciales administrativo</h1>

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
                <button>Iniciar sesion</button>
            </form>
            {error && <p>Todos los campos son obligatorios</p>}
            <hr />
            <button><Link to={'/'}>SALIR</Link></button>
        </div>
    )
}
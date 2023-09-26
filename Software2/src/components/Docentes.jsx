import { useState } from "react"

export function Docentes(){
    const [nombre, setNombre] = useState('')
    const [Contraseña, setContraseña] = useState('')

    return(
        <section>
            <h1>Ingresa tus credenciales</h1>

            <form>
                <input 
                    type="text"
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                />
                <input 
                    type="text"
                    value={Contraseña}
                    onChange={e => setContraseña(e.target.value)}
                />
                <button>Iniciar sesion</button>
            </form>
        </section>
    )
}
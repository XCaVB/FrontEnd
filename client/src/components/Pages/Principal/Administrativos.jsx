import { useState } from "react"
import '../../../css/ingreso.css'
import fondo from "../../../images/fondo2.jpg"
import { Link, useNavigate } from "react-router-dom"
import { Header } from "../../Headers/HeaderHome"

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

    const navigate = useNavigate()

    return(
        <div style={{height:'100vh',backgroundImage: `url(${fondo})`, backgroundSize: 'cover'}}>
            <Header/>
            <div className="container text-white text-center rounded p-0" onSubmit={handleSubmit} style={{border: 'solid 3px #03102C', marginTop:'25vh', width: '420px'}}>
            <h4 style={{paddingBottom: '5px', margin: 0, background: '#03102C'}}>{<i className="fa fa-mail-reply" style={{cursor:'pointer'}} onClick={() => navigate('../')}></i>} Ingresa tus credenciales</h4>  
                <form className="ingreso" onSubmit={handleSubmit} style={{justifyContent: "center", padding: 10}}>
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
                        ?<button className="btn" style={{background:'#A90429', color:'white'}}>Iniciar sesión</button>
                        :<Link className="btn" style={{background: '#A90429', color:'white'}} to={'/administrativos/buscar-profesor'}>Iniciar sesión</Link>}
                </form>
                {error && <p className="bg-white text-danger m-0">Todos los campos son obligatorios</p>}
            </div>
        </div>
    )
}

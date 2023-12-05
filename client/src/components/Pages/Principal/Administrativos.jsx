import { createContext, useState } from "react"
import '../../../css/Ingreso.css'
import fondo from "../../../images/fondo2.jpg"
import { Link, Navigate, useNavigate } from "react-router-dom"
import { loginAdministrativo } from "../../../api/horario.api"
import { Header } from "../../Headers/HeaderHome"

export function Administrativos(){
    const [nombre, setNombre] = useState('')
    const [contraseña, setContraseña] = useState('')
    const [error, setError] = useState(false)
    const [existe, setExiste] = useState(null)
    const [autorizado, setAutorizado] = useState(null)

    const handleSubmit = (e) => {
        e.preventDefault()

        if(nombre === '' || contraseña === ''){
            setError(true)
            return
        }
    }

    {/* Proceso de Login */}
    const navigate = useNavigate();
    async function verificaUsuario(){
        try {
            const response = await loginAdministrativo({username: nombre, password: contraseña})
            setExiste(true)
            setAutorizado(true)
            navigate('/Administrativos/buscar-profesor', {state:{data: response.data}})
        } catch (e) {
            if (e.response.status == 401) {
                setAutorizado(false)
            }

            if (e.response.status == 404) {
                setExiste(false)
            }
        }
    }

    return(
        <div style={{height:'100vh',backgroundImage: `url(${fondo})`, backgroundSize: 'cover'}}>
            <Header/>
            <div className="container text-white text-center rounded p-0" onSubmit={handleSubmit} style={{border: 'solid 3px #03102C', marginTop:'30vh', width: '420px'}}>
            <h4 style={{paddingBottom: '5px', margin: 0, background: '#03102C'}}>{<i className="fa fa-mail-reply" style={{cursor:'pointer'}} onClick={() => navigate('../')}></i>} Ingresa tus credenciales</h4>  
                <form className="ingreso" onSubmit={handleSubmit} style={{justifyContent: "center", padding: 10}}>
                    <input 
                        type="text"
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                        placeholder="Ingresa nombre de usuario"
                    />
                    <input 
                        type="password"
                        value={contraseña}
                        onChange={e => setContraseña(e.target.value)}
                        placeholder="Ingresa contraseña"
                    />
                    {nombre.length === 0|| contraseña.length === 0
                        ?<button className="btn" style={{background:'#A90429', color:'white'}}>Iniciar sesión</button>
                        :<button className="btn" style={{background:'#A90429', color:'white'}} onClick={verificaUsuario}>Iniciar sesión</button>}
                </form>
                {error && <p className="bg-white text-danger m-0">Todos los campos son obligatorios</p>}
            </div>

            {/* ERROR */}
            <div className="d-flex justify-content-center">
                {existe == false && <div className="alert alert-danger alert-dismissible text-center fade show shadow col-5 m-2">
                    <button type="button" className="close" data-dismiss="alert" onClick={() => setExiste(null)}>&times;</button>
                    <strong>¡Usuario no encontrado!</strong> Escribiste mal el usuario o la contraseña, intentalo de nuevo.
                </div>}
                {autorizado == false && <div className="alert alert-danger alert-dismissible text-center fade show shadow col-5 m-2">
                    <button type="button" className="close" data-dismiss="alert" onClick={() => setAutorizado(null)}>&times;</button>
                    <strong>¡No autorizado!</strong> Tu usuario no cuenta con los permisos necesarios para entrar.
                </div>}
            </div>

        </div>
    )
}

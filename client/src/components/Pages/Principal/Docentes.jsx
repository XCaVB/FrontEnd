import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getProfesorUser, getUsuarioCorreo } from "../../../api/horario.api"
import '../../../css/ingreso.css'
import fondo from "../../../images/fondo2.jpg"
import { Link } from "react-router-dom"
import { Header } from "../../Headers/Header"

export function Docentes(){
    const [correo, setNombre] = useState('')
    const [contraseña, setContraseña] = useState('')
    const [error, setError] = useState(false)
    const [existe, setExiste] = useState(null)

    const handleSubmit = (e) => {
        e.preventDefault()

        if(correo === '' || contraseña === ''){
            setError(true)
            return
        }
    }

    const navigate = useNavigate();

    async function verificaUsuario(){
        try {
            const response = await getUsuarioCorreo(correo);

            if (response.data.length != 0) {
                setExiste(true)
                const user = response.data[0].id
                const {data} = await getProfesorUser(user)
                navigate(`/docentes/${data[0].id}`)
            } else {
                setExiste(false)
            }
        } catch {
            window.alert("Ha ocurrido un error, intentalo de nuevo.")
        }
    }

    return(
        <div style={{height:'100vh',backgroundImage: `url(${fondo})`, backgroundSize: 'cover'}}>
            <Header estado={"salir"}/>
            <div className="container text-white text-center rounded shadow p-0" onSubmit={handleSubmit} style={{border: 'solid 3px #03102C', marginTop:'25vh', width: '420px'}}>
            <h4 style={{paddingBottom: '5px', margin: 0, background: '#03102C'}}>Ingresa tus credenciales</h4>  
                <form className="ingreso" onSubmit={handleSubmit} style={{justifyContent: "center", padding: 10}}>
                    <input 
                        id="correo"
                        type="text"
                        value={correo}
                        onChange={e => setNombre(e.target.value)}
                        placeholder="Correo Electronico"
                    />
                    <input 
                        id="password"
                        type="password"
                        value={contraseña}
                        onChange={e => setContraseña(e.target.value)}
                        placeholder="Contraseña"
                    />
                    {correo.length === 0|| contraseña.length === 0
                        ?<button className="btn" style={{background:'#A90429', color:'white'}}>Iniciar sesión</button>
                        :<button className="btn" style={{background:'#A90429', color:'white'}} onClick={verificaUsuario}>Iniciar sesión</button>}
                </form>
                {error && <p className="bg-white text-danger m-0">Todos los campos son obligatorios</p>}
                
            </div>
            {/* ERROR */}
            <div className="d-flex justify-content-center">
                {existe == false && <div className="alert alert-danger alert-dismissible text-center fade show shadow col-5 m-2">
                    <button type="button" className="close" data-dismiss="alert" onClick={() => setExiste(null)}>&times;</button>
                    <strong>¡Usuario no encontrado!</strong> Escribiste mal el correo o la contraseña, intentalo de nuevo.
                </div>}
            </div>
        </div>
    )
}
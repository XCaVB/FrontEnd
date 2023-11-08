import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { getAllUsuarios, getAllProfesores } from "../../../api/horario.api"
import '../../../css/ingreso.css'
import fondo from "../../../images/fondo2.jpg"
import { Link } from "react-router-dom"
import { Header } from "../../Headers/Header"

export function Docentes(){
    const [nombre, setNombre] = useState('')
    const [contraseña, setContraseña] = useState('')
    const [error, setError] = useState(false)
    const [existe, setExiste] = useState(null)

    const handleSubmit = (e) => {
        e.preventDefault()

        if(nombre === '' || contraseña === ''){
            setError(true)
            return
        }
    }

    const navigate = useNavigate();

    async function verificaUsuario(){
        try {
            const {data} = await getAllUsuarios();
            for (const usuario of data) {
                if (usuario.email.includes(nombre)) {
                    setExiste(true)
                    const {data} = await getAllProfesores();
                    for (const profesor of data) {
                        if (usuario.id === profesor.user) {
                            navigate(`/docentes/${profesor.id}`)
                            break;
                        }
                    }
                break;}
            } setExiste(false)
            console.log("No existe jaja");
        } catch {
            window.alert("todo mal")
        }
    }

    return(
        <div style={{height:'100vh',backgroundImage: `url(${fondo})`, backgroundSize: 'cover'}}>
            <Header estado={"salir"}/>
            <div className="container text-white text-center rounded p-0" onSubmit={handleSubmit} style={{border: 'solid 3px #03102C', marginTop:'25vh', width: '420px'}}>
            <h4 style={{paddingBottom: '5px', margin: 0, background: '#03102C'}}>Ingresa tus credenciales</h4>  
                <form className="ingreso" onSubmit={handleSubmit} style={{justifyContent: "center", padding: 10}}>
                    <input 
                        id="correo"
                        type="text"
                        value={nombre}
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
                    {nombre.length === 0|| contraseña.length === 0
                        ?<button className="btn" style={{background:'#A90429', color:'white'}}>Iniciar sesión</button>
                        :<button className="btn" style={{background:'#A90429', color:'white'}} onClick={verificaUsuario}>Iniciar sesión</button>}
                </form>
                {error && <p className="bg-white text-danger m-0">Todos los campos son obligatorios</p>}
            </div>
        </div>
    )
}
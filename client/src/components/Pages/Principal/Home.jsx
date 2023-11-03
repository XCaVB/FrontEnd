import { Link } from "react-router-dom"
import "../../../css/styles.css"
import fondo1 from "../../../images/fondo1.jpg"
import { Header } from "../../Headers/Header"

export function Home(){
    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return(
        <div style={{height:'100vh',backgroundImage: `url(${fondo1})`, backgroundSize: 'cover'}}>
            <Header estado={"home"}/>
            <div className="container text-white text-center rounded p-0" onSubmit={handleSubmit} style={{border: 'solid 3px #03102C', marginTop:'25vh', width: '420px'}}>
                <h1 style={{paddingBottom: '5px', margin: 0, background: '#03102C'}}>Iniciar Sesión</h1>  
                <form className='ingreso' style={{justifyContent: "center", padding: 10}}>
                    <Link className="btn" to={'/docentes'} style={{background: '#A90429', color:'white'}}>DOCENTES</Link>
                    <Link className="btn" to={'/administrativos'} style={{background: '#A90429', color:'white'}}>ADMINISTRATIVOS</Link>
                    <Link className="btn" to={'/bd-management'} style={{background: '#A90429', color:'white'}}>BD MANAGEMENT</Link>
                </form>
            </div>
        </div>
    )
}
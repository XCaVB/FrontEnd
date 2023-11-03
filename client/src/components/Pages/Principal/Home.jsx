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
                    <button className="btn" style={{background: '#A90429'}}><Link to={'/docentes'} style={{color:'white'}}>DOCENTES</Link></button>
                    <button className="btn" style={{background: '#A90429'}}><Link to={'/administrativos'} style={{color:'white'}}>ADMINISTRATIVOS</Link></button>
                    <button className="btn" style={{background: '#A90429'}}><Link to={'/bd-management'} style={{color:'white'}}>BD MANAGEMENT</Link></button>
                </form>
            </div>
        </div>
    )
}
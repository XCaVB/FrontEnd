import { Link } from "react-router-dom"
import "../css/styles.css"
import { HeaderHome } from "./HeaderHome"

export function Home(){
    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return(
        <div>
            <HeaderHome />
            <div className="login" onSubmit={handleSubmit}>
                <h1>Login</h1>  
                <hr />
                <form className='ingreso' style={{justifyContent: "center"}}>
                    <button className="btn" style={{background: 'gray'}}><Link to={'/Docentes'} style={{color:'white'}}>DOCENTES</Link></button>
                    <button className="btn" style={{background: 'gray'}}><Link to={'/Administrativos'} style={{color:'white'}}>ADMINISTRATIVOS</Link></button>
                </form>
                <hr />
            </div>
        </div>
    )
}
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
                    <button><Link to={'/Docentes'}>DOCENTES</Link></button>
                    <button><Link to={'/Administrativos'}>ADMINISTRATIVOS</Link></button>
                </form>
                <hr />
            </div>
        </div>
    )
}
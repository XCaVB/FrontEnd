import { Link } from "react-router-dom"

export function Home(){
    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return(
        <div onSubmit={handleSubmit}>
            <h1>Login</h1>
            <form className='ingreso'>
                <button><Link to={'/Docentes'}>DOCENTES</Link></button>
                <button><Link to={'/Administrativos'}>ADMINISTRATIVOS</Link></button>
                <button><Link to={'/Local'}>LOCAL</Link></button>
            </form>
        </div>
    )
}
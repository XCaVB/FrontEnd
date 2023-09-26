import './Ingreso.css'
import { Docentes } from './Docentes'
import { Administrativos } from './Administrativos'
import { Local } from './Local'

export function Ingreso(){
    return(
        <div>
            <h1>Login</h1>
            <form className='ingreso'>
                <button>DOCENTES</button>
                <button>ADMINISTRATIVOS</button>
                <button>LOCAL</button>
            </form>
        </div>
    )
}
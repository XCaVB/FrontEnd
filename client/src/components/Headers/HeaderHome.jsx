import logo from "../../images/logo.png"
import "../../css/styles.css"

export function HeaderHome(){

    return(
        <header className="header">
                <div className="row align-items-center m-0">
                    <div className="col-2 logo">
                        {/*Logo UNAB*/}
                        <img src={logo} alt="Logo UNAB" className="img-fluid"/>  
                    </div>
                    <div className="col-9 mr-auto">
                        {/*Nombre UNAB*/}
                        <h1 className="text-center">Universidad Andrés Bello</h1>
                    </div>
                </div>
        </header>
    )
}
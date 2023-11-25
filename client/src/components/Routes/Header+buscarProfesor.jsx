import { BarraBuscadora } from "../Pages/Secretaria/barraBuscadora"
import { Header } from "../Headers/Header"
import { useLocation, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

export function BuscarProfesor(){

    const info = useLocation()
    const navigate = useNavigate()

    useEffect(() => { 
        if (info.state === null) {
            navigate('/')
        }
    })

    return(
        <>
            <Header estado={"cerrar"}/>
            <BarraBuscadora/>
        </>
    )
}
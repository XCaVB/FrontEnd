import axios from 'axios'

//---HORARIO---//
const horariosApi = axios.create({
    baseURL: 'http://localhost:8000/api/profesor/'
})

export const getAllHorarios = () => horariosApi.get('/')

export const getHorario = (id) => horariosApi.get(`/${id}/`)

export const createHorario = (horario) => horariosApi.post('/', horario)

export const deleteHorario = (id) => horariosApi.delete(`/${id}`)

export const updateHorario = (id, horario) => horariosApi.put(`/${id}/`, horario)

//---USUARIOS---//
const usuariosApi = axios.create({
    baseURL: 'http://localhost:8000/api/user/'
})

export const getAllUsuarios = () => usuariosApi.get('/')

export const createUsuario = (usuario) => usuariosApi.post('/', usuario)

export const updateUsuario = (id, usuario) => horariosApi.put(`${id}`, usuario)

export const deleteUsuario = (id) => usuariosApi.delete(`/${id}`)
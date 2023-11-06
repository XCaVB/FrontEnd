import axios from 'axios'

//...Direcciones...// 
//Core: Usuario, rut
//Planificacion: Secretario academico, planificacion academica, curso.
//Disponibilidad: profesor, profesor-curso
//Auditoria: auditoria, admin

//---HORARIO---//
const horariosApi = axios.create({
    baseURL: 'http://localhost:8000/disponibilidad/profesor/'
})

export const getAllHorarios = () => horariosApi.get('/')

export const getHorario = (id) => horariosApi.get(`/${id}/`)

export const createHorario = (horario) => horariosApi.post('/', horario)

export const deleteHorario = (id) => horariosApi.delete(`/${id}`)

export const updateHorario = (id, horario) => horariosApi.put(`/${id}/`, horario)

//---USUARIOS---//
const usuariosApi = axios.create({
    baseURL: 'http://localhost:8000/core/user/'
})

export const getAllUsuarios = () => usuariosApi.get('/')

export const createUsuario = (usuario) => usuariosApi.post('/', usuario)

export const updateUsuario = (id, usuario) => usuariosApi.put(`/${id}/`, usuario)

export const deleteUsuario = (id) => usuariosApi.delete(`/${id}`)

//---BarraBuscadora---//
const barraBuscadoraApi = axios.create({
    baseURL: 'http://localhost:8000/'
})

export const getUsuarios = () => barraBuscadoraApi.get('/core/user')

export const getUsuariosRut = () => barraBuscadoraApi.get('/core/rut')

export const getUsuariosID = (id) => barraBuscadoraApi.get(`/core/user/${id}`)

export const getProfesores = () => barraBuscadoraApi.get('/disponibilidad/profesor/')

export const getProfesoresID = (id) => barraBuscadoraApi.get(`/disponibilidad/profesor/${id}`)

//---BarraBuscadora---//
const EdicionHorariaAPI = axios.create({
    baseURL: 'http://localhost:8000/'
})

export const getCurso = () => EdicionHorariaAPI.get('/curso/')

export const getCursoID = (id) => EdicionHorariaAPI.get(`/curso/${id}`)

export const getProfesorCurso = () => EdicionHorariaAPI.get('/profesor-curso/')

export const getProfesorCursoID = (profesor) => EdicionHorariaAPI.get(`/profesor-curso/${profesor}`)

export const createCursosHorario = (curso) => EdicionHorariaAPI.post("/profesor-curso/", curso)

export const updateCursosHorario = (id, curso) => EdicionHorariaAPI.put(`/profesor-curso/${id}/`, curso)

import axios from 'axios'

//...Direcciones...// 
//Core: Usuario, rut
//Planificacion: Secretario academico, planificacion academica, curso.
//Disponibilidad: profesor, profesor-curso
//Auditoria: auditoria, admin

//---PROFESOR---//
const profesoresApi = axios.create({
    baseURL: 'http://localhost:8000/disponibilidad/profesor/'
})

export const getAllProfesores = () => profesoresApi.get('/')

export const getProfesor = (id) => profesoresApi.get(`/${id}/`)

export const createProfesor = (profesor) => profesoresApi.post('/', profesor)

export const deleteProfesor = (id) => profesoresApi.delete(`/${id}`)

export const updateProfesor = (id, profesor) => profesoresApi.put(`/${id}/`, profesor)

//---USUARIOS---//
const usuariosApi = axios.create({
    baseURL: 'http://localhost:8000/core/user/'
})

export const getAllUsuarios = () => usuariosApi.get('/')

export const createUsuario = (usuario) => usuariosApi.post('/', usuario)

export const updateUsuario = (id, usuario) => usuariosApi.put(`/${id}/`, usuario)

export const deleteUsuario = (id) => usuariosApi.delete(`/${id}`)

//---HORARIO---//
export const getHorario = (correo) => {
    const {usuarios} = getAllUsuarios();
    
}

//---BarraBuscadora---//
const barraBuscadoraApi = axios.create({
    baseURL: 'http://localhost:8000/'
})

export const getUsuarios = () => barraBuscadoraApi.get('/core/user')

export const getUsuariosRut = () => barraBuscadoraApi.get('/core/user_data')

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

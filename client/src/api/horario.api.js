import axios from 'axios'

//...Direcciones...// 
//Core: Usuario, user_data
//Planificacion: Secretario academico, planificacion academica, curso.
//Disponibilidad: profesor
//Auditoria: auditoria, admin

//---PROFESOR---//
const profesoresApi = axios.create({
    baseURL: 'http://localhost:8000/disponibilidad/profesor/'
})

export const getAllProfesores = () => profesoresApi.get('/')

export const getProfesor = (id) => profesoresApi.get(`/${id}/`)

export const getProfesorUser = (user) => profesoresApi.get(`/?search=${user}`)

export const createProfesor = (profesor) => profesoresApi.post('/', profesor)

export const deleteProfesor = (id) => profesoresApi.delete(`/${id}`)

export const updateProfesor = (id, profesor) => profesoresApi.put(`/${id}/`, profesor)

//---USUARIOS---//
const usuariosApi = axios.create({
    baseURL: 'http://localhost:8000/core/user/'
})

export const getAllUsuarios = () => usuariosApi.get('/')

export const getUsuario = (id) => usuariosApi.get(`/${id}/`)

export const getUsuarioCorreo = (correo) => usuariosApi.get(`/?search=${correo}`)

export const createUsuario = (usuario) => usuariosApi.post('/', usuario)

export const updateUsuario = (id, usuario) => usuariosApi.put(`/${id}/`, usuario)

export const deleteUsuario = (id) => usuariosApi.delete(`/${id}`)

//---CURSOS---//
const cursosApi = axios.create({
    baseURL: 'http://localhost:8000/planificacion/curso/'
})

export const getAllCursos = () => cursosApi.get('/')

export const getCursoID = (id) => cursosApi.get(`/${id}/`)

export const createCurso = (curso) => cursosApi.post('/', curso)

export const updateCurso = (id, curso) => cursosApi.put(`/${id}`, curso)

export const deleteCurso = (id) => cursosApi.delete(`/${id}`)

//---BarraBuscadora---//
const barraBuscadoraApi = axios.create({
    baseURL: 'http://localhost:8000/'
})

export const getUsuarios = () => barraBuscadoraApi.get('/core/user')

export const getUsuariosRut = () => barraBuscadoraApi.get('/core/user_data')

export const getUsuariosID = (id) => barraBuscadoraApi.get(`/core/user/${id}`)

export const getProfesores = () => barraBuscadoraApi.get('/disponibilidad/profesor/')

export const getProfesoresID = (id) => barraBuscadoraApi.get(`/disponibilidad/profesor/${id}`)

//---EDICION HORARIA---//
const EdicionHorariaAPI = axios.create({
    baseURL: 'http://localhost:8000/'
})

export const getCurso = () => EdicionHorariaAPI.get('planificacion/curso/')

export const getPlanificacionAcad = () => EdicionHorariaAPI.get('planificacion/planificacion-academica/')

export const createPlanificacionAcad = (planificacion) => EdicionHorariaAPI.post('planificacion/planificacion-academica/', planificacion)

export const updatePlanificacionAcad = (id, planificacion) => EdicionHorariaAPI.put(`planificacion/planificacion-academica/${id}/`, planificacion)

export const deletePlanificacionAcad = (id) => EdicionHorariaAPI.delete(`planificacion/planificacion-academica/${id}/`)

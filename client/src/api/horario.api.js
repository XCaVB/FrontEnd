import axios from 'axios'

//...Direcciones...// 
//Core: Usuario, user_data
//Planificacion: Secretario academico, planificacion academica, curso.
//Disponibilidad: profesor
//Auditoria: auditoria, admin

//Hora-Chile//
const timeApi = axios.create({
    baseURL: 'https://worldtimeapi.org/api/timezone/America/Santiago'
})

export const getHoraChile = () => timeApi.get('/')

//Login//
const loginApi = axios.create({
    baseURL: 'http://3.82.119.255:443/'
})

export const loginDocente = (data) => loginApi.post('/logindocente/', data)
export const loginAdministrativo = (data) => loginApi.post('/loginsecretario/', data)

//---PROFESOR---//
const profesoresApi = axios.create({
    baseURL: 'http://3.82.119.255:443/disponibilidad/profesor/'
})

export const getAllProfesores = () => profesoresApi.get('/')

export const getProfesor = (id) => profesoresApi.get(`/${id}/`)

export const getProfesorUser = (user) => profesoresApi.get(`/?search=${user}`)

export const createProfesor = (profesor) => profesoresApi.post('/', profesor)

export const deleteProfesor = (id) => profesoresApi.delete(`/${id}`)

export const updateProfesor = (id, profesor) => profesoresApi.put(`/${id}/`, profesor)

//---USUARIOS---//
const usuariosApi = axios.create({
    baseURL: 'http://3.82.119.255:443/core/user/'
})

export const getAllUsuarios = () => usuariosApi.get('/')

export const getUsuario = (id) => usuariosApi.get(`/${id}/`)

export const getUsuarioCorreo = (correo) => usuariosApi.get(`/?search=${correo}`)

export const createUsuario = (usuario) => usuariosApi.post('/', usuario)

export const updateUsuario = (id, usuario) => usuariosApi.put(`/${id}/`, usuario)

export const deleteUsuario = (id) => usuariosApi.delete(`/${id}`)

//--DATA USUARIOS--//
const usuario_dataApi = axios.create({
    baseURL: 'http://3.82.119.255:443/core/user_data/'
})

export const getAllUserData = () => usuario_dataApi.get('/')

//---CURSOS---//
const cursosApi = axios.create({
    baseURL: 'http://3.82.119.255:443/planificacion/curso/'
})

export const getAllCursos = () => cursosApi.get('/')

export const getCursoID = (id) => cursosApi.get(`/${id}/`)

export const createCurso = (curso) => cursosApi.post('/', curso)

export const updateCurso = (id, curso) => cursosApi.put(`/${id}`, curso)

export const deleteCurso = (id) => cursosApi.delete(`/${id}`)

//---PLANIFICACION ACADEMICA---//
const planApi = axios.create({
    baseURL: 'http://3.82.119.255:443/planificacion/planificacion-academica/'
})

export const getAllPlanificacion = () => planApi.get('/')

export const getPlanificacion = (id) => planApi.get(`/${id}/`)

export const createPlanificacion = (curso) => planApi.post('/', curso)

export const updatePlanificacion = (id, curso) => planApi.put(`/${id}/`, curso)

export const deletePlanificacion = (id) => planApi.delete(`/${id}`)

//---AUDITORIA---//

const auditoriaApi = axios.create({
    baseURL: 'http://3.82.119.255:443/auditoria/auditoria/'
})

export const getAllAuditorias = () => auditoriaApi.get('/')

export const getAuditoria = (id) => auditoriaApi.get(`/${id}/`)

export const createAuditoria = (auditoria) => auditoriaApi.post('/', auditoria)

export const deleteAuditoria = (id) => auditoriaApi.delete(`/${id}`)

//---BarraBuscadora---//
const barraBuscadoraApi = axios.create({
    baseURL: 'http://3.82.119.255:443/'
})

export const getUsuarios = () => barraBuscadoraApi.get('/core/user')

export const getUsuariosRut = () => barraBuscadoraApi.get('/core/user_data')

export const getUsuariosID = (id) => barraBuscadoraApi.get(`/core/user/${id}`)

export const getProfesores = () => barraBuscadoraApi.get('/disponibilidad/profesor/')

export const getProfesoresID = (id) => barraBuscadoraApi.get(`/disponibilidad/profesor/${id}`)

//---EDICION HORARIA---//
const EdicionHorariaAPI = axios.create({
    baseURL: 'http://3.82.119.255:443/'
})

export const getCurso = () => EdicionHorariaAPI.get('planificacion/curso/')

export const getPlanificacionAcad = () => EdicionHorariaAPI.get('planificacion/planificacion-academica/')

export const createPlanificacionAcad = (planificacion) => EdicionHorariaAPI.post('planificacion/planificacion-academica/', planificacion)

export const updatePlanificacionAcad = (id, planificacion) => EdicionHorariaAPI.put(`planificacion/planificacion-academica/${id}/`, planificacion)

export const deletePlanificacionAcad = (id) => EdicionHorariaAPI.delete(`planificacion/planificacion-academica/${id}/`)

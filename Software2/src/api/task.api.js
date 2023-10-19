import axios from 'axios'

const taskApi = axios.create({
    baseURL: ''
})

export const getAllTasks = () => {
    return taskApi.get('/');
}

export const createTasks = (task) => {
    return taskApi.post('/', task);
}
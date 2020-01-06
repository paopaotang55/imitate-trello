import { fetchGet, fetchPost } from './fetch'

export const reqRegister = (data) => fetchPost('/register', data)

export const reqLogin = (data) => fetchPost('/login', data)


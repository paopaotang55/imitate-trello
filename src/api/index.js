import { fetchGet, fetchPost, fetchDelete, fetchPut } from './fetch'

//유저 로그인 회원가입 회원탈퇴
export const reqRegister = (data) => fetchPost('/register', data)

export const reqLogin = (data) => fetchPost('/login', data)

export const reqDeleteUser = () => fetchDelete('/deleteUser', '')

export const reqEditPassword = (data) => fetchPut('/editPassword', data)

//board 전체가져오기 추가 수정 삭제  
export const reqGetBoards = () => fetchGet('/getBoards', '')

export const reqAddBoard = (data) => fetchPost('/addBoard', data)

export const reqEditBoard = (data) => fetchPut('/editBoard', data)

export const reqDeleteBoard = (data) => fetchDelete('/deleteBoard', data)

//container 와 card 전체가져오기 추가 수정 삭제  
export const reqGetContainers = (data) => fetchGet('/getContainers', data)

export const reqAddContainer = (data) => fetchPost('/addContainer', data)

export const reqAddCard = (data) => fetchPost('/addCard', data)

export const reqDeleteCard = (data) => fetchDelete('/deleteCard', data)

export const reqDeleteContainer = (data) => fetchDelete('/deleteContainer', data)

export const reqEditContainer = (data) => fetchPut('/editContainer', data)

export const reqEditCard = (data) => fetchPut('/editCard', data)










localStorage.getItem('@App:user')
const userJson = JSON.parse(window.localStorage.getItem('@App:user') || '{}')
window.localStorage.getItem('@App:user')

export const getUserIdByLocalStoraged = userJson.id
export const getComarcaIdByLocalStoraged = userJson.comarcaId

import createHttp from './BaseService'

const http = createHttp(true)

export const create1 = (data) => http.post ('/menu',data)
export const find1   = ()     => http.get  ('/menu')
export const findByIdMenu= (id) => http.get  (`/menu/${id}`)
export const findByIdAndDeleteMenu = (id)   => http.delete(`/menu/${id}`)
export const findByIdAndUpdateMenu= (id,data) => http.patch(`/menu/${id}`,data)

export const getDNDmenu   = ()     => http.get  ('/dndmenu')
export const patchDNDmenu = (data) => http.patch(`/dndmenu/`,data)


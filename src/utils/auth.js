import Cookies from 'js-cookie'

const TokenKey = 'Token'

export function getToken() {
    return Cookies.get(TokenKey)
}

export function setToken(token) {
    return Cookies.set(TokenKey, token)
}

export function removeToken() {
    return Cookies.remove(TokenKey)
}

export function getData(name) {
    return Cookies.get(name)
}

export function setData(name, data) {
    return Cookies.set(name, data)
}

export function removeData(name) {
    return Cookies.remove(name)
}
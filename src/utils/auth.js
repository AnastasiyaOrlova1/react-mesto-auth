export const baseUrl = 'https://auth.nomoreparties.co';

export const register = (email, password) => {
    return fetch(`${baseUrl}/signup`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ password, email })
        })
        .then(checkResponse)
}

export const authorize = ({ password, email }) => {
    return fetch(`${baseUrl}/signin`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ password, email })
        })
        .then(checkResponse)
};

export const checkToken = (token) => {
    return fetch(`${baseUrl}/users/me`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        })
        .then(checkResponse)
}

const checkResponse = (res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.statusText}`)
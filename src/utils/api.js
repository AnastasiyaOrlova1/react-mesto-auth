class Api {
    constructor({ url, headers }) {
        this._url = url;
        this._headers = headers
    }
    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }
    getInitialCards() {
        return fetch(`${this._url}cards`, {
                headers: this._headers
            })
            .then(this._checkResponse)
    }
    getProfileInfo() {
        return fetch(`${this._url}users/me`, {
                headers: this._headers
            })
            .then(this._checkResponse)

    }
    editProfile(formData) {
        return fetch(`${this._url}users/me`, {
                method: 'PATCH',
                headers: this._headers,
                body: JSON.stringify({
                    name: formData.name,
                    about: formData.about
                })
            })
            .then(this._checkResponse)
    }
    postCard(newCard) {
        return fetch(`${this._url}cards`, {
                method: 'POST',
                headers: this._headers,
                body: JSON.stringify({
                    name: newCard.name,
                    link: newCard.link
                })
            })
            .then(this._checkResponse)
    }
    removeCard(item) {
        return fetch(`${this._url}cards/${item._id}`, {
                method: "DELETE",
                headers: this._headers,
            })
            .then(this._checkResponse)
    }
    changeLikeCardStatus(id, isLiked) {
        return fetch(`${this._url}cards/likes/${id}`, {
                method: isLiked ? 'PUT' : 'DELETE',
                headers: this._headers,
            })
            .then(this._checkResponse)
    }

    updateAvatar(linkAvatar) {
        return fetch(`${this._url}users/me/avatar`, {
                method: 'PATCH',
                headers: this._headers,
                body: JSON.stringify({
                    avatar: linkAvatar.avatar
                })
            })
            .then(this._checkResponse)
    }
}

const config = {
    url: 'https://mesto.nomoreparties.co/v1/cohort-27/',
    headers: {
        authorization: '1c569080-bc35-458b-a387-7ec8b91017a5',
        'Content-Type': 'application/json'
    }
}

const api = new Api(config)

export default api;
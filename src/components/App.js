import React, { useState, useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from '../utils/api';

import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';



function App() {

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isDeletePopup, setIsDeletePopup] = useState(false);
    const [selectedCard, setSelectedCard] = useState({ name: '', link: '' });
    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);

    useEffect(() => {
        api.getProfileInfo()
            .then((res) => {
                setCurrentUser(res);
            })
            .catch((err) => {
                console.error(err);
            });

        api.getInitialCards()
            .then((data) => {
                setCards(data);
            })
            .catch((err) => {
                console.error(err);
            })
    }, [])

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }
    function handleDeleteCard() {
        setIsDeletePopup(true);
    }

    function closeAllPopups() {
        setIsEditProfilePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsDeletePopup(false);
        setSelectedCard({ name: '', link: '' });
    }

    function handleCardClick(Card) {
        setSelectedCard(Card);
    }

    function handleCardLike(card) {

        const isLiked = card.likes.some(i => i._id === currentUser._id);

        api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
            .catch((err) => {
                console.error(err);
            });
    }

    function handleCardDelete(deleteCard) {
        api.removeCard(deleteCard)
            .then(() => {
                const newArr = cards.filter(card => card !== deleteCard);
                setCards(newArr);
            })
            .catch((err) => {
                console.error(err);
            })
    }

    function handleUpdateUser(formData) {
        api.editProfile(formData)
            .then((res) => {
                setCurrentUser(res);
                closeAllPopups();
            })
            .catch((err) => {
                console.error(err);
            });
    }

    function handleUpdateAvatar(formData) {
       api.updateAvatar(formData)
            .then((res) => {
                setCurrentUser(res);
                closeAllPopups();
            })
            .catch((err) => {
                console.error(err);
            });
        
    }

    function handleAddPlaceSubmit(newCard) {
        api.postCard(newCard)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch((err) => {
                console.error(err);
            });
    }


    return (
        <div className="page">
            <CurrentUserContext.Provider value={currentUser}>
                <Header />
                <Main
                    onEditAvatar={handleEditAvatarClick}
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onCardClick={handleCardClick}
                    onRemoveCard={handleDeleteCard}
                    cards={cards}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                />
                <ImagePopup
                    card={selectedCard}
                    onClose={closeAllPopups} />
                <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser} />
                <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar} />
                <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    onAddPlace={handleAddPlaceSubmit}
                />
                <PopupWithForm
                    isOpen={isDeletePopup}
                    onClose={closeAllPopups}
                    name='delete-card-form'
                    title='Вы уверены?'
                    textButton='Да' />
                <Footer />
            </CurrentUserContext.Provider>

        </div>
    );
}

export default App;


/*<PopupWithForm
                isOpen={isEditProfilePopupOpen}
                onClose ={closeAllPopups}
                name='edit-profile-form'
                title='Редактирование профиля'
                textButton='Сохранить'>
                <input type="text" className="popup__input" name="name" id="name" required minLength="2" maxLength="40" />
                <span id="name-error" className="error"></span>
                <input type="text" className="popup__input" name="about" id="about-me" required minLength="2" maxLength="200" />
                <span id="about-me-error" className="error"></span>
            </PopupWithForm>
            <PopupWithForm
                isOpen={isEditAvatarPopupOpen}
                onClose ={closeAllPopups}
                name='avatar-form'
                title='Обновить аватар'
                textButton='Сохранить'>
                <input type="url" className="popup__input" name="link" id="avatar-link" placeholder="Название" required />
                <span id="avatar-link-error" className="error"></span>
            </PopupWithForm>
            <PopupWithForm
             isOpen={isAddPlacePopupOpen}
             onClose ={closeAllPopups}
              name='add-card-form'
               title='Новое место'
               textButton='Создать'>
                <input type="text" className="popup__input" name="name" id="place-name" placeholder="Название" required minLength="2" maxLength="30" />
                <span id="place-name-error" className="error"></span>
                <input type="url" className="popup__input" name="link" id="image-link" placeholder="Ссылка на картинку" required />
                <span id="image-link-error" className="error"></span>
            </PopupWithForm>*/
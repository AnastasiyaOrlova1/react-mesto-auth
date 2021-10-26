import React, { useRef } from 'react'
import PopupWithForm from './PopupWithForm.js';


function EditAvatarPopup(props) {
    const avatarRef = useRef();


    function handleSubmit(e) {
        e.preventDefault();

        props.onUpdateAvatar({
            avatar: avatarRef.current.value,
        });
        console.log(avatarRef);
    }

   
    return (
        <PopupWithForm
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
            name='avatar-form'
            title='Обновить аватар'
            textButton='Сохранить'>
            <input ref={avatarRef} type="url" className="popup__input" name="link" id="avatar-link" placeholder="Название" required />
            <span id="avatar-link-error" className="error"></span>
        </PopupWithForm>
    )
}
  

export default EditAvatarPopup;
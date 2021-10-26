import React from 'react';
import projectLogo from '../images/logo.svg';


function Header() {
    return ( 
        <header className = "header" >
        <img src = { projectLogo } alt = "Логотип" className = "header__logo" />
        </header> 
    )
}
export default Header;
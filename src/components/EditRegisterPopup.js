import { useState } from "react";
import PopupWithForm from "./PopupWithForm";
import nokRegister from "../images/Union-nok.png";
import okRegister from "../images/Union-ok.png";

//Вы успешно зарегистрировались!
//Что-то пошло не так!
//Попробуйте ещё раз.

function EditProfilePopup(props) {    
  return (
    <PopupWithForm 

    image={props.isSuccessfulRegistration ? okRegister : nokRegister}

    title={props.isSuccessfulRegistration ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}


    isOpen={props.isOpen} 
    closeAllPopups={props.closeAllPopups} >
    </PopupWithForm>
  )
  
}

export default EditProfilePopup;

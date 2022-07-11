import { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup(props) {
  const { currentUser } = useContext(CurrentUserContext);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  function handleChangeName(e) {
    setName(e.target.value);
    inputNameValidation(e);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
    inputLinkValidation(e);    
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name: name,
      profession: description,
    });
  }

  const [isFormValiditi, setformValiditi] = useState({
    inputName: true,
    inputLink: true,
  });

  const [inputNameError, setInputNameError] = useState("");
  const inputNameValidation = (e) => {
    setInputNameError(e.target.validationMessage);
    setformValiditi({ ...isFormValiditi, inputName: e.target.validity.valid });
  };

  const [inputDescriptionkError, setInputDescriptionkError] = useState("");
  const inputLinkValidation = (e) => {
    setInputDescriptionkError(e.target.validationMessage);
    setformValiditi({ ...isFormValiditi, inputLink: e.target.validity.valid });
  };

  const isFormIsValid =
    isFormValiditi.inputName && isFormValiditi.inputLink
      ? "popup__save_valid"
      : "";

  const [isDisableStatus, setIsDisableStatus] = useState(false); // isDisableStatus отличается от остальных, так как функционал валидации этого попапа отличается.
  useEffect(() => {
    setIsDisableStatus(
      isFormValiditi.inputName && isFormValiditi.inputLink ? false : true
    );    
  }, [name, description, props.isOpen]);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
    setInputDescriptionkError("");
    setInputNameError("");
    setformValiditi({ ...isFormValiditi, inputName: true, inputLink: true });
  }, [currentUser, props.isOpen]);

  return (
    <PopupWithForm
      isDisableStatus={isDisableStatus}
      isFormIsValid={isFormIsValid}
      onSubmit={handleSubmit}
      isOpen={props.isOpen}
      closeAllPopups={props.closeAllPopups}
      name="edit-profile"
      title="Редактировать профиль"
      buttonText={props.buttonInfomationAboutSave}
    >
      <input
        value={name}
        onChange={handleChangeName}
        name="name"
        className="popup__input"
        id="popup-input-name"
        placeholder="Имя"
        minLength="2"
        maxLength="40"
        type="text"
        required
      />
      <span id="popup-input-name-error" className="popup__error">
        {inputNameError}
      </span>
      <input
        value={description}
        onChange={handleChangeDescription}
        name="profession"
        className="popup__input"
        id="popup-input-profession"
        placeholder="О себе"
        minLength="2"
        maxLength="200"
        type="text"
        required
      />
      <span id="popup-input-profession-error" className="popup__error">
        {inputDescriptionkError}
      </span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;

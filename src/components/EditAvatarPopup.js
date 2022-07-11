import { useEffect, useRef, useState } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const counterRef = useRef(null);

  const [isFormValiditi, setformValiditi] = useState({
    inputLink: false,
  });

  const [inputLinkError, setInputLinkError] = useState("");
  const inputLinkValidation = (e) => {
    setInputLinkError(e.target.validationMessage);
    setformValiditi({ ...isFormValiditi, inputLink: e.target.validity.valid });
  };

  const isFormIsValid = isFormValiditi.inputLink ? "popup__save_valid" : "";

  useEffect(() => {
    counterRef.current.value = "";
    setInputLinkError("");
    setformValiditi({ ...isFormValiditi, inputLink: false });
  }, [props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: counterRef.current.value,
    });
  }

  const isDisableStatus = isFormValiditi.inputLink ? false : true;

  return (
    <PopupWithForm
      isDisableStatus={isDisableStatus}
      onSubmit={handleSubmit}
      isOpen={props.isOpen}
      closeAllPopups={props.closeAllPopups}
      name="changl-avatar"
      title="Обновить Аватар"
      buttonText={props.buttonInfomationAboutSave}
      isFormIsValid={isFormIsValid}
    >
      <input
        ref={counterRef}
        onChange={(e) => inputLinkValidation(e)}
        name="link"
        className="popup__input"
        id="popup-input-avatar-src"
        placeholder="Ссылка на аватар"
        type="url"
        required
      />
      <span id="popup-input-avatar-src-error" className="popup__error">
        {inputLinkError}
      </span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;

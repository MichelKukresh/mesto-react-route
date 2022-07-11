import { useEffect, useRef, useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const refName = useRef(null);
  const refLink = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdatePlace({
      name: refName.current.value,
      link: refLink.current.value,
    });
  }

  const [isFormValiditi, setformValiditi] = useState({
    inputName: false,
    inputLink: false,
  });

  const [inputNameError, setInputNameError] = useState("");
  const inputNameValidation = (e) => {
    setInputNameError(e.target.validationMessage);
    setformValiditi({ ...isFormValiditi, inputName: e.target.validity.valid });
  };

  const [inputLinkError, setInputLinkError] = useState("");
  const inputLinkValidation = (e) => {
    setInputLinkError(e.target.validationMessage);
    setformValiditi({ ...isFormValiditi, inputLink: e.target.validity.valid });
  };

  const isFormIsValid =
    isFormValiditi.inputName && isFormValiditi.inputLink
      ? "popup__save_valid"
      : "";


      const isDisableStatus =
    (isFormValiditi.inputName && isFormValiditi.inputLink) ? false : true;

  useEffect(() => {
    refName.current.value = "";
    refLink.current.value = "";
    setInputNameError("");
    setInputLinkError("");
    setformValiditi({ ...isFormValiditi, inputName: false,
      inputLink: false, })    
  }, [props.isOpen]);

  return (
    <PopupWithForm
      isDisableStatus={isDisableStatus}
      onSubmit={handleSubmit}
      isOpen={props.isOpen}
      closeAllPopups={props.closeAllPopups}
      name="new-card"
      title="Новое место"
      buttonText={props.buttonInfomationAboutSave}
      isFormIsValid={isFormIsValid}
    >
      <input
        ref={refName}
        onChange={(e) => inputNameValidation(e)}
        name="name"
        className="popup__input"
        placeholder="Название"
        id="popup-card-input-site"
        minLength="2"
        maxLength="30"
        type="text"
        required
      />
      <span id="popup-card-input-site-error" className="popup__error">
        {inputNameError}
      </span>
      <input
        onChange={(e) => inputLinkValidation(e)}
        ref={refLink}
        name="link"
        className="popup__input"
        placeholder="Ссылка на название"
        id="popup-card-input-src"
        type="url"
        required
      />
      <span id="popup-card-input-src-error" className="popup__error">
        {inputLinkError}
      </span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;

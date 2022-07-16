function PopupWithForm(props) {
  return (
    <div
      className={` popup popup_type_${props.name} ${
        props.isOpen ? "popup_is-open" : ""
      }`}
    >
      <div className="popup__container">
        <button
          className="popup__close"
          type="button"
          onClick={() => props.closeAllPopups()}
        ></button>
        <h2 className="popup__title">{props.title}</h2>
        <form className="popup__content" name="popup-card-content" noValidate>
          {props.children}
          {props.buttonText && (
            <button
              className={`popup__save popup__save_invalid ${props.isFormIsValid}`}
              disabled={props.isDisableStatus}
              onClick={(e) => props.onSubmit(e)}
            >
              {props.buttonText}
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;

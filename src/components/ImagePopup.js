function ImagePopup(props) {
  return (
    <div
      className={` popup popup_type_image ${
        props.onCardClick.state && "popup_is-open"
      }`}
    >
      <div className="popup__containe-image">
        <button
          className="popup__close"
          type="button"
          onClick={() => props.closeAllPopups()}
        ></button>
        <img
          className="popup__image"
          id="size-image-element"
          src={props.onCardClick.link}
          alt={props.onCardClick.name}
        />
        <p className="popup__title-image" id="size-txt-element">
          {props.onCardClick.name}
        </p>
      </div>
    </div>
  );
}

export default ImagePopup;

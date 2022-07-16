import nokRegister from "../images/Union-nok.png";
import okRegister from "../images/Union-ok.png";

function InfoToolTip(props) {
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
        <img
          className="popup__image-register"
          src={props.isSuccessfulRegistration ? okRegister : nokRegister}
          alt="результат регистрации"
        />
        <h2 className="popup__title popup__title_register">
          {props.isSuccessfulRegistration
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте ещё раз."}
        </h2>
      </div>
    </div>
  );
}

export default InfoToolTip;

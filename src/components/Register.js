import { useState } from "react";
import { Link } from "react-router-dom";

function Register(props) {
  const [registerMail, setRegisterMail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  function handleOnCangleMail(e) {
    setRegisterMail(e.target.value);    
  }

  function handleOnCanglePassword(e) {
    setRegisterPassword(e.target.value);    
  }

  function submitRegister(e) {
    props.hahdleSubmitRegister(
      {
        email: registerMail,
        password: registerPassword,
      },
      e
    );
  }

  return (
    <section className="section auth">
      <h2 className="auth__title">Регистрация</h2>
      <form className="auth__form-container">
        <input
          className="auth____input-type"
          placeholder="Email"
          onChange={(e) => handleOnCangleMail(e)}
        ></input>
        <input
          className="auth____input-type"
          placeholder="Пароль"
          onChange={(e) => handleOnCanglePassword(e)}
        ></input>
        <button className="auth__button" onClick={(e) => submitRegister(e)}>
          Зарегистрироваться
        </button>
        <Link to="/sign-in" className="auth__text-auth">
          Уже зарегистрированы? Войти
        </Link>
      </form>
    </section>
  );
}

export default Register;

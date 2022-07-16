import { useState } from "react";
import { Link } from "react-router-dom";

function Register(props) {
  const [registerMail, setRegisterMail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  function handleMailChange(e) {
    setRegisterMail(e.target.value);    
  }

  function handlePasswordChange(e) {
    setRegisterPassword(e.target.value);    
  }

  function submitRegister(e) {
    e.preventDefault();
    props.hahdleSubmitRegister(
      {
        email: registerMail,
        password: registerPassword,
      }      
    );
  }

  return (
    <section className="section auth">
      <h2 className="auth__title">Регистрация</h2>
      <form className="auth__form-container">
        <input
          type="text" 
          className="auth____input-type"
          placeholder="Email"
          onChange={(e) => handleMailChange(e)}
          value={registerMail}
        />
        <input
          type="password" 
          className="auth____input-type"
          placeholder="Пароль"
          onChange={(e) => handlePasswordChange(e)}
          value={registerPassword}
        />
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

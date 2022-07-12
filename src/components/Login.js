import { useEffect, useState } from "react";

function Login(props) {
  const [loginMail, setLoginMail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  function handleMailChange(e) {
    setLoginMail(e.target.value);
  }

  function handleCPasswordhange(e) {
    setLoginPassword(e.target.value);
  }

  function submitLogin(e) {
    props.hahdleSubmitLogin(
      {
        email: loginMail,
        password: loginPassword,
      },
      e
    );
  }

  return (
    <section className="section auth">
      <h2 className="auth__title">Вход</h2>
      <form className="auth__form-container">
        <input
          type="text"
          className="auth____input-type"
          placeholder="Email"
          onChange={(e) => handleMailChange(e)}
        />
        <input
          type="password" 
          className="auth____input-type"
          placeholder="Пароль"
          onChange={(e) => handleCPasswordhange(e)}
        />
        <button className="auth__button" onClick={(e) => submitLogin(e)}>
          Войти
        </button>
      </form>
    </section>
  );
}

export default Login;

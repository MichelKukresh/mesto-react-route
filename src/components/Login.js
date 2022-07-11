import { useEffect, useState } from "react";

function Login(props) { 


  const [loginMail, setLoginMail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  function handleOnCangleMail(e) {
    setLoginMail(e.target.value);    
  }

  function handleOnCanglePassword(e) {
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
        <input className="auth____input-type" placeholder="Email" onChange={(e) => handleOnCangleMail(e)} ></input>
        <input className="auth____input-type" placeholder="Пароль" onChange={(e) => handleOnCanglePassword(e)}></input>
        <button className="auth__button" onClick={(e) => submitLogin(e)}>Войти</button>
      </form>
    </section>
  );
}

export default Login;

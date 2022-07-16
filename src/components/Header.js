import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.svg";

function Header(props) {
  const [isVisibleMenu, setVisibleMenu] = useState(true);

  function closeMenu() {
    if (isVisibleMenu) {
      setVisibleMenu(false);
    } else {
      setVisibleMenu(true);
    }
  }

  return (
    <header className="header section page__header">
      <div className="header__logo-button">
        <img className="header__logo" src={logo} alt="логотип" />
        {!isVisibleMenu ? (
          <button
            className="header__burger"
            onClick={() => closeMenu()}
            type="button"
          >
            <div className="header__burger-line"></div>
            <div className="header__burger-line"></div>
            <div className="header__burger-line"></div>
          </button>
        ) : (
          <button
            className="header__close-menu"
            type="button"
            onClick={() => closeMenu()}
          />
        )}
      </div>
      <div
        className={`header__mail-auth ${
          isVisibleMenu ? "" : "header__mail-auth_close"
        }`}
      >
        <h2 className="header__mail">{props.userDaraRegister.email}</h2>
        {props.typeButton ? (
          <button className="header__auth" onClick={() => props.handleLogaut()}>
            {props.textAuth}
          </button>
        ) : (
          <Link to={props.sign} className="header__auth">
            {props.textAuth}
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;

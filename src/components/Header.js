import { Link } from "react-router-dom";
import logo from "../images/logo.svg";

function Header(props) {  
  return (
    <header className="header section page__header">
      <img className="header__logo" src={logo} alt="логотип" />
      <div className="header__mail-auth">
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

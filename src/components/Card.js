import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import "./Card.js";

function Сard(props) {
  const { currentUser } = useContext(CurrentUserContext);

  function handleCardClick() {
    props.onCardClick(props.name, props.link);
  }

  const isOwn = props.owner._id === currentUser._id; //проверяем создал ли я, для добавления корзины
  const cardDeleteButtonClassName = `elements__dell ${
    !isOwn && "elements__dell_none"
  }`;

  const isLiked = props.likes.some((i) => i._id === currentUser._id);
  const cardHartButtonClassName = `elements__hart ${
    isLiked && "elements__hart_activ"
  }`;

  const handleLikeClick = () => {
    props.onCardLike(props);
  };

  const handleDeleteClick = () => {
    props.onCardDelete(true);
    props.onCardDeleteCourse(props);
  };

  return (
    <li className="elements__item-list">
      <img
        className="elements__image"
        src={props.link}
        alt={props.name}
        onClick={handleCardClick}
      />
      <button
        className={cardDeleteButtonClassName}
        onClick={handleDeleteClick}
        type="button"
      ></button>
      <div className="elements__txt-hart">
        <h3 className="elements__cut-text">{props.name}</h3>
        <div>
          <button
            className={cardHartButtonClassName}
            onClick={handleLikeClick}
            type="button"
          ></button>
          <h3 className="elements__how-like">{props.likes.length}</h3>
        </div>
      </div>
    </li>
  );
}

export default Сard;

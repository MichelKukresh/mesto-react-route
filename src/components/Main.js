import { useContext, useEffect, useState } from "react";
import Card from "./Card.js";
import krest from "../images/krest.svg";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Main(props) {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <main className="content page__content">
      <section className="section profile content__section">
        <div className="profile__image-text-pen">
          <div className="profile__change">
            <img
              onClick={() => props.isOpenAvatar(true)}
              className="profile__image"
              src={currentUser.avatar}
              alt="аватар"
            />
          </div>
          <div className="profile__text-pen">
            <div className="profile__text-pen-position">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button
                onClick={() => props.isOpenProfile(true)}
                className="profile__button-open"
                aria-label="Open"
                type="button"
              ></button>
            </div>
            <p className="profile__profession">{currentUser.about}</p>
          </div>
        </div>
        <button
          onClick={() => props.isOpenPlace(true)}
          className="profile__button-add-site"
          type="button"
        >
          <img src={krest} alt="крестик" />
        </button>
      </section>
      <section className="section elements content__section">
        <ul className="elements__item">
          {props.cards?.map(
            (
              cards //опциональная цепочка https://learn.javascript.ru/optional-chaining
            ) => (
              <Card
                name={cards.name}
                link={cards.link}
                likes={cards.likes}
                owner={cards.owner}
                _id={cards._id}
                onCardClick={props.onCardClick}
                onCardLike={props.handleCardLike}
                onCardDelete={props.isOpenCourseDelete}
                onCardDeleteCourse={props.handleCardCourseDelete}
                key={cards._id}
              ></Card>
            )
          )}
        </ul>
      </section>
    </main>
  );
}

export default Main;


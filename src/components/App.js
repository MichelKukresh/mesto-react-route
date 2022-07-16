import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";

import { useEffect, useState } from "react";
import ImagePopup from "./ImagePopup";
import { api } from "../../src/utils/Api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import EditCourseDeletePopup from "./EditCourseDeletePopup";
import { Routes, Route, useNavigate } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import EditRegisterPopup from "./EditRegisterPopup";
import { register, login, getJWT } from "../utils/Fetch"; //запросы fetch
import InfoToolTip from "./InfoToolTip";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false); // профиль

  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false); // карточка
  const [isOnEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false); // аватар
  const [currentUser, setCurrentUser] = useState({ name: "", about: "" }); //о пользователе => провайдер
  const [isEditCourseDeletePopupOpen, setIsEditCourseDeletePopupOpen] =
    useState(false); // подтверждение удаления
  
  const [isEditRegisterPopupPopupOpen, setEditRegisterPopupPopupOpen] =
    useState(false); // Попап регистрации
  const [isSuccessfulRegistration, setSuccessfulRegistration] = useState(false); //Проверка успешной регистрации
  const navigate = useNavigate();
    //Проверка залогинился ли ранее пользователь
    const [loggedIn, setLoggedIn] = useState(false);

  const [selectedCard, setSelectedCard] = useState({
    state: false,
    name: "",
    link: "",
  }); //для открытия большой карточки
  
    //хранение данных при регистрации
    const [userDaraRegister, setUserDaraRegister] = useState({
      email: "",
      password: "",
    });

  //при первой загрузке проверка есть ли у нас JWT
  useEffect(() => {
    tokenCheck();
  }, []);


  const [cardDeleteAfterCourse, setCardDeleteAfterCourse] = useState({}); //карточка которую нужно удалить

  const [buttonInfomationAboutSave, setButtonInfomationAboutSave] =
    useState("Сохранить"); // функционал добавления подсказки
  const [buttonInfomationDelete, setButtonInfomationDelete] = useState("Да"); // функционал добавления подсказки

  //для данных о пользователе
  useEffect(() => {
    api
      .getInitialUser()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [cards, setCards] = useState([]); // для данных карточек => провайдер

  useEffect(() => {
    api
      .getInitialCards()
      .then((data) => {
        setCards(
          data.map((item) => ({
            name: item.name,
            link: item.link,
            likes: item.likes, //массив из лайкнувших
            owner: item.owner, //для проверки кто создал карточку\вешать корзину?
            _id: item._id, //id самой карточки
          }))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    const apiMethod = isLiked ? "DELETE" : "PUT";
    //Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, apiMethod)
      .then((newCard) => {
        setCards((cards) =>
          cards.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    setButtonInfomationDelete("Удаление...");
    api
      .deleteCard(card._id)
      .then(() => {        
        setCards((cards) => cards.filter((c) => c._id !== card._id));
        closeAllPopups();
      })      
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setButtonInfomationDelete("Да"));
  }

  //пробрасываем в card данные для отрисовки большой карточки
  function onCardClick(name, link) {
    setSelectedCard({ state: true, name, link });
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({ state: false, name: "", link: "" });
    setIsEditCourseDeletePopupOpen(false);
    setEditRegisterPopupPopupOpen(false);
  }

  function handleUpdateUser({ name, profession }) {
    setButtonInfomationAboutSave("Сохранение...");
    api
      .patchUserInfoNameAbout(name, profession)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })      
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setButtonInfomationAboutSave("Сохранить"));
  }

  function handleUpdateAvatar({ avatar }) {
    setButtonInfomationAboutSave("Сохранение...");

    api
      .patchAvatar(avatar)
      .then((data) => {
        setCurrentUser(data);
      })
      .then(() => closeAllPopups())
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setButtonInfomationAboutSave("Сохранить"));
  }

  function handleAddPlace({ name, link }) {
    setButtonInfomationAboutSave("Сохранение...");
    api
      .postCard(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })      
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setButtonInfomationAboutSave("Сохранить"));
  }

  //принимаем данные из вормы регистрации
  const hahdleSubmitRegister = (dataRegister) => {
    register(dataRegister)
      .then((data) => {
        setSuccessfulRegistration(true);
        setEditRegisterPopupPopupOpen(true);
        navigate("/sign-in");
      })
      .catch((err) => {
        console.log(err);
        setSuccessfulRegistration(false);
        setEditRegisterPopupPopupOpen(true);
      });
  };

  //обработка логина
  const hahdleSubmitLogin = (dataRegister, e) => {
    e.preventDefault();

    login(dataRegister)
      .then((data) => {
        if (data.token) {
          setUserDaraRegister(dataRegister);
          setLoggedIn(true);
          navigate("/sign");
          localStorage.setItem("jwt", data.token);
        }
      })
      .catch((err) => {
        console.log(err);
        setSuccessfulRegistration(false);
        setEditRegisterPopupPopupOpen(true);
      });
  };

  const tokenCheck = () => {
    let jwt = localStorage.getItem("jwt");
    if (jwt) {
      getJWT(jwt)
        .then((data) => {
          setUserDaraRegister({
            email: data.data.email,
            password: "",
          });
        })
        .then(() => {
          setLoggedIn(true);
          navigate("/sign");
        });
    } else {
      navigate("/sign-up");
    }
  };

  //выход
  const handleLogaut = () => {
    localStorage.removeItem("jwt");
    setUserDaraRegister({
      email: "",
      password: "",
    });
    setLoggedIn(false);
    navigate("/sign-up");
  };

  return (
    <CurrentUserContext.Provider value={ currentUser }>
      <div className="page">
        <div className="page__container">
          <Routes>
            <Route
              path="/sign"
              element={
                <ProtectedRoute path="/sign" loggedIn={loggedIn}>
                  <Header
                    textAuth="Выйти"
                    sign="/sign-in"
                    emailAuth="email@mail.ru"
                    handleLogaut={handleLogaut}
                    typeButton={"button"}
                    userDaraRegister={userDaraRegister}
                  />
                  <Main
                    cards={cards}
                    handleCardLike={handleCardLike}
                    handleCardDelete={handleCardDelete}
                    isOpenProfile={setIsEditProfilePopupOpen}
                    isOpenPlace={setIsAddPlacePopupOpen}
                    isOpenAvatar={setIsEditAvatarPopupOpen}
                    onCardClick={onCardClick}
                    isOpenCourseDelete={setIsEditCourseDeletePopupOpen} //подтверждение удаления
                    handleCardCourseDelete={setCardDeleteAfterCourse}
                  />
                  <Footer />
                </ProtectedRoute>
              }
            />
            <Route
              path="/sign-up"
              element={
                <div>
                  <Header
                    textAuth="Войти"
                    sign="/sign-in"
                    userDaraRegister={userDaraRegister}
                  />
                  <Register hahdleSubmitRegister={hahdleSubmitRegister} />
                </div>
              }
            />
            <Route
              path="/sign-in"
              element={
                <div>
                  <Header
                    textAuth="Регистрация"
                    sign="/sign-up"
                    userDaraRegister={userDaraRegister}
                  />
                  <Login hahdleSubmitLogin={hahdleSubmitLogin} />
                </div>
              }
            />
          </Routes>

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            closeAllPopups={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            buttonInfomationAboutSave={buttonInfomationAboutSave}
          />

          <EditAvatarPopup
            isOpen={isOnEditAvatarPopupOpen}
            closeAllPopups={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            buttonInfomationAboutSave={buttonInfomationAboutSave}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            closeAllPopups={closeAllPopups}
            onUpdatePlace={handleAddPlace}
            buttonInfomationAboutSave={buttonInfomationAboutSave}
          />

          <ImagePopup
            onCardClick={selectedCard}
            closeAllPopups={closeAllPopups}
          />

          <EditCourseDeletePopup
            isOpen={isEditCourseDeletePopupOpen}
            closeAllPopups={closeAllPopups}
            cardDelete={cardDeleteAfterCourse}
            handleCardDelete={handleCardDelete}
            buttonInfomationDelete={buttonInfomationDelete}
          />

          <InfoToolTip
           isOpen={isEditRegisterPopupPopupOpen}
           closeAllPopups={closeAllPopups}
           isSuccessfulRegistration={isSuccessfulRegistration}
          
          />

          <EditRegisterPopup
          
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

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
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import EditRegisterPopup from "./EditRegisterPopup";



function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false); // профиль

  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false); // карточка
  const [isOnEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false); // аватар
  const [currentUser, setCurrentUser] = useState({ name: "", about: "" }); //о пользователе => провайдер
  const [isEditCourseDeletePopupOpen, setIsEditCourseDeletePopupOpen] =
    useState(false); // подтверждение удаления

    ///12 работа
    const [isEditRegisterPopupPopupOpen, setEditRegisterPopupPopupOpen] =
    useState(false); // Попап регистрации
    const [isSuccessfulRegistration, setSuccessfulRegistration] = useState(false);//Проверка успешной регистрации
    const navigate = useNavigate();

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
        const cardsWithoutDeleteCard = cards.filter((c) => c._id !== card._id);
        setCards(cardsWithoutDeleteCard);
      })
      .then(() => closeAllPopups())
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setButtonInfomationDelete("Да"));
  }

  const [selectedCard, setSelectedCard] = useState({
    state: false,
    name: "",
    link: "",
  }); //для открытия большой карточки

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
        console.log(data);
      })
      .then(() => closeAllPopups())
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
      })
      .then(() => closeAllPopups())
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setButtonInfomationAboutSave("Сохранить"));
  }

  ///12 проектная работа
  //Проверка залогинился ли ранее пользователь
  const [loggedIn, setLoggedIn] = useState(false);
  //при первой загрузке проверка есть ли у нас JWT
  useEffect(() => {
    tokenCheck();
  }, []);
  //хранение данных при регистрации
  const [userDaraRegister, setUserDaraRegister] = useState({
    email: "",
    password: "",
  });
  //запрос на авторизацию
  const register = (dataRegister) => {
    return fetch(`${BASE_URL}signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: dataRegister.password,
        email: dataRegister.email,
      }),
    });
  };
//для запроса логина
  const login = (dataRegister) => {
    return fetch(`${BASE_URL}signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: dataRegister.password,
        email: dataRegister.email,
      }),
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  };

  //email: "kukresh@yandex.ru"
  //_id: "62cb19486390a40014692cdb"

  const hahdleLogin = () => {
    setLoggedIn(true);
  };

  const BASE_URL = "https://auth.nomoreparties.co/";

  //принимаем данные из вормы регистрации
  const hahdleSubmitRegister = (dataRegister, e) => {
    e.preventDefault();
    setUserDaraRegister(dataRegister);
    register(dataRegister)      
      .then((data)=> {
        setSuccessfulRegistration(data.ok);
        setEditRegisterPopupPopupOpen(true);
        
        if(data.ok) {
          
          navigate("/sign-in");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

//обработка логина
  const hahdleSubmitLogin = (dataRegister, e) => {
    e.preventDefault();    
    

    login(dataRegister) 
       
      .then((data)=> {
        //setSuccessfulRegistration(data.ok);
        //setEditRegisterPopupPopupOpen(true);
        
        if(data.token) {
          setUserDaraRegister(dataRegister);
          setLoggedIn(true);
          navigate("/sign");
          localStorage.setItem('jwt', data.token);  
          console.log(localStorage.getItem('jwt'));        
        }

      })
      .catch((err) => {
        console.log(err);
      });
  };  
///1:08:41 вебинара
  const tokenCheck = () => {
    let jwt = localStorage.getItem('jwt');
    if(jwt) {
      getJWT(jwt)
      ///.then((data) => console.log(data))
      setLoggedIn(true);
      navigate("/sign");
    }

  }


    const getJWT = (jwt) => {   
    return fetch(`${BASE_URL}users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${jwt}`
      }
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  };

  //выход
  const handleLogaut = () => {
    localStorage.removeItem('jwt');
    setUserDaraRegister({
      email: "",
      password: "",
    });
    setLoggedIn(false);
    navigate("/sign-up");
    console.log('Все удалено');
  }


  return (
    <CurrentUserContext.Provider value={{ currentUser }}>
      <div className="page">
        <div className="page__container">
          <Routes>
            <Route
              path="/sign"
              element={
                <ProtectedRoute path="/sign" loggedIn={loggedIn}>
                  <Header textAuth="Выйти" sign="/sign-in" emailAuth="email@mail.ru" handleLogaut={handleLogaut}/>
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
            ></Route>
            <Route
              path="/sign-up"
              element={
                <div>
                  <Header textAuth="Войти" sign="/sign-in"/>
                  <Register hahdleSubmitRegister={hahdleSubmitRegister} />
                </div>
              }
            ></Route>
            <Route
              path="/sign-in"
              element={
                <div>
                  <Header textAuth="Регистрация" sign="/sign-up"/>
                  <Login hahdleSubmitLogin={hahdleSubmitLogin}/>
                </div>
              }
            ></Route>
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
          ></EditAvatarPopup>

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            closeAllPopups={closeAllPopups}
            onUpdatePlace={handleAddPlace}
            buttonInfomationAboutSave={buttonInfomationAboutSave}
          ></AddPlacePopup>

          <ImagePopup
            onCardClick={selectedCard}
            closeAllPopups={closeAllPopups}
          ></ImagePopup>

          <EditCourseDeletePopup
            isOpen={isEditCourseDeletePopupOpen}
            closeAllPopups={closeAllPopups}
            cardDelete={cardDeleteAfterCourse}
            handleCardDelete={handleCardDelete}
            buttonInfomationDelete={buttonInfomationDelete}
          ></EditCourseDeletePopup>

          <EditRegisterPopup
          isOpen={isEditRegisterPopupPopupOpen}
          closeAllPopups={closeAllPopups}
          isSuccessfulRegistration={isSuccessfulRegistration}

          ></EditRegisterPopup>


          
          
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

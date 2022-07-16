import { BASE_URL } from "./initialCards"; 
  
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
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
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
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }; 

  const getJWT = (jwt) => {
    return fetch(`${BASE_URL}users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  };


  export {register, login, getJWT};
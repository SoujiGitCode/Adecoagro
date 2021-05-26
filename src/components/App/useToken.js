import { useState } from 'react';

export default function useToken() {
  const getToken = () => {
    const tokenString = localStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken?.token
  };

  const [token, setToken] = useState(getToken());

  const saveToken = userToken => {
    localStorage.setItem('token', JSON.stringify(userToken));
    localStorage.setItem('name', userToken.name);
    localStorage.setItem('email', userToken.email);
    localStorage.setItem('total', userToken.total);
    localStorage.setItem('id', userToken.id);
    setToken(userToken.token);
  };

  return {
    setToken: saveToken,
    token
  }
}



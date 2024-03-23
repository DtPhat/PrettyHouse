import axios from 'axios';
import axiosJWT from './ConfigAxiosInterceptor';

const URL_LOGIN = `https://kietpt.vn/api/authen/login`;
const URL_SIGNUP = `https://kietpt.vn/api/authen/register`;
const URL_LOGOUT = `https://kietpt.vn/api/authen/logout`;
const URL_UPDATE_TOKEN = `https://kietpt.vn/api/authen/token`;

export const loginApi = (email, password) => {
    return axiosJWT.post(URL_LOGIN, {
      email: email,
      password: password,
    });
  };

  export const signupApi = (email, password) => {
    return axiosJWT.post(URL_SIGNUP, {
      email: email,
      password: password,
    });
  };

export const logoutApi = () => {
  return axios.get(URL_LOGOUT);
};

export const updateTokenApi =async (refreshToken) => {
  return await axios.get(URL_UPDATE_TOKEN, {
    refreshToken: refreshToken
  })
  .then((response) => {
    const refreshToken = response.data.refreshToken;
    console.log('Refresh token:', refreshToken);
    return refreshToken; 
  })
  .catch((error) => {
    console.error('Error updating token:', error);
    throw error; 
  });
};



import {
  AUTH_REQUEST,
  AUTH_SUCCESS,
  AUTH_ERROR,
  AUTH_PROFILE_REQUEST,
  AUTH_PROFILE_SUCCESS,
  AUTH_PROFILE_ERROR,
  AUTH_PROFILE_EXIT,
  AUTH_REGISTER_ERROR,
  AUTH_REGISTER_REQUEST,
  AUTH_REGISTER_SUCCESS,
  AUTH_RECOVERY_ERROR,
  AUTH_RECOVERY_REQUEST,
  AUTH_RECOVERY_SUCCESS,
  AUTH_PHONE_REQUEST,
  AUTH_PHONE_LOGIN_REQUEST,
  AUTH_PHONE_LOGIN_SUCCESS,
  AUTH_PHONE_LOGIN_ERROR,
  AUTH_ADD_PHONE,
} from '../constants/AuthConstants';

import { saveToLocalStorage } from '../utils/localStorage';

const initialState = {
  isAuthenticated: false,
  action: '',
  fetching: false,
  message: '',
  profile: {},
};

const SID_COOKIE_NAME = 'PHPSESSID';
const LS_KEY_NAME = 'ha.uid';

export default function auth(state = initialState, action) {
  switch (action.type) {
    // успешное получение учетки
    case AUTH_PROFILE_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        fetching: false,
        profile: action.profile,
        message: '',
      };
    // выход из учетки
    case AUTH_PROFILE_EXIT:
      document.cookie = `${SID_COOKIE_NAME}=;path=/`;
      saveToLocalStorage(LS_KEY_NAME, '');
      return {
        ...state,
        isAuthenticated: false,
        fetching: false,
      };
    case AUTH_PHONE_LOGIN_REQUEST: // запрос смс-кода для авторизации
    case AUTH_PHONE_REQUEST: // запрос авторизации по телефону
    case AUTH_REQUEST: // запрос авторизации
    case AUTH_PROFILE_REQUEST: // запрос данных учетки
    case AUTH_REGISTER_REQUEST: // запрос регистрации
    case AUTH_RECOVERY_REQUEST: // запрос восстановления пароля
      return {
        ...state,
        action: action.type,
        fetching: true,
      };
    case AUTH_SUCCESS: // успешная авторизация
    case AUTH_REGISTER_SUCCESS: {
      // успешная регистрация
      const CookieDate = new Date();
      CookieDate.setFullYear(CookieDate.getFullYear() + 10);
      document.cookie = `${SID_COOKIE_NAME}=${action.sid};path=/;expires=${CookieDate.toGMTString()}`;
      saveToLocalStorage(LS_KEY_NAME, action.sid);
      return {
        ...state,
        fetching: false,
        message: '',
      };
    }
    case AUTH_PHONE_LOGIN_SUCCESS: // успешно запрошен код
    case AUTH_RECOVERY_SUCCESS: // успешное восстановление
      return {
        ...state,
        fetching: false,
        message: '',
      };
    case AUTH_ERROR:
    case AUTH_PROFILE_ERROR:
    case AUTH_REGISTER_ERROR:
    case AUTH_RECOVERY_ERROR:
    case AUTH_PHONE_LOGIN_ERROR:
      return {
        ...state,
        fetching: false,
        message: action.error,
      };

    case AUTH_ADD_PHONE: {
      const profile = { ...state.profile };
      profile.phone = action.phone;
      return {
        ...state,
        profile,
      };
    }
  }

  return state;
}

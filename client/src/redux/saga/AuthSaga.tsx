import { call, delay, put, select, takeLatest } from 'redux-saga/effects';
import { authService } from '../../services/AuthService';
import { DARK_THEME, LIGHT_THEME, STATUS_CODE, TOKEN } from '../../util/constants/SettingSystem';
import {
  CHECK_LOGIN_SAGA,
  GET_USER_ID,
  LOGIN_SAGA,
  LOGIN_WITH_GOOGLE_SAGA,
  LOGOUT_SAGA,
} from '../actionSaga/AuthActionSaga';
import { setLogin, setUserID } from '../Slice/AuthSlice';
import { setTheme } from '../Slice/ThemeSlice';

// LoginSaga
function* LoginSaga({ payload }: any) {
  try {
    const { data, status } = yield authService.login(payload.userLogin);
    if (status === STATUS_CODE.SUCCESS) {
      // Lưu token vào localStorage
      localStorage.setItem(TOKEN, JSON.stringify(data.content?.accessToken));
      yield put(setLogin({ login: true }));

      // Lưu theme vào localStorage
      yield put(setTheme({ theme: DARK_THEME }));

      window.location.href = '/';
    }
  } catch (err: any) {
    console.log(err);
  }
}

export function* theoDoiLoginSaga() {
  yield takeLatest(LOGIN_SAGA, LoginSaga);
}

// Logout
function* LogoutSaga() {
  try {
    const token = localStorage.getItem(TOKEN);

    const userAuth = {
      accessToken: token,
    };
    const { data, status } = yield authService.logout(userAuth);
    if (status === STATUS_CODE.SUCCESS) {
      localStorage.removeItem(TOKEN);
      yield put(setLogin({ login: false }));
      window.location.href = '/login';
    }
  } catch (err: any) {
    console.log(err);
  }
}

export function* theoDoiLogoutSaga() {
  yield takeLatest(LOGOUT_SAGA, LogoutSaga);
}

// Get User ID
function* getUserIDSaga() {
  try {
    const token = localStorage.getItem(TOKEN);
    const userAuth = {
      accessToken: token,
    };
    const { data, status } = yield authService.getUserID(userAuth);
    if (status === STATUS_CODE.SUCCESS) {
      yield put(setUserID({ userID: data.content }));
    }
  } catch (err: any) {
    console.log(err);
  }
}

export function* theoDoiGetUserIDSaga() {
  yield takeLatest(GET_USER_ID, getUserIDSaga);
}

// Login with Google
function* LoginWithGoogleSaga({ payload }: any) {
  try {
    const { data, status } = yield authService.loginWithGoogle(payload);
    if (status === STATUS_CODE.SUCCESS) {
      // Lưu token vào localStorage
      localStorage.setItem(TOKEN, JSON.stringify(data.content?.accessToken));
      yield put(setLogin({ login: true }));

      // Lưu theme vào localStorage
      yield put(setTheme({ theme: DARK_THEME }));

      window.location.href = '/';
    }
  } catch (err: any) {
    console.log(err);
  }
}

export function* theoDoiLoginWithGoogleSaga() {
  yield takeLatest(LOGIN_WITH_GOOGLE_SAGA, LoginWithGoogleSaga);
}

// Check Login Saga
function* CheckLoginSaga() {
  try {
    const token = localStorage.getItem(TOKEN);
    const userAuth = {
      accessToken: token,
    };
    const { data, status } = yield authService.checkLogin(userAuth);
    if (status === STATUS_CODE.SUCCESS) {
      yield put(setLogin({ login: true }));
    } else {
      yield put(setLogin({ login: false }));
    }
  } catch (err: any) {
    yield put(setLogin({ login: false }));
    console.log(err);
  }
}

export function* theoDoiCheckLoginSaga() {
  yield takeLatest(CHECK_LOGIN_SAGA, CheckLoginSaga);
}

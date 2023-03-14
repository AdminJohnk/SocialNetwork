import { call, put, takeLatest } from "redux-saga/effects";
import { authService } from "../../services/AuthService";
import { STATUS_CODE, TOKEN } from "../../util/constants/SettingSystem";
import { CHECK_LOGIN_SAGA, LOGIN_SAGA } from "../actionSaga/AuthActionSaga";
import { setLogin } from "../Slice/AuthSlice";

//checkLoginSaga
function* checkLoginSaga() {
  try {
    const token = localStorage.getItem(TOKEN);
    if (token === null) {
      yield put(setLogin({ login: false }));
      return;
    }
    const userAuth = {
      accessToken: token,
    };

    const { data, status } = yield authService.checkLogin(userAuth);

    if (status === STATUS_CODE.SUCCESS) {
      yield put(setLogin({ login: true }));
    } else {
      localStorage.removeItem(TOKEN);
      yield put(setLogin({ login: false }));
    }
  } catch (err: any) {
    yield put(setLogin({ login: false }));
  }
}

export function* theoDoicheckLoginSaga() {
  yield takeLatest(CHECK_LOGIN_SAGA, checkLoginSaga);
}

//LoginSaga
function* LoginSaga({ payload }: any) {
  try {
    const { data, status } = yield authService.checkLogin(payload.userLogin);
    if (status === STATUS_CODE.SUCCESS) {
      localStorage.setItem(TOKEN, JSON.stringify(data.content.accessToken));
    } else {
      localStorage.removeItem(TOKEN);
    }
  } catch (err: any) {
    console.log(err.response.data);
  }
}

export function* theoDoiLoginSaga() {
  yield takeLatest(LOGIN_SAGA, LoginSaga);
}

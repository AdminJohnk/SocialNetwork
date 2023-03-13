// checkLogin Saga

import { call, put, takeLatest } from "redux-saga/effects";
import { authService } from "../../services/AuthService";
import { STATUS_CODE, TOKEN } from "../../util/constants/SettingSystem";
import { CHECK_LOGIN_SAGA } from "../actionSaga/AuthActionSaga";
import { setLogin } from "../Slice/AuthSlice";

function* checkLoginSaga() {
  try {
    const token = localStorage.getItem(TOKEN);
    if (token === null) {
      yield put(setLogin({ login: false }));
      return;
    }

    const { data, status } = yield authService.checkLogin(token);

    if (status === STATUS_CODE.SUCCESS) {
        yield put(setLogin({ login: true }));
    }

  } catch (err: any) {
    console.log(err.response.data);
  }
}

export function* theoDoicheckLoginSaga() {
  yield takeLatest(CHECK_LOGIN_SAGA, checkLoginSaga);
}

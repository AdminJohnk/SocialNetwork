import { all } from "redux-saga/effects";
import * as userSaga from "./UserSaga";
import * as authSaga from "./AuthSaga";

export function* rootSaga() {
  yield all([
    //userSaga
    userSaga.theoDoiRegisterUserSaga(),

    //authSaga
    authSaga.theoDoicheckLoginSaga(),
    authSaga.theoDoiLoginSaga(),
  ]);
}

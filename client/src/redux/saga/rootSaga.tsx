import { all } from "redux-saga/effects";
import * as userSaga from "./UserSaga";
import * as authSaga from "./AuthSaga";
import * as postSaga from "./PostSaga";

export function* rootSaga() {
  yield all([
    // authSaga
    authSaga.theoDoicheckLoginSaga(),
    authSaga.theoDoiLoginSaga(),
    authSaga.theoDoiLogoutSaga(),

    // userSaga
    userSaga.theoDoiRegisterUserSaga(),

    // postSaga
    postSaga.theoDoiCreatePostSaga(),
    postSaga.theoDoiGetAllPostByUserIDSaga(),
    postSaga.theoDoiDeletePostSaga(),
    postSaga.theoDoiLikePostSaga(),
  ]);
}

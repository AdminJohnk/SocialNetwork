import { all } from "redux-saga/effects";
import * as userSaga from "./UserSaga";
import * as authSaga from "./AuthSaga";
import * as chatSaga from "./ChatSaga";

export function* rootSaga() {
  yield all([
    //userSaga
    userSaga.theoDoiRegisterUserSaga(),

    //authSaga
    authSaga.theoDoicheckLoginSaga(),
    authSaga.theoDoiLoginSaga(),
    authSaga.theoDoiLogoutSaga(),

    //chatSaga
    chatSaga.theoDoiGetMessageByConversationIdSaga(),
    chatSaga.theoDoiSendMessageSaga(),
    chatSaga.theoDoiCreateNewConversationSaga(),
    chatSaga.theoDoiGetConversationByUserIdSaga(),
    chatSaga.theoDoiGetConversationByTwoUserIdSaga(),


  ]);
}

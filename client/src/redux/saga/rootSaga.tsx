import { all } from 'redux-saga/effects';
import * as userSaga from './UserSaga';
import * as authSaga from './AuthSaga';
import * as postSaga from './PostSaga';
import * as messageSaga from './MessageSaga';

export function* rootSaga() {
  yield all([
    // authSaga
    authSaga.theoDoiLoginSaga(),
    authSaga.theoDoiLogoutSaga(),
    authSaga.theoDoiGetUserIDSaga(),
    authSaga.theoDoiLoginWithGoogleSaga(),
    authSaga.theoDoiCheckLoginSaga(),

    // userSaga
    userSaga.theoDoiRegisterUserSaga(),
    userSaga.theoDoiUpdateUserSaga(),
    userSaga.theoDoiGetFollowersSaga(),
    userSaga.theoDoiGetUserInfoSaga(),

    // postSaga
    postSaga.theoDoiCreatePostSaga(),
    postSaga.theoDoiGetPostShareByIdSaga(),
    postSaga.theoDoiGetAllPostByUserIDSaga(),
    postSaga.theoDoiGetAllPostSaga(),
    postSaga.theoDoiDeletePostSaga(),
    postSaga.theoDoiLikePostSaga(),
    postSaga.theoDoiUpdatePostSaga(),
    postSaga.theoDoiSharePostSaga(),
    postSaga.theoDoiSavePostSaga(),
    postSaga.theoDoiSaveCommentSaga(),
    postSaga.theoDoiSaveReplySaga(),
    postSaga.theoDoiSaveCommentPostShareSaga(),
    postSaga.theoDoiLikePostShareSaga(),
    postSaga.theoDoiSaveReplyPostShareSaga(),
    postSaga.theoDoiGetPostByIdSaga(),
    postSaga.theoDoiIncreaseViewPostSaga(),
    postSaga.theoDoiIncreaseViewPostShareSaga(),

    // messageSaga
    messageSaga.theoDoiGetConversationsSaga(),
    messageSaga.theoDoiCreateConversationSaga(),
    messageSaga.theoDoiGetConversationSaga(),
    messageSaga.theoDoiGetMessagesSaga(),
    messageSaga.theoDoiSeenMessageSaga(),
    messageSaga.theoDoiSendMessageSaga(),
  ]);
}

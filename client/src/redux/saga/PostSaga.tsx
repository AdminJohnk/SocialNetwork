import { put, takeLatest } from "redux-saga/effects";
import { postService } from "../../services/PostService";
import { ID_USER, STATUS_CODE } from "../../util/constants/SettingSystem";
import {
  CREATE_POST_SAGA,
  DELETE_POST_SAGA,
  GET_ALL_POST_BY_USERID_SAGA,
  LIKE_POST_SAGA,
  SHARE_POST_SAGA,
  UPDATE_POST_SAGA,
  SAVE_POST_SAGA,
  SAVE_COMMENT_SAGA,
  SAVE_REPLY_SAGA,
  SAVE_COMMENT_POSTSHARE_SAGA,
  LIKE_POSTSHARE_SAGA,
  SAVE_REPLY_POSTSHARE_SAGA,
} from "../actionSaga/PostActionSaga";
import { setAllPost } from "../Slice/PostSlice";

// Get All Post Saga
function* getAllPostByUserIDSaga({ payload }: any) {
  try {
    const id = payload.userId;
    const { data, status } = yield postService.getAllPostByUserID(id);
    if (status === STATUS_CODE.SUCCESS) {
      yield put(setAllPost(data.content));
    }
  } catch (err: any) {
    console.log(err.response.data);
  }
}

export function* theoDoiGetAllPostByUserIDSaga() {
  yield takeLatest(GET_ALL_POST_BY_USERID_SAGA, getAllPostByUserIDSaga);
}

// createPostSaga Saga
function* createPostSaga({ payload }: any) {
  try {
    const postCreate = {
      title: payload.postCreate.title,
      content: payload.postCreate.content,
    };
    const postImage = payload.linkImage;
    const { data, status } = yield postService.createPost(
      postCreate,
      postImage
    );
    if (status === STATUS_CODE.CREATED) {
      yield put(
        GET_ALL_POST_BY_USERID_SAGA({
          userId: "me",
        })
      );
    }
  } catch (err: any) {
    console.log(err.response.data);
  }
}

export function* theoDoiCreatePostSaga() {
  yield takeLatest(CREATE_POST_SAGA, createPostSaga);
}

// Update Post Saga
export function* updatePostSaga({ payload }: any) {
  try {
    const { data, status } = yield postService.updatePost(
      payload.id,
      payload.postUpdate
    );
    if (status === STATUS_CODE.SUCCESS) {
      yield put(
        GET_ALL_POST_BY_USERID_SAGA({
          userId: "me",
        })
      );
    }
  } catch (err: any) {
    console.log(err.response.data);
  }
}

export function* theoDoiUpdatePostSaga() {
  yield takeLatest(UPDATE_POST_SAGA, updatePostSaga);
}

// Save Comment Saga
export function* saveCommentSaga({ payload }: any) {
  try {
    const { data, status } = yield postService.saveComment(
      payload.id,
      payload.comment
    );
    if (status === STATUS_CODE.SUCCESS) {
      yield put(
        GET_ALL_POST_BY_USERID_SAGA({
          userId: "me",
        })
      );
    }
  } catch (err: any) {
    console.log(err.response.data);
  }
}

export function* theoDoiSaveCommentSaga() {
  yield takeLatest(SAVE_COMMENT_SAGA, saveCommentSaga);
}

// Save Reply Saga
export function* saveReplySaga({ payload }: any) {
  try {
    const { data, status } = yield postService.saveReply(
      payload.id,
      payload.reply
    );
    if (status === STATUS_CODE.SUCCESS) {
      yield put(
        GET_ALL_POST_BY_USERID_SAGA({
          userId: "me",
        })
      );
    }
  } catch (err: any) {
    console.log(err.response.data);
  }
}

export function* theoDoiSaveReplySaga() {
  yield takeLatest(SAVE_REPLY_SAGA, saveReplySaga);
}

// Delete Post Saga
export function* deletePostSaga({ payload }: any) {
  try {
    const { data, status } = yield postService.deletePost(payload);
    if (status === STATUS_CODE.SUCCESS) {
      yield put(
        GET_ALL_POST_BY_USERID_SAGA({
          userId: "me",
        })
      );
    }
  } catch (err: any) {
    console.log(err.response.data);
  }
}

export function* theoDoiDeletePostSaga() {
  yield takeLatest(DELETE_POST_SAGA, deletePostSaga);
}

// Save comment postshare Saga
export function* saveCommentPostShareSaga({ payload }: any) {
  try {
    const { data, status } = yield postService.saveCommentPostShare(
      payload.id,
      payload.comment
    );
    if (status === STATUS_CODE.SUCCESS) {
      yield put(
        GET_ALL_POST_BY_USERID_SAGA({
          userId: "me",
        })
      );
    }
  } catch (err: any) {
    console.log(err.response.data);
  }
}

export function* theoDoiSaveCommentPostShareSaga() {
  yield takeLatest(SAVE_COMMENT_POSTSHARE_SAGA, saveCommentPostShareSaga);
}

// Save Reply PostShare Saga
export function* saveReplyPostShareSaga({ payload }: any) {
  try {
    const { data, status } = yield postService.saveReplyPostShare(
      payload.id,
      payload.reply
    );
    if (status === STATUS_CODE.SUCCESS) {
      yield put(
        GET_ALL_POST_BY_USERID_SAGA({
          userId: "me",
        })
      );
    }
  } catch (err: any) {
    console.log(err.response.data);
  }
}

export function* theoDoiSaveReplyPostShareSaga() {
  yield takeLatest(SAVE_REPLY_POSTSHARE_SAGA, saveReplyPostShareSaga);
}

// Like Post Saga
export function* likePostSaga({ payload }: any) {
  try {
    const { data, status } = yield postService.likePost(payload.id);
    if (status === STATUS_CODE.SUCCESS) {
      yield put(
        GET_ALL_POST_BY_USERID_SAGA({
          userId: "me",
        })
      );
    }
  } catch (err: any) {
    console.log(err.response.data);
  }
}

export function* theoDoiLikePostSaga() {
  yield takeLatest(LIKE_POST_SAGA, likePostSaga);
}

// Share Post Saga
export function* sharePostSaga({ payload }: any) {
  try {
    const { data, status } = yield postService.sharePost(payload.id);
    console.log(payload.id);

    if (status === STATUS_CODE.SUCCESS) {
      yield put(
        GET_ALL_POST_BY_USERID_SAGA({
          userId: "me",
        })
      );
    }
  } catch (err: any) {
    console.log(err.response.data);
  }
}

export function* theoDoiSharePostSaga() {
  yield takeLatest(SHARE_POST_SAGA, sharePostSaga);
}

// Like post share Saga
export function* likePostShareSaga({ payload }: any) {
  try {
    const { data, status } = yield postService.likePostShare(payload.id);
    if (status === STATUS_CODE.SUCCESS) {
      yield put(
        GET_ALL_POST_BY_USERID_SAGA({
          userId: "me",
        })
      );
    }
  } catch (err: any) {
    console.log(err.response.data);
  }
}

export function* theoDoiLikePostShareSaga() {
  yield takeLatest(LIKE_POSTSHARE_SAGA, likePostShareSaga);
}

// Save Post Saga
export function* savePostSaga({ payload }: any) {
  try {
    const { data, status } = yield postService.savePost(payload.id);
    if (status === STATUS_CODE.SUCCESS) {
      yield put(
        GET_ALL_POST_BY_USERID_SAGA({
          userId: "me",
        })
      );
    }
  } catch (err: any) {
    console.log(err.response.data);
  }
}

export function* theoDoiSavePostSaga() {
  yield takeLatest(SAVE_POST_SAGA, savePostSaga);
}

import { put, takeLatest } from "redux-saga/effects";
import { postService } from "../../services/PostService";
import { ID_USER, STATUS_CODE } from "../../util/constants/SettingSystem";
import {
  CREATE_POST_SAGA,
  DELETE_POST_SAGA,
  GET_ALL_POST_BY_USERID_SAGA,
  LIKE_POST_SAGA,
  UPDATE_POST_SAGA,
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
      title: payload.title,
      content: payload.content,
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
    console.log(payload);
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
    const { data, status } = yield postService.updatePost(payload.id, payload.postUpdate);
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












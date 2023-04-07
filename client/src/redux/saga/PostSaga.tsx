import { put, takeLatest } from "redux-saga/effects";
import { postService } from "../../services/PostService";
import { ID_USER, STATUS_CODE } from "../../util/constants/SettingSystem";
import {
  CREATE_POST_SAGA,
  GET_ALL_POST_BY_USERID_SAGA,
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
    const { data, status } = yield postService.createPost(payload.postCreate);
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

import { put, select, takeLatest } from "redux-saga/effects";
import { userService } from "../../services/UserService";
import { STATUS_CODE, TOKEN } from "../../util/constants/SettingSystem";
import { REGIS_USER_SAGA } from "../actionSaga/UserActionSaga";

// registerUser Saga
function* registerUserSaga({ payload }: any) {
  try {
    const { data, status } = yield userService.registerUser(
      payload.userRegister
    );

    if (status === STATUS_CODE.CREATED) {
      localStorage.setItem(TOKEN, JSON.stringify(data.content.accessToken));
    } else {
      localStorage.removeItem(TOKEN);
    }
  } catch (err: any) {
    console.log(err.response.data);
  }
}

export function* theoDoiRegisterUserSaga() {
  yield takeLatest(REGIS_USER_SAGA, registerUserSaga);
}

// Update User Saga
function* updateUserSaga({ payload }: any) {
  console.log(payload);
  try {
    const { data, status } = yield userService.updateUser(payload.id, payload.userUpdate);
    if (status === STATUS_CODE.SUCCESS) {
      yield put(setUser(data.content));
    }
  } catch (err: any) {
    console.log(err.response.data);
  }
}

export function* theoDoiUpdateUserSaga() {
  yield takeLatest(UPDATE_USER_SAGA, updateUserSaga);
}

// Get Followers Saga
function* getFollowersSaga() {
  try {
    const { data, status } = yield userService.getFollowers();
    if (status === STATUS_CODE.SUCCESS) {
      data.content.followers.forEach((follower: any) => {
        follower.username = follower.lastname + ' ' + follower.firstname;
      });
      yield put(setUser(data.content));
      yield put(setFollowers(data.content));
    }
  } catch (err: any) {
    console.log(err.response.data);
  }
}

export function* theoDoiGetFollowersSaga() {
  yield takeLatest(GET_FOLLOWERS_SAGA, getFollowersSaga);
}

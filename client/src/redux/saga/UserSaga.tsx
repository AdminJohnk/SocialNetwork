import { put, select, takeLatest } from "redux-saga/effects";
import { userService } from "../../services/UserService";
import { STATUS_CODE, TOKEN } from "../../util/constants/SettingSystem";
import { REGIS_USER_SAGA } from "../actionSaga/UserActionSaga";


// registerUser Saga

function* registerUserSaga(action: any) {
    try {
        const { data, status } = yield userService.registerUser(action.payload.userRegister);

        if (status === STATUS_CODE.CREATED) {
            localStorage.setItem(TOKEN, JSON.stringify(data.content.accessToken));
        }

    } catch (err : any) {
        console.log(err.response.data)
    }
}

export function* theoDoiRegisterUserSaga() {
    yield takeLatest(REGIS_USER_SAGA, registerUserSaga)
}
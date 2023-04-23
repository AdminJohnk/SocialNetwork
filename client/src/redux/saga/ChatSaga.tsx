import { put, select, takeLatest } from "redux-saga/effects";
import { chatService } from "../../services/ChatService";
import { STATUS_CODE, TOKEN } from "../../util/constants/SettingSystem";
import { getMessage } from "../Slice/ChatSlice";
import { GET_MESSAGE_BY_CONV_ID_SAGA, SEND_MESSAGE_TO_A_USER_SAGA} from "../actionSaga/ChatActionSaga";

// get Messages Saga
function* getMessagesSaga({ payload }: any) {
    try {
        const { data, status } = yield chatService.getMessageByConvID(payload);
        // console.log(data.content);

        if (status === STATUS_CODE.SUCCESS)
            yield put(getMessage(data.content));
        else
            yield put(getMessage(null));

    } catch (err: any) {
        console.log(err.response.data);
    }
}

export function* theoDoiGetMessageByConversationIdSaga() {
    yield takeLatest(GET_MESSAGE_BY_CONV_ID_SAGA, getMessagesSaga);

}

// send Messages Saga
function* sendMessagesSaga({ payload }: any) {
    try {
        const newMessage = {
            conservationid: payload.conversationid,
            sender: payload.sender,
            text: payload.text,
        }
        const { data, status } = yield chatService.sendMessage(newMessage);
        if (status === STATUS_CODE.CREATED)
            yield put(getMessage(data.content));
        else
            yield put(getMessage(null));
    } catch (err: any) {
        console.log(err.response.data);
    }
}

export function* theoDoiSendMessageSaga() {
    yield takeLatest(SEND_MESSAGE_TO_A_USER_SAGA, sendMessagesSaga);
}

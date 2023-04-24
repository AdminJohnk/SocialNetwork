import { put, select, takeLatest } from "redux-saga/effects";
import { chatService } from "../../services/ChatService";
import { STATUS_CODE, TOKEN } from "../../util/constants/SettingSystem";
import {
    setAllMessageByConvId,
    setConvByUserId,
    setConvByTwoUserId,

} from "../Slice/ChatSlice";

import {
    GET_MESSAGE_BY_CONV_ID_SAGA,
    SEND_MESSAGE_TO_A_USER_SAGA,
    CREATE_CONVERSATION_SAGA,
    GET_CONVERSATION_BY_USER_ID_SAGA,
    GET_CONVERSATION_BY_TWO_USER_ID_SAGA,


} from "../actionSaga/ChatActionSaga";

// get Messages Saga
function* getMessagesSaga({ payload }: any) {
    try {
        const { data, status } = yield chatService.getMessageByConvID(payload);
        // console.log(data.content);

        if (status === STATUS_CODE.SUCCESS)
            yield put(setAllMessageByConvId(data.content));
        else
            yield put(setAllMessageByConvId(null));

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
            yield put(setAllMessageByConvId(data.content));
        else
            yield put(setAllMessageByConvId(null));
    } catch (err: any) {
        console.log(err.response.data);
    }
}

export function* theoDoiSendMessageSaga() {
    yield takeLatest(SEND_MESSAGE_TO_A_USER_SAGA, sendMessagesSaga);
}


// create new conversation
function* createNewConversationSaga({ payload }: any) {
    try {
        const convCreate = {
            senderId: payload.senderId,
            receiverId: payload.receiverId,
        }
        // console.log(convCreate);
        const { data, status } = yield chatService.newConversation(convCreate);
        if (status === STATUS_CODE.CREATED)
            yield put(setAllMessageByConvId(data.content));
        else
            yield put(setAllMessageByConvId(null));
    } catch (err: any) {
        console.log(err.response.data);
    }
}
export function* theoDoiCreateNewConversationSaga() {
    yield takeLatest(CREATE_CONVERSATION_SAGA, createNewConversationSaga);
}

// get conversation by user id
function* getConversationByUserIdSaga({ payload }: any) {
    try {
        const { data, status } = yield chatService.getConversationByUserID(payload);
        // console.log(data.content);
        if (status === STATUS_CODE.SUCCESS)
            yield put(setConvByUserId(data.content));
        else
            yield put(setConvByUserId(null));
    } catch (err: any) {
        console.log(err.response.data);
    }
}
export function* theoDoiGetConversationByUserIdSaga() {
    yield takeLatest(GET_CONVERSATION_BY_USER_ID_SAGA, getConversationByUserIdSaga);
}

// get conv includes two userId
function* getConversationByTwoUserIdSaga({ payload }: any) {
    try {
        const userID = {
            firstUserId: payload.firstUserId,
            secondUserId: payload.secondUserId,
        }
        const { data, status } = yield chatService.getConversationByTwoUserID(userID);
        // console.log(data.content);
        if (status === STATUS_CODE.SUCCESS)
            yield put(setConvByTwoUserId(data.content));
        else
            yield put(setConvByTwoUserId(null));
    } catch (err: any) {
        console.log(err.response.data);
    }
}
export function* theoDoiGetConversationByTwoUserIdSaga() {
    yield takeLatest(GET_CONVERSATION_BY_TWO_USER_ID_SAGA, getConversationByTwoUserIdSaga);
}

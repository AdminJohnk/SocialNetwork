import { call, put, select, takeLatest } from 'redux-saga/effects';
import { messageService } from '../../services/MessageService';
import { STATUS_CODE } from '../../util/constants/SettingSystem';
import { CREATE_CONVERSATION_SAGA, GET_CONVERSATIONS_SAGA } from '../actionSaga/MessageActionSaga';
import { SetConversations } from '../Slice/ConversationSlice';

// Get conversations Saga
export function* getConversationsSaga() {
  try {
    const { data, status } = yield call(messageService.getConversations);
    if (status === STATUS_CODE.SUCCESS) {
      yield put(SetConversations(data.content));
    }
  } catch (err: any) {
    console.log(err.response.data);
  }
}

export function* theoDoiGetConversationsSaga() {
  yield takeLatest(GET_CONVERSATIONS_SAGA, getConversationsSaga);
}

// Create conversation Saga
export function* createConversationSaga({ payload }: any) {
  try {
    const { data, status } = yield call(messageService.createConversation, payload);
    if (status === STATUS_CODE.SUCCESS) {
      yield put(SetConversations(data.content));
    }
  } catch (err: any) {
    console.log(err.response.data);
  }
}

export function* theoDoiCreateConversationSaga() {
  yield takeLatest(CREATE_CONVERSATION_SAGA, createConversationSaga);
}

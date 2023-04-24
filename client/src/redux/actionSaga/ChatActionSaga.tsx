import { createAction } from "@reduxjs/toolkit";

export const GET_MESSAGE_BY_CONV_ID_SAGA = createAction("GET_MESSAGE_SAGA", (data) => ({ payload: data }));
export const SEND_MESSAGE_TO_A_USER_SAGA = createAction("SEND_MESSAGE_SAGA", (data) => ({ payload: data }));
export const CREATE_CONVERSATION_SAGA = createAction("CREATE_NEW_CONVERSATION_SAGA", (data) => ({ payload: data }));
export const GET_CONVERSATION_BY_USER_ID_SAGA = createAction("GET_CONVERSATION_BY_USER_ID_SAGA", (data) => ({ payload: data }));
export const GET_CONVERSATION_BY_TWO_USER_ID_SAGA = createAction("GET_CONVERSATION_BY_TWO_USER_ID_SAGA", (data) => ({ payload: data }));
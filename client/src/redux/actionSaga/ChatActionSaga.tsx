import { createAction } from "@reduxjs/toolkit";

export const GET_MESSAGE_BY_CONV_ID_SAGA = createAction("GET_MESSAGE_SAGA", (data) => ({ payload: data }));
export const SEND_MESSAGE_TO_A_USER_SAGA = createAction("SEND_MESSAGE_SAGA", (data) => ({ payload: data }));
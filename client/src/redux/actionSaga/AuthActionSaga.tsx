import { createAction } from "@reduxjs/toolkit";

export const CHECK_LOGIN_SAGA = createAction("CHECK_LOGIN_SAGA");

export const LOGIN_SAGA = createAction("LOGIN_SAGA", (data) => ({payload: data}));

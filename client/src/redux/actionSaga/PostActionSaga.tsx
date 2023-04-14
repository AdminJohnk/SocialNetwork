import { createAction } from "@reduxjs/toolkit";


export const CREATE_POST_SAGA = createAction("CREATE_POST_SAGA", (data) => ({
  payload: data,
}));
export const GET_ALL_POST_BY_USERID_SAGA = createAction(
  "GET_ALL_POST_BY_USERID_SAGA",
  (data) => ({ payload: data })
);
export const DELETE_POST_SAGA = createAction("DELETE_POST_SAGA", (data) => ({
  payload: data,
}));
export const LIKE_POST_SAGA = createAction("LIKE_POST_SAGA", (data) => ({
  payload: data,
}));
export const SHARE_POST_SAGA = createAction("SHARE_POST_SAGA", (data) => ({
  payload: data,
}));
export const SAVE_POST_SAGA = createAction("SAVE_POST_SAGA", (data) => ({
  payload: data,
}));
export const UPDATE_POST_SAGA = createAction("UPDATE_POST_SAGA", (data) => ({
  payload: data,
}));
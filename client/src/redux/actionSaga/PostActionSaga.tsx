import { createAction } from "@reduxjs/toolkit";

export const CREATE_POST_SAGA = createAction("CREATE_POST_SAGA", (data) => ({payload: data}));
export const GET_ALL_POST_BY_USERID_SAGA = createAction("GET_ALL_POST_BY_USERID_SAGA", (data) => ({payload: data}));
export const DELETE_POST_SAGA = createAction("DELETE_POST_SAGA", (data) => ({payload: data}));
export const LIKE_POST_SAGA = createAction("LIKE_POST_SAGA", (data) => ({payload: data}));

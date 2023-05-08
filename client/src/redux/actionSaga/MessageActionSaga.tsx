import { createAction } from '@reduxjs/toolkit';

export const GET_CONVERSATIONS_SAGA = createAction('GET_CONVERSATIONS_SAGA');

export const CREATE_CONVERSATION_SAGA = createAction('CREATE_CONVERSATION_SAGA', (payload: any) => ({ payload }));

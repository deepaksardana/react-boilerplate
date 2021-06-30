import { IUser } from "interface";
import { defineRequestType, RequestType, StandardAction } from "./actions";
export const AUTH_USER_ACTION: RequestType = defineRequestType("AUTH_USER_ACTION");

export const authUserAction = {
  request: (token: string): StandardAction => {
    return {
      type: AUTH_USER_ACTION.REQUEST,
      payload: { token }
    }
  },
  success: (user: IUser): StandardAction => {
    return {
      type: AUTH_USER_ACTION.SUCCESS,
      payload: { user }
    }
  },
  failure: (error: string): StandardAction => {
    return {
      type: AUTH_USER_ACTION.FAILURE,
      payload: { error }
    }
  }
};

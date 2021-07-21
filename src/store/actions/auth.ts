import { IAuthenticationResponse, ILogin, IRegister, IUser } from "interface";
import { defineRequestType, RequestType, StandardAction } from "./actions";
export const LOGIN_ACTION: RequestType = defineRequestType("LOGIN_ACTION");
export const REGISTER_ACTION: RequestType = defineRequestType("REGISTER_ACTION");
export const FETCH_USER_ACTION: RequestType = defineRequestType("FETCH_USER_ACTION");

export const loginAction = {
  request: (payload: ILogin): StandardAction => {
    return {
      type: LOGIN_ACTION.REQUEST,
      payload
    }
  },
  success: (payload: IAuthenticationResponse): StandardAction => {
    return {
      type: LOGIN_ACTION.SUCCESS,
      payload
    }
  },
  failure: (error: string): StandardAction => {
    return {
      type: LOGIN_ACTION.FAILURE,
      payload: { error }
    }
  },
  cancel: (): StandardAction => {
    return {
      type: LOGIN_ACTION.CANCEL
    }
  }
};

export const registerAction = {
  request: (payload: IRegister): StandardAction => {
    return {
      type: REGISTER_ACTION.REQUEST,
      payload: payload
    }
  },
  success: (payload: IAuthenticationResponse): StandardAction => {
    return {
      type: REGISTER_ACTION.SUCCESS,
      payload
    }
  },
  failure: (error: string): StandardAction => {
    return {
      type: REGISTER_ACTION.FAILURE,
      payload: { error }
    }
  },
  cancel: (): StandardAction => {
    return {
      type: REGISTER_ACTION.CANCEL
    }
  }
};

export const fetchUserAction = {
  request: (): StandardAction => {
    return {
      type: FETCH_USER_ACTION.REQUEST
    }
  },
  success: (user: IUser): StandardAction => {
    return {
      type: FETCH_USER_ACTION.SUCCESS,
      payload: {user}
    }
  },
  failure: (error: string): StandardAction => {
    return {
      type: FETCH_USER_ACTION.FAILURE,
      payload: { error }
    }
  },
  cancel: (): StandardAction => {
    return {
      type: FETCH_USER_ACTION.CANCEL
    }
  }
};

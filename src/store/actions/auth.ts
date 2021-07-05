import { IAuthenticationResponse, IForgotPassword, ILogin, IRegister } from "interface";
import { defineRequestType, RequestType, StandardAction } from "./actions";
export const LOGIN_ACTION: RequestType = defineRequestType("LOGIN_ACTION");
export const REGISTER_ACTION: RequestType = defineRequestType("REGISTER_ACTION");
export const FORGOT_PASSWORD_ACTION: RequestType = defineRequestType("FORGOT_PASSWORD_ACTION");

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

export const forgotPasswordAction = {
  request: (payload: IForgotPassword): StandardAction => {
    return {
      type: FORGOT_PASSWORD_ACTION.REQUEST,
      payload: payload
    }
  },
  success: (message: string): StandardAction => {
    return {
      type: FORGOT_PASSWORD_ACTION.SUCCESS,
      payload: { message }
    }
  },
  failure: (error: string): StandardAction => {
    return {
      type: FORGOT_PASSWORD_ACTION.FAILURE,
      payload: { error }
    }
  },
  cancel: (): StandardAction => {
    return {
      type: FORGOT_PASSWORD_ACTION.CANCEL
    }
  }
};

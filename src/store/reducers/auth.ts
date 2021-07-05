import { IUser } from "interface";
import { FORGOT_PASSWORD_ACTION, LOGIN_ACTION, REGISTER_ACTION } from "store/actions";

export interface AuthState {
  isAuthenticated: boolean;
  token: string;
  user: IUser;
  isLoading: boolean;
  error: boolean;
  message: string;
  isCanceled: boolean;
}

const INITIAL_STATE: AuthState = {
  isAuthenticated: false,
  token: undefined!,
  user: undefined!,
  isLoading: false,
  error: false,
  message: undefined!,
  isCanceled: false
};

const authState = (state: AuthState = INITIAL_STATE, action: any): AuthState => {
  const { payload, type } = action;
  switch (type) {
    case LOGIN_ACTION.REQUEST:
    case REGISTER_ACTION.REQUEST:
    case FORGOT_PASSWORD_ACTION.REQUEST:
      return {
        ...state,
        error: undefined!,
        isLoading: true,
        isCanceled: false
      };
    case LOGIN_ACTION.SUCCESS:
    case REGISTER_ACTION.SUCCESS:
      localStorage.setItem('app-token', payload.token);
      return {
        ...state,
        error: undefined!,
        message: undefined!,
        isLoading: false,
        token: payload.token,
        isAuthenticated: true
      };
    case FORGOT_PASSWORD_ACTION.SUCCESS:
      return {
        ...state,
        error: undefined!,
        message: payload.message,
        isLoading: false,
        token: undefined!,
      };
    case LOGIN_ACTION.FAILURE:
    case REGISTER_ACTION.FAILURE:
    case FORGOT_PASSWORD_ACTION.FAILURE:
      return {
        ...state,
        error: true,
        message: payload.message,
        isLoading: false
      };
    case LOGIN_ACTION.CANCEL:
    case REGISTER_ACTION.CANCEL:
    case FORGOT_PASSWORD_ACTION.CANCEL:
      return {
        ...state,
        isCanceled: true
      }
    default:
      return state;
  }
}

export default authState;
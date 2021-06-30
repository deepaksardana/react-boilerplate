import { IUser } from "interface";

export interface AuthState {
  isAuthenticated: boolean;
  token: string;
  user: IUser;
}

const INITIAL_STATE: AuthState = {
  isAuthenticated: false,
  token: undefined!,
  user: undefined!
};

const authState = (state: AuthState = INITIAL_STATE, action: any): AuthState => {
  switch (action.type) {
    default:
      return state;
  }
}

export default authState;
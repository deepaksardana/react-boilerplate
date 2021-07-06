import { RouterState, connectRouter } from "connected-react-router";
import { combineReducers } from "redux";
import { History } from 'history';
import { reducer as formReducer, FormStateMap } from 'redux-form'

import authState, { AuthState } from "./auth";
import configState, { ConfigState } from "./config"
import { textRext } from "rext";
import { IRextReducer } from "store/baseStoreProviders";
export type { AuthState } from "./auth";

export interface ApplicationState {
  router: RouterState;
  form: FormStateMap;
  configState: ConfigState;
  authState: AuthState;
  textRext: IRextReducer;
}

const rootReducer =  (history: History) => combineReducers<ApplicationState>({
  router: connectRouter(history),
  form: formReducer,
  configState,
  authState,
  textRext: textRext.reducers
})

export default rootReducer;
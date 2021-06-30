import { RouterState, connectRouter } from "connected-react-router";
import { combineReducers } from "redux";
import { History } from 'history';
import { I18nState, i18nReducer } from "react-redux-i18n";
import { Reducer } from "react";

import authState, { AuthState } from "./auth";
import configState, { ConfigState } from "./config"
import { createRext, IRextReducer } from "store/baseStoreProviders";

export const rext = createRext();
export interface ApplicationState {
  router: RouterState;
  i18n: Reducer<I18nState, any>;
  configState: ConfigState;
  authState: AuthState;
  rext: IRextReducer;
}

const rootReducer =  (history: History) => combineReducers<ApplicationState>({
  router: connectRouter(history),
  i18n: i18nReducer,
  configState,
  authState,
  rext: rext.reducers
})

export default rootReducer;
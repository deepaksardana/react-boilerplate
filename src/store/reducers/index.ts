import { RouterState, connectRouter } from "connected-react-router";
import { combineReducers } from "redux";
import { History } from 'history';
import { I18nState, i18nReducer } from "react-redux-i18n";
import { Reducer } from "react";
import { reducer as formReducer, FormStateMap } from 'redux-form'

import authState, { AuthState } from "./auth";
import configState, { ConfigState } from "./config"
import { createRext, IRextReducer } from "store/baseStoreProviders";

export const rext = createRext();
export interface ApplicationState {
  router: RouterState;
  i18n: Reducer<I18nState, any>;
  form: FormStateMap;
  configState: ConfigState;
  authState: AuthState;
  rext: IRextReducer;
}

const rootReducer =  (history: History) => combineReducers<ApplicationState>({
  router: connectRouter(history),
  i18n: i18nReducer,
  form: formReducer,
  configState,
  authState,
  rext: rext.reducers
})

export default rootReducer;
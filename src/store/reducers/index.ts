import { RouterState, connectRouter } from "connected-react-router";
import { combineReducers } from "redux";
import { History } from 'history';
import { I18nState, i18nReducer} from "react-redux-i18n";
import { Reducer } from "react";

export interface ApplicationState {
    router: RouterState;
    i18n: Reducer<I18nState, any>
}

export default (history: History) => combineReducers<ApplicationState>({
    router: connectRouter(history),
    i18n: i18nReducer
})
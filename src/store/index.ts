import { applyMiddleware, createStore, Store, Dispatch } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import { routerMiddleware } from 'connected-react-router';
import { History, createBrowserHistory } from 'history';
import createSagaMiddleware from 'redux-saga';
import { loadTranslations, setLocale, syncTranslationWithStore} from 'react-redux-i18n';
import thunk from 'redux-thunk';

import createRootReducer, { ApplicationState } from "./reducers";
import rootSaga from "./saga";
import i18nDictionary from "I18n";


export const history: History = createBrowserHistory();

export default function configureStore(initialState: ApplicationState) : Store<ApplicationState> {
    // create the composing function for our middlewares
    const composeEnhancers = composeWithDevTools({})
    const sagaMiddleware = createSagaMiddleware()
    const store = createStore(
        createRootReducer(history),
        initialState,
        composeEnhancers(
            applyMiddleware(
                routerMiddleware(history),
                thunk,
                sagaMiddleware
            )
        )
    );
    sagaMiddleware.run(rootSaga);

    const { language } = navigator;
    const languageCode = language.slice(0, 2);

    // initialize react-redux-i18n
    syncTranslationWithStore(store);
    (store.dispatch as Dispatch<any>)(loadTranslations(i18nDictionary));
    (store.dispatch as Dispatch<any>)(setLocale(languageCode));

    return store
}

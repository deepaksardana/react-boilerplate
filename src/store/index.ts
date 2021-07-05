import { applyMiddleware, createStore, Store } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import { routerMiddleware } from 'connected-react-router';
import { History, createBrowserHistory } from 'history';
import createSagaMiddleware from 'redux-saga';

import createRootReducer, { ApplicationState } from "./reducers";
import rootSaga from "./saga";

export const history: History = createBrowserHistory();

export default function configureStore(initialState: object) : Store<ApplicationState> {
    // create the composing function for our middlewares
    const composeEnhancers = composeWithDevTools({})
    const sagaMiddleware = createSagaMiddleware()
    const store = createStore(
        createRootReducer(history),
        initialState,
        composeEnhancers(
            applyMiddleware(
                routerMiddleware(history),
                sagaMiddleware
            )
        )
    );
    sagaMiddleware.run(rootSaga);
    return store
}

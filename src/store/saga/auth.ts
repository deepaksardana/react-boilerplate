import { SagaIterator } from 'redux-saga';
import { put, call, select, cancelled, takeLatest, cancel } from 'redux-saga/effects';
import {
  LOGIN_ACTION, REGISTER_ACTION, FETCH_USER_ACTION,
  loginAction, registerAction,
  StandardAction,
  fetchUserAction
} from '../actions';
import { getBaseUrl, getToken } from "../selectors";
import { fetchGetRequest, fetchPostRequest } from "Api";
import URLRoutes from 'URLRoutes';

function* performLoginOperation(action: StandardAction): IterableIterator<{}> {
  const { payload } = action;
  const controller = new AbortController();
  try {
    const url: string = `${(yield select(getBaseUrl))!}${URLRoutes.server.login}`;
    const response: any = yield call(fetchPostRequest, controller, url, undefined!, payload);

    const fetchUserUrl: string = `${(yield select(getBaseUrl))!}${URLRoutes.server.fetchUser}`;
    const userResponse: any = yield call(fetchGetRequest, controller, fetchUserUrl, response.data?.accessToken);

    localStorage.setItem(process.env.REACT_APP_TOKEN_KEY || "APP_TOKEN", response.data?.accessToken);
    
    yield put(loginAction.success({ token: response.data?.accessToken, user: userResponse.data }));
  } catch (error) {
    yield put(loginAction.failure(error.message));
  } finally {
    if (yield (cancelled())) {
      controller.abort();
    }
  }
}

function* performRegisterOperation(action: StandardAction): IterableIterator<{}> {
  const { payload } = action;
  const controller = new AbortController();
  try {
    const url: string = `${(yield select(getBaseUrl))!}${URLRoutes.server.register}`;
    const response: any = yield call(fetchPostRequest, controller, url, undefined!, payload);

    const fetchUserUrl: string = `${(yield select(getBaseUrl))!}${URLRoutes.server.fetchUser}`;
    const userResponse: any = yield call(fetchGetRequest, controller, fetchUserUrl, response.data?.accessToken);

    localStorage.setItem(process.env.REACT_APP_TOKEN_KEY || "APP_TOKEN", response.data?.accessToken);    
    yield put(registerAction.success({ token: response.token, user: userResponse.data }));
  } catch (error) {
    yield put(registerAction.failure(error.message));

  } finally {
    if (yield (cancelled())) {
      controller.abort();
    }
  }
}

function* performFetchUserOperation(action: StandardAction): IterableIterator<{}> {
  const controller = new AbortController();
  try {
    const token = yield select(getToken);
    const url: string = `${(yield select(getBaseUrl))!}${URLRoutes.server.fetchUser}`;
    const response: any = yield call(fetchGetRequest, controller, url, token!);
    yield put(fetchUserAction.success(response.data));
  } catch (error) {
    yield put(fetchUserAction.failure(error.message));
  } finally {
    if (yield (cancelled())) {
      controller.abort();
    }
  }
}

function* cancelPolling(pollTask: any) {
  yield cancel(pollTask);
}

export function* watchAuthEvent(): SagaIterator {
  const loginEventEffect = yield takeLatest(LOGIN_ACTION.REQUEST, performLoginOperation);
  yield takeLatest(LOGIN_ACTION.CANCEL, () => cancelPolling(loginEventEffect));

  const registerEventEffect = yield takeLatest(REGISTER_ACTION.REQUEST, performRegisterOperation);
  yield takeLatest(REGISTER_ACTION.CANCEL, () => cancelPolling(registerEventEffect));

  const fetchEventEffect = yield takeLatest(FETCH_USER_ACTION.REQUEST, performFetchUserOperation);
  yield takeLatest(FETCH_USER_ACTION.CANCEL, () => cancelPolling(fetchEventEffect));
}
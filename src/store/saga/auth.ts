import { SagaIterator } from 'redux-saga';
import { fork, takeEvery, put, call, select, cancelled, takeLatest, cancel, all } from 'redux-saga/effects';
import {
  FORGOT_PASSWORD_ACTION, LOGIN_ACTION, REGISTER_ACTION, FETCH_USER_ACTION,
  loginAction, registerAction, forgotPasswordAction,
  StandardAction,
  fetchUserAction
} from '../actions';
import { getBaseUrl, getToken } from "../selectors";
import { fetchPostRequest } from "Api";
import URLRoutes from 'URLRoutes';

function* performLoginOperation(action: StandardAction): IterableIterator<{}> {
  const { payload } = action;
  const controller = new AbortController();
  try {
    const url: string = `${(yield select(getBaseUrl))!}${URLRoutes.server.login}`;
    const response: any = yield call(fetchPostRequest, controller, url, undefined!, payload);

    const fetchUserUrl: string = `${(yield select(getBaseUrl))!}${URLRoutes.server.fetchUser}`;
    const userResponse: any = yield call(fetchPostRequest, controller, fetchUserUrl, response.token, payload);
    localStorage.setItem('app-token', payload.token);
    
    yield put(loginAction.success({ token: response.token, user: userResponse }));
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
    const userResponse: any = yield call(fetchPostRequest, controller, fetchUserUrl, response.token, payload);
    localStorage.setItem('app-token', payload.token);

    yield put(registerAction.success({ token: response.token, user: userResponse }));
  } catch (error) {
    yield put(registerAction.failure(error.message));

  } finally {
    if (yield (cancelled())) {
      controller.abort();
    }
  }
}

function* performForgotPasswordOperation(action: StandardAction): IterableIterator<{}> {
  const { payload } = action;
  const controller = new AbortController();
  try {
    const url: string = `${(yield select(getBaseUrl))!}${URLRoutes.server.forgot}`;
    const response: any = yield call(fetchPostRequest, controller, url, undefined!, payload);
    yield put(forgotPasswordAction.success(response.message || "Password sent to your email"));
  } catch (error) {
    yield put(forgotPasswordAction.failure(error.message));
  } finally {
    if (yield (cancelled())) {
      controller.abort();
    }
  }
}

function* performFetchUserOperation(action: StandardAction): IterableIterator<{}> {
  const { payload } = action;
  const controller = new AbortController();
  try {
    const token = yield select(getToken);
    const url: string = `${(yield select(getBaseUrl))!}${URLRoutes.server.fetchUser}`;
    const response: any = yield call(fetchPostRequest, controller, url, token!, payload);
    yield put(fetchUserAction.success(response));
  } catch (error) {
    yield put(forgotPasswordAction.failure(error.message));
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

  const forgotEventEffect = yield takeLatest(FORGOT_PASSWORD_ACTION.REQUEST, performForgotPasswordOperation);
  yield takeLatest(FORGOT_PASSWORD_ACTION.CANCEL, () => cancelPolling(forgotEventEffect));

  const fetchEventEffect = yield takeLatest(FETCH_USER_ACTION.REQUEST, performFetchUserOperation);
  yield takeLatest(FETCH_USER_ACTION.CANCEL, () => cancelPolling(fetchEventEffect));
}
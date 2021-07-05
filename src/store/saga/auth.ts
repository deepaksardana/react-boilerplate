import { SagaIterator } from 'redux-saga';
import { fork, takeEvery, put, call, select, cancelled, takeLatest, cancel, all } from 'redux-saga/effects';
import {
  FORGOT_PASSWORD_ACTION, LOGIN_ACTION, REGISTER_ACTION,
  loginAction, registerAction, forgotPasswordAction,
  StandardAction
} from '../actions';
import { getBaseUrl } from "../selectors";
import { fetchPostRequest } from "Api";
import URLRoutes from 'URLRoutes';

export const loginEvent = fork(() => watchEvent(LOGIN_ACTION, performLoginOperation));
export const registerEvent = fork(() => watchEvent(REGISTER_ACTION, performRegisterOperation));
export const forgotEvent = fork(() => watchEvent(FORGOT_PASSWORD_ACTION, performForgotPasswordOperation));

function* performLoginOperation(action: StandardAction): IterableIterator<{}> {
  const { payload } = action;
  const controller = new AbortController();
  try {
    const url: string = `${(yield select(getBaseUrl))!}${URLRoutes.server.login}`;
    const response: any = yield call(fetchPostRequest, controller, url, undefined!, payload);
    yield put(loginAction.success({ token: response.token }));
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
    yield put(registerAction.success({ token: response.token }));
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

function* cancelPolling(pollTask: any) {
  yield cancel(pollTask);
}

function* watchEvent(eventName: any, performingFunction: any): SagaIterator {
  const effect = yield takeLatest(eventName.REQUEST, performingFunction);
  yield takeLatest(eventName.CANCEL, () => cancelPolling(effect));
}
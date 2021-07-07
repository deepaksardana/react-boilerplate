import { SagaIterator } from 'redux-saga';
import { put, call, select, fork, takeLatest, cancel, cancelled } from 'redux-saga/effects';
import {
  rextActionFunctions,
  ActionIdentity
} from './actions';
import { getToken, getBaseUrl } from "../../selectors";
import { fetchGetRequest, fetchPostRequest, generateUrlWithRequestParams, generateQueryParamsString } from "Api";
import { IRextAction, IRextParams, IRextKeys } from "./keys";

function* performRequestRextOperation(action: IRextAction): IterableIterator<{}> {
  const { meta, payload } = action;
  const controller: AbortController = new AbortController();
  try {
    const token: string = (yield select(getToken))!;
    const url: string = getFullUrl((yield select(getBaseUrl))!, meta.keys, payload.params);
    let response: any = undefined;

    if (meta.keys.method === 'post' || meta.keys.method === 'put') {
      response = yield call(fetchPostRequest, controller, url, token, (payload.params && payload.params.body) || {}, meta.keys.method, payload.params && payload.params.headers);
    } else {
      response = yield call(fetchGetRequest, controller, url, token, meta.keys.method, payload.params && payload.params.headers);
    }

    yield put(rextActionFunctions.success(meta, payload.params!, response.data || response.record || response, response.message || "Execution Done Successfully"));
  } catch (error) {
    if (yield (cancelled())) {
      controller.abort();
    } else {
      yield put(rextActionFunctions.failure(meta, payload.params!, error.message || "Execution Failed"));
    }
  } finally {
    if (yield (cancelled())) {
      controller.abort();
    }
  }
}

function* cancelPolling(pollTask: any) {
  yield cancel(pollTask);
}

export default function (actionidentity: ActionIdentity) {
  return function* watchRextEvent(): SagaIterator {
    const createEffect = yield takeLatest(actionidentity.REXT_CREATE.REQUEST, performRequestRextOperation);
    yield takeLatest(actionidentity.REXT_CREATE.CANCEL, () => cancelPolling(createEffect));

    const fetchEffect = yield takeLatest(actionidentity.REXT_FETCH.REQUEST, performRequestRextOperation);
    yield takeLatest(actionidentity.REXT_FETCH.CANCEL, () => cancelPolling(fetchEffect));

    const listEffect = yield takeLatest(actionidentity.REXT_LIST.REQUEST, performRequestRextOperation);
    yield takeLatest(actionidentity.REXT_LIST.CANCEL, () => cancelPolling(listEffect));

    const updateEffect = yield takeLatest(actionidentity.REXT_UPDATE.REQUEST, performRequestRextOperation);
    yield takeLatest(actionidentity.REXT_UPDATE.CANCEL, () => cancelPolling(updateEffect));
  }
}

function getFullUrl(baseUrl: string, keys: IRextKeys, params?: IRextParams): string {
  let url = `${baseUrl}${keys.url}`;
  if (params && params.urlParams) {
    url = generateUrlWithRequestParams(url, params.urlParams)
  }
  if (params && params.queryParams) {
    url = `${url}?${generateQueryParamsString(params.queryParams)}`
  }
  return url;
}
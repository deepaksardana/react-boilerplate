import { SagaIterator } from 'redux-saga';
import { takeEvery, put, call, select } from 'redux-saga/effects';
import {
  REXT_CREATE,
  REXT_FETCH,
  REXT_LIST,
  REXT_UPDATE,
  rextCreate,
  rextFetch,
  rextList,
  rextUpdate
} from './actions';
import { getToken, getBaseUrl } from "../../selectors";
import { fetchGetRequest, fetchPostRequest, generateUrlWithRequestParams, generateQueryParamsString } from "Api";
import { IRextAction, IRextParams, IRextKeys } from "./keys";
export function* performRequestRextOperation(action: IRextAction): IterableIterator<{}> {
  const { meta, payload } = action;
  try {
    const token: string = (yield select(getToken))!;
    const url: string = getFullUrl((yield select(getBaseUrl))!, meta.keys, payload.params);
    let response: any = undefined;
    const controller = new AbortController();
    if(meta.keys.method === 'post' || meta.keys.method === 'put') {
      response = yield call(fetchPostRequest, controller,  url, token, (payload.params && payload.params.body) || {}, meta.keys.method, payload.params && payload.params.headers);
    } else {
      response = yield call(fetchGetRequest, controller, url, token, meta.keys.method, payload.params && payload.params.headers);
    }
    if (action.type === REXT_FETCH.REQUEST) {
      yield put(rextFetch.success(meta.uniqueKey, meta.keys, payload.params!, response.data || response.record || response, response.message || "Fetched Successfully"));
    } else if (action.type === REXT_CREATE.REQUEST) {
      yield put(rextCreate.success(meta.uniqueKey, meta.keys, payload.params!, response.data || {}, response.message || "Created Successfully"));
    } else if (action.type === REXT_UPDATE.REQUEST) {
      yield put(rextUpdate.success(meta.uniqueKey, meta.keys, payload.params!, (response && (response.data || response.record)) || {}, response.message || "Updated Successfully"));
    } else if (action.type === REXT_LIST.REQUEST) {
      yield put(rextList.success(meta.uniqueKey, meta.keys, payload.params!, response.data || response.record || response || [], response.message || "Fetched List Successfully"));
    } else {
      console.log("No event found.")
    }
  } catch (error) {
    if (action.type === REXT_FETCH.REQUEST) {
      yield put(rextFetch.failure(meta.uniqueKey, meta.keys, payload.params!, error.message));
    } else if (action.type === REXT_CREATE.REQUEST) {
      yield put(rextCreate.failure(meta.uniqueKey, meta.keys, payload.params!, error.message));
    } else if (action.type === REXT_UPDATE.REQUEST) {
      yield put(rextUpdate.failure(meta.uniqueKey, meta.keys, payload.params!, error.message));
    } else if (action.type === REXT_LIST.REQUEST) {
      yield put(rextList.failure(meta.uniqueKey, meta.keys, payload.params!, error.message));
    } else {
      console.log("No event found.")
    }
  }
}
export function* watchRextEvent(): SagaIterator {
  yield takeEvery(REXT_CREATE.REQUEST, performRequestRextOperation);
  yield takeEvery(REXT_FETCH.REQUEST, performRequestRextOperation);
  yield takeEvery(REXT_LIST.REQUEST, performRequestRextOperation);
  yield takeEvery(REXT_UPDATE.REQUEST, performRequestRextOperation);
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
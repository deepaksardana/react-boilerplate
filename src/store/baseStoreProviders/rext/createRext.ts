import { combineReducers, Reducer } from 'redux';
import {
  info as infoReducer,
  items as itemsReducer,
  resources as resourcesReducer   
} from './reducer';
import { rextCreate, rextFetch, rextList, rextUpdate, unmountRext } from './actions';
import { IRextKeys, IRextActionCreators, IRextParams, RextItemsReducer, IRextAction, RextInfoReducer, RextResourcesReducer, IRext } from "./keys";
export const onlyForEndpoint = (uniqueKey: string, reducer: any) => (state = {}, action: any = {}) =>
  typeof action.meta == 'undefined' ? state : action.meta.uniqueKey === uniqueKey ? reducer(state, action) : state
export const getRextActionCreators = (uniqueKey: string): IRextActionCreators => {
  return {
    requestRext: (keys: IRextKeys, params: IRextParams, resources?: any) => rextFetch.request(uniqueKey, keys, params, resources),
    createRext: (keys: IRextKeys, params: IRextParams, resources?: any) => rextCreate.request(uniqueKey, keys, params, resources),
    updateRext: (keys: IRextKeys, params: IRextParams, resources?: any) => rextUpdate.request(uniqueKey, keys, params, resources),
    listRext: (keys: IRextKeys, params: IRextParams, resources?: any) => rextList.request(uniqueKey, keys, params, resources),
    unmountRext: (keys: IRextKeys) => unmountRext(uniqueKey, keys)
  }
}
export const rext = (items: Reducer<RextItemsReducer, IRextAction>,
  info: Reducer<RextInfoReducer, IRextAction>,
  resources: Reducer<RextResourcesReducer, IRextAction>,
  requestRextActionCreators: IRextActionCreators): IRext => ({
  reducers: combineReducers({
    info,
    items,
    resources
  }),
  ...requestRextActionCreators
});
export const createRext = (): IRext => {
  const info = onlyForEndpoint("@REDUX_REXT", infoReducer);
  const items = onlyForEndpoint("@REDUX_REXT", itemsReducer);
  const resources = onlyForEndpoint("@REDUX_REXT", resourcesReducer);
  const rextActionCreators = getRextActionCreators("@REDUX_REXT")
  return rext(items, info, resources, rextActionCreators);
}
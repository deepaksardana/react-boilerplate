import { combineReducers, Reducer } from 'redux';
import {
  info as infoReducer,
  items as itemsReducer,
  resources as resourcesReducer   
} from './reducer';
import { rextActionFunctions, createIdentityAction, rextUnmount, ActionIdentity } from './actions';
import { IRextKeys, IRextActionCreators, IRextParams, IRextItem, IRextAction, IRextInfo, IRext } from "./keys";
import createSagaEvent from "./saga";


export const onlyForEndpoint = (uniqueKey: string, reducer: any, actionidentity: ActionIdentity) => (state = {}, action: any = {}) =>
  typeof action.meta == 'undefined' ? state : action.meta.uniqueKey === uniqueKey ? reducer(state, action, actionidentity) : state

export const getRextActionCreators = (uniqueKey: string, keys: IRextKeys, actionidentity: ActionIdentity): IRextActionCreators => {
  return {
    requestRext: (params: IRextParams, resources?: any) => rextActionFunctions.request(actionidentity.REXT_FETCH ,uniqueKey, keys, params, resources),
    requestRextCancel: () => rextActionFunctions.cancel(actionidentity.REXT_FETCH, uniqueKey, keys),
    createRext: ( params: IRextParams, resources?: any) => rextActionFunctions.request(actionidentity.REXT_CREATE, uniqueKey, keys, params, resources),
    createRextCancel: () => rextActionFunctions.cancel(actionidentity.REXT_FETCH, uniqueKey, keys),
    updateRext: ( params: IRextParams, resources?: any) => rextActionFunctions.request(actionidentity.REXT_UPDATE, uniqueKey, keys, params, resources),
    updateRextCancel: () => rextActionFunctions.cancel(actionidentity.REXT_FETCH, uniqueKey, keys),
    listRext: ( params: IRextParams, resources?: any) => rextActionFunctions.request(actionidentity.REXT_LIST, uniqueKey, keys, params, resources),
    listRextCancel: () => rextActionFunctions.cancel(actionidentity.REXT_FETCH, uniqueKey, keys),
    unmountRext: () => rextUnmount(actionidentity.UNMOUNT_REXT, uniqueKey, keys)
  }
}
export const rext = (items: Reducer<IRextItem, IRextAction>,
  info: Reducer<IRextInfo, IRextAction>,
  resources: Reducer<any, IRextAction>,
  requestRextActionCreators: IRextActionCreators,
  saga: any): IRext => ({
  reducers: combineReducers({
    info,
    items,
    resources
  }),
  ...requestRextActionCreators,
  saga
});
export const createRext = (keys: IRextKeys): IRext => {
  const { identity } = keys;
  const actionidentity = createIdentityAction(keys.identity);
  const info = onlyForEndpoint(`@${identity}REDUX_REXT`, infoReducer, actionidentity);
  const items = onlyForEndpoint(`@${identity}REDUX_REXT`, itemsReducer, actionidentity);
  const resources = onlyForEndpoint(`@${identity}REDUX_REXT`, resourcesReducer, actionidentity);
  const rextActionCreators = getRextActionCreators(`@${identity}REDUX_REXT`, keys, actionidentity)
  const sagaEvent = createSagaEvent(actionidentity);
  return rext(items, info, resources, rextActionCreators, sagaEvent);
}
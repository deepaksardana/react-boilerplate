import { Reducer, Action } from "redux";
export type IRextActionDefinition = (keys: IRextKeys, params: IRextParams, resources?: any) => IRextAction;
export type IRextUnmountActionDefinition = (keys: IRextKeys) => IRextAction;
export interface IRextActionCreators {
  requestRext: IRextActionDefinition;
  updateRext: IRextActionDefinition;
  createRext: IRextActionDefinition;
  listRext: IRextActionDefinition;
  unmountRext: IRextUnmountActionDefinition;
}
export interface IRextMeta {
  uniqueKey: string;
  keys: IRextKeys;
}
export interface IRextKeys {
  identity: string,
  primaryKey: string,
  url: string,
  method: 'get' | 'post' | 'put';
  transformation?: any;
  maintainOldValues?: boolean;
}
export interface IRextParams {
  queryParams?: { [key: string]: string | number | boolean };
  urlParams?: { [key: string]: string | number };
  body?: any;
  headers?: Headers;
}
export interface IRextAction extends Action {
  meta: IRextMeta;
  payload: {
    params?: IRextParams;
    resources?: any;
    items?: any;
    message?: string;
    error?: boolean;
  };
}
/**
 * Reducers
 */
export interface IRextInfo {
  params?: IRextParams;
  fetching?: boolean;
  fetchingList?: boolean;
  updatingInProgress?: boolean;
  creationInProgress?: boolean;
  hasError?: boolean;
  message?: string;
}
export interface IRextItem {
  data?: any;
  list?: Array<any>;
}
export interface RextInfoReducer {
  [key: string]: IRextInfo;
}
export interface RextResourcesReducer {
  [key: string]: any;
}
export interface RextItemsReducer {
  [key: string]: IRextItem
}
export interface IRextReducer {
  info: RextInfoReducer;
  resources: RextResourcesReducer;
  items: RextItemsReducer;
}
export interface IRext extends IRextActionCreators {
  reducers: Reducer<IRextReducer, IRextAction>;
}
/**
 * Selector
 */
export interface IRextState {
  fetching?: boolean;
  fetchingList?: boolean;
  updatingInProgress?: boolean;
  creationInProgress?: boolean;
  data: any;
  resources: any;
  error: boolean;
  message: string | undefined;
  list: Array<any>;
}
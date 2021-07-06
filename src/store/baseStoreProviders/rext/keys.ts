import { Reducer, Action } from "redux";
import { RequestType } from "store/actions";

export type IRextActionDefinition = (params: IRextParams, resources?: any) => IRextAction;
export type IRextActionCancelDefinition = () => IRextAction;

export type IRextUnmountActionDefinition = () => {type: string};

export interface IRextActionCreators {
  requestRext: IRextActionDefinition;
  requestRextCancel: IRextActionCancelDefinition;
  updateRext: IRextActionDefinition;
  updateRextCancel: IRextActionDefinition;
  createRext: IRextActionDefinition;
  createRextCancel: IRextActionDefinition;
  listRext: IRextActionDefinition;
  listRextCancel: IRextActionDefinition;
  unmountRext: IRextUnmountActionDefinition;
}
export interface IRextMeta {
  uniqueKey: string;
  keys: IRextKeys;
  actions: RequestType;
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
  isCancelled: boolean;
}
export interface IRextItem {
  data?: any;
  list?: Array<any>;
}
export interface RextResourcesReducer {
  [key: string]: any;
}

export interface IRextReducer {
  info: IRextInfo;
  resources: any;
  items: IRextItem;
}
export interface IRext extends IRextActionCreators {
  reducers: Reducer<IRextReducer, IRextAction>;
  saga: any;
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
  isCancelled: boolean;
}
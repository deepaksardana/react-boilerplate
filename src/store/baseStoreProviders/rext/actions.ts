import { defineRequestType, RequestType } from "../../actions/actions";
import { IRextParams, IRextKeys, IRextAction, IRextMeta } from "./keys";

export interface ActionIdentity {
  REXT_FETCH :RequestType;
  REXT_UPDATE :RequestType;
  REXT_CREATE :RequestType;
  REXT_LIST :RequestType;
}

export function createIdentityAction(identity: string): ActionIdentity {
  return {
    REXT_FETCH: defineRequestType(`@${identity}CUSTOM_REDUX_REXT_FETCH`),
    REXT_UPDATE: defineRequestType(`@${identity}CUSTOM_REDUX_REXT_UPDATE`),
    REXT_CREATE: defineRequestType(`@${identity}CUSTOM_REDUX_REXT_CREATE`),
    REXT_LIST: defineRequestType(`@${identity}CUSTOM_REDUX_REXT_LIST`)
  }
}

export const rextActionFunctions = {
  request: (meta: IRextMeta, params: IRextParams, resources?: any): IRextAction => {
    const {actions} = meta;
    return {
      type: actions.REQUEST,
      meta,
      payload: {
        params,
        resources
      }
    };
  },
  success: (meta: IRextMeta, params: IRextParams, items: any, message: string):
    IRextAction => {
    const {actions} = meta;
    return {
      type: actions.SUCCESS,
      meta,
      payload: {
        params, items, message
      }
    };
  },
  failure: (meta: IRextMeta, params: IRextParams, message: string): IRextAction => {
    const {actions} = meta;
    return {
      type: actions.FAILURE,
      meta,
      payload: {
        params, message
      }
    };
  },
  cancel: (meta: IRextMeta): IRextAction => {
    const {actions} = meta;
    return {
      type: actions.CANCEL,
      meta,
      payload: {}
    };
  },
};
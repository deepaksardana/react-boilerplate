import { defineRequestType, RequestType } from "../../actions/actions";
import { IRextParams, IRextKeys, IRextAction } from "./keys";

export interface ActionIdentity {
  REXT_FETCH :RequestType;
  REXT_UPDATE :RequestType;
  REXT_CREATE :RequestType;
  REXT_LIST :RequestType;
  UNMOUNT_REXT: string;
}

export function createIdentityAction(identity: string): ActionIdentity {
  return {
    REXT_FETCH: defineRequestType(`@${identity}CUSTOM_REDUX_REXT_FETCH`),
    REXT_UPDATE: defineRequestType(`@${identity}CUSTOM_REDUX_REXT_UPDATE`),
    REXT_CREATE: defineRequestType(`@${identity}CUSTOM_REDUX_REXT_CREATE`),
    REXT_LIST: defineRequestType(`@${identity}CUSTOM_REDUX_REXT_LIST`),
    UNMOUNT_REXT: `@${identity}CUSTOM_REDUX_UNMOUNT_REXT`
  }
}

export const rextActionFunctions = {
  request: (actions:RequestType, uniqueKey: string, keys: IRextKeys, params: IRextParams, resources?: any): IRextAction => {
    return {
      type: actions.REQUEST,
      meta: {
        uniqueKey, keys, actions
      },
      payload: {
        params,
        resources
      }
    };
  },
  success: (actions:RequestType, uniqueKey: string, keys: IRextKeys, params: IRextParams, items: any, message: string):
    IRextAction => {
    return {
      type: actions.SUCCESS,
      meta: {
        uniqueKey, keys, actions
      },
      payload: {
        params, items, message
      }
    };
  },
  failure: (actions:RequestType, uniqueKey: string, keys: IRextKeys, params: IRextParams, message: string): IRextAction => {
    return {
      type: actions.FAILURE,
      meta: {
        uniqueKey, keys, actions
      },
      payload: {
        params, message
      }
    };
  },
  cancel: (actions: RequestType, uniqueKey: string, keys: IRextKeys): IRextAction => {
    return {
      type: actions.CANCEL,
      meta: {
        uniqueKey, keys, actions
      },
      payload: {
      }
    };
  },
};

export const rextUnmount = (type: string, uniqueKey: string, keys: IRextKeys): {type: string} => {
  return {
    type
  };
}
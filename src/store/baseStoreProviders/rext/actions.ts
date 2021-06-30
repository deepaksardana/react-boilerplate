import { defineRequestType, RequestType } from "../../actions/actions";
import { IRextParams, IRextKeys, IRextAction } from "./keys";
export const REXT_FETCH: RequestType = defineRequestType("@CUSTOM_REDUX_REXT_FETCH");
export const REXT_UPDATE: RequestType = defineRequestType("@CUSTOM_REDUX_REXT_UPDATE");
export const REXT_CREATE: RequestType = defineRequestType("@CUSTOM_REDUX_REXT_CREATE");
export const REXT_LIST: RequestType = defineRequestType("@CUSTOM_REDUX_REXT_LIST");
export const UNMOUNT_REXT: string = "@CUSTOM_REDUX_UNMOUNT_REXT";
export const rextFetch = {
  request: (uniqueKey: string, keys: IRextKeys, params: IRextParams, resources?: any): IRextAction => {
    return {
      type: REXT_FETCH.REQUEST,
      meta: {
        uniqueKey, keys
      },
      payload: {
        params,
        resources
      }
    };
  },
  success: (uniqueKey: string, keys: IRextKeys, params: IRextParams, items: any, message: string):
    IRextAction => {
    return {
      type: REXT_FETCH.SUCCESS,
      meta: {
        uniqueKey, keys
      },
      payload: {
        params, items, message
      }
    };
  },
  failure: (uniqueKey: string, keys: IRextKeys, params: IRextParams, message: string): IRextAction => {
    return {
      type: REXT_FETCH.FAILURE,
      meta: {
        uniqueKey, keys
      },
      payload: {
        params, message
      }
    };
  }
};
export const rextCreate = {
  request: (uniqueKey: string, keys: IRextKeys, params: IRextParams, resources?: any): IRextAction => {
    return {
      type: REXT_CREATE.REQUEST,
      meta: {
        uniqueKey, keys
      },
      payload: {
        params,
        resources
      }
    };
  },
  success: (uniqueKey: string, keys: IRextKeys, params: IRextParams, items: any, message: string):
    IRextAction => {
    return {
      type: REXT_CREATE.SUCCESS,
      meta: {
        uniqueKey, keys
      },
      payload: {
        params, items, message
      }
    };
  },
  failure: (uniqueKey: string, keys: IRextKeys, params: IRextParams, message: string): IRextAction => {
    return {
      type: REXT_CREATE.FAILURE,
      meta: {
        uniqueKey, keys
      },
      payload: {
        params, message
      }
    };
  }
};
export const rextUpdate = {
  request: (uniqueKey: string, keys: IRextKeys, params: IRextParams, resources?: any): IRextAction => {
    return {
      type: REXT_UPDATE.REQUEST,
      meta: {
        uniqueKey, keys
      },
      payload: {
        params,
        resources
      }
    };
  },
  success: (uniqueKey: string, keys: IRextKeys, params: IRextParams, items: any, message: string):
    IRextAction => {
    return {
      type: REXT_UPDATE.SUCCESS,
      meta: {
        uniqueKey, keys
      },
      payload: {
        params, items, message
      }
    };
  },
  failure: (uniqueKey: string, keys: IRextKeys, params: IRextParams, message: string): IRextAction => {
    return {
      type: REXT_UPDATE.FAILURE,
      meta: {
        uniqueKey, keys
      },
      payload: {
        params, message
      }
    };
  }
};
export const rextList = {
  request: (uniqueKey: string, keys: IRextKeys, params: IRextParams, resources?: any): IRextAction => {
    return {
      type: REXT_LIST.REQUEST,
      meta: {
        uniqueKey, keys
      },
      payload: {
        params,
        resources
      }
    };
  },
  success: (uniqueKey: string, keys: IRextKeys, params: IRextParams, items: any, message: string):
    IRextAction => {
    return {
      type: REXT_LIST.SUCCESS,
      meta: {
        uniqueKey, keys
      },
      payload: {
        params, items, message
      }
    };
  },
  failure: (uniqueKey: string, keys: IRextKeys, params: IRextParams, message: string): IRextAction => {
    return {
      type: REXT_LIST.FAILURE,
      meta: {
        uniqueKey, keys
      },
      payload: {
        params, message
      }
    };
  }
};
export const unmountRext = (uniqueKey: string, keys: IRextKeys): IRextAction => ({
  type: UNMOUNT_REXT,
  meta: {
    keys, uniqueKey
  },
  payload: {}
})
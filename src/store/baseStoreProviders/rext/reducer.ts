import { ActionIdentity } from './actions';
import { IRextAction, RextResourcesReducer, IRextInfo, IRextItem, IRextKeys, IRextParams } from "./keys";
export const defaultRextInfo: IRextInfo = {
  creationInProgress: false,
  fetching: false,
  fetchingList: false,
  hasError: false,
  message: undefined,
  params: undefined,
  updatingInProgress: false,
  isCancelled: false
}
export const defaultRextItem: IRextItem = {
  data: {},
  list: []
}
export const info = (info: IRextInfo = defaultRextInfo, action: IRextAction, actionIdentity: ActionIdentity) => {
  const { type, payload } = action;
  const { REXT_FETCH, REXT_CREATE, REXT_UPDATE, REXT_LIST, UNMOUNT_REXT } = actionIdentity;
  switch (type) {
    case REXT_FETCH.REQUEST:
    case REXT_CREATE.REQUEST:
    case REXT_UPDATE.REQUEST:
    case REXT_LIST.REQUEST:
      return {
        ...info,
        params: payload.params,
        fetchingList: type === REXT_LIST.REQUEST ? true : info.fetchingList,
        fetching: type === REXT_FETCH.REQUEST ? true : info.fetching,
        updatingInProgress: type === REXT_UPDATE.REQUEST ? true : info.updatingInProgress,
        creationInProgress: type === REXT_CREATE.REQUEST ? true : info.creationInProgress,
        hasError: false,
        message: undefined,
        isCancelled: false
      }
    case REXT_FETCH.SUCCESS:
    case REXT_CREATE.SUCCESS:
    case REXT_UPDATE.SUCCESS:
    case REXT_LIST.SUCCESS:
      return {
        ...info,
        params: payload.params,
        fetchingList: type === REXT_LIST.SUCCESS ? false : info.fetchingList,
        fetching: type === REXT_FETCH.SUCCESS ? false : info.fetching,
        updatingInProgress: type === REXT_UPDATE.SUCCESS ? false : info.updatingInProgress,
        creationInProgress: type === REXT_CREATE.SUCCESS ? false : info.creationInProgress,
        hasError: false,
        message: payload.message
      }
    case REXT_FETCH.FAILURE:
    case REXT_CREATE.FAILURE:
    case REXT_UPDATE.FAILURE:
    case REXT_LIST.FAILURE:
      return {
        ...info,
        params: payload.params,
        fetchingList: type === REXT_LIST.FAILURE ? false : info.fetchingList,
        fetching: type === REXT_FETCH.FAILURE ? false : info.fetching,
        updatingInProgress: type === REXT_UPDATE.FAILURE ? false : info.updatingInProgress,
        creationInProgress: type === REXT_CREATE.FAILURE ? false : info.creationInProgress,
        hasError: true,
        message: payload.message
      }
    case REXT_FETCH.CANCEL:
    case REXT_CREATE.CANCEL:
    case REXT_UPDATE.CANCEL:
    case REXT_LIST.CANCEL:
      return {
        ...info,
        params: payload.params,
        fetchingList: type === REXT_LIST.CANCEL ? false : info.fetchingList,
        fetching: type === REXT_FETCH.CANCEL ? false : info.fetching,
        updatingInProgress: type === REXT_UPDATE.CANCEL ? false : info.updatingInProgress,
        creationInProgress: type === REXT_CREATE.CANCEL ? false : info.creationInProgress,
        hasError: false,
        message: "Cancelled",
        isCancelled: true
      }
    case UNMOUNT_REXT: {
      return defaultRextInfo
    }
    default:
      return info
  }
}
export const items = (items: IRextItem = defaultRextItem, action: IRextAction, actionIdentity: ActionIdentity) => {
  const { type, payload, meta } = action;
  const { keys } = meta;
  const { REXT_FETCH, REXT_CREATE, REXT_UPDATE, REXT_LIST, UNMOUNT_REXT } = actionIdentity;
  switch (type) {
    case REXT_FETCH.SUCCESS:
    case REXT_CREATE.SUCCESS:
    case REXT_UPDATE.SUCCESS:
      return {
        ...items,
        [keys.identity]: {
          list: items.list,
          data: getData(items.data, payload.items, keys, payload.params, type, false)
        }
      }
    case REXT_LIST.SUCCESS:
      return {
        ...items,
        [keys.identity]: {
          data: items.data,
          list: getData(items.list, payload.items, keys, payload.params, type, true)
        }
      }
      case UNMOUNT_REXT: {
      return defaultRextItem
    }
    default:
      return items
  }
}
function getData(previousData: any, newData: any, keys: IRextKeys, params: IRextParams | undefined, type: string, isList: boolean) {
  if (keys.transformation) {
    if (keys.maintainOldValues) {
      return keys.transformation(newData, previousData, params)
    }
    return keys.transformation(newData);
  } else {
    if (keys.maintainOldValues) {
      if (isList) {
        return [...previousData, ...newData]
      } else {
        return { ...previousData, ...newData }
      }
    }
    return newData
  }
}
export const resources = (resources: RextResourcesReducer = {}, action: IRextAction, actionIdentity: ActionIdentity) => {
  const { type, payload, meta } = action
  const { keys } = meta;
  const { REXT_FETCH, REXT_CREATE, REXT_UPDATE, REXT_LIST, UNMOUNT_REXT } = actionIdentity;
  switch (type) {
    case REXT_FETCH.REQUEST:
    case REXT_CREATE.REQUEST:
    case REXT_UPDATE.REQUEST:
    case REXT_LIST.REQUEST:
      {
        return {
          ...resources,
          [keys.identity]: payload.resources
        }
      }
      case UNMOUNT_REXT: {
      return {}
    }
    default:
      return resources
  }
}
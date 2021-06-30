import { REXT_CREATE, REXT_FETCH, REXT_UPDATE, REXT_LIST, UNMOUNT_REXT } from './actions';
import { RextInfoReducer, IRextAction, RextItemsReducer, RextResourcesReducer, IRextInfo, IRextItem, IRextKeys, IRextParams } from "./keys";
export const defaultRextInfo: IRextInfo = {
  creationInProgress: false,
  fetching: false,
  fetchingList: false,
  hasError: false,
  message: undefined,
  params: undefined,
  updatingInProgress: false
}
export const defaultRextItem: IRextItem = {
  data: {},
  list: []
}
export const info = (info: RextInfoReducer = {}, action: IRextAction) => {
  const { type, payload, meta } = action;
  const { keys } = meta;
  const previousStateForIdentitiy = info[keys.identity] || defaultRextInfo;
  switch (type) {
    case REXT_FETCH.REQUEST:
    case REXT_CREATE.REQUEST:
    case REXT_UPDATE.REQUEST:
    case REXT_LIST.REQUEST:
      return {
        ...info,
        [keys.identity]: {
          params: payload.params,
          fetchingList: type === REXT_LIST.REQUEST ? true : previousStateForIdentitiy.fetchingList,
          fetching: type === REXT_FETCH.REQUEST ? true : previousStateForIdentitiy.fetching,
          updatingInProgress: type === REXT_UPDATE.REQUEST ? true : previousStateForIdentitiy.updatingInProgress,
          creationInProgress: type === REXT_CREATE.REQUEST ? true : previousStateForIdentitiy.creationInProgress,
          hasError: false,
          message: undefined
        }        
      }
    case REXT_FETCH.SUCCESS:
    case REXT_CREATE.SUCCESS:
    case REXT_UPDATE.SUCCESS:
    case REXT_LIST.SUCCESS:
      return {
        ...info,
        [keys.identity]: {
          params: payload.params,
          fetchingList: type === REXT_LIST.SUCCESS ? false : previousStateForIdentitiy.fetchingList,
          fetching: type === REXT_FETCH.SUCCESS ? false : previousStateForIdentitiy.fetching,
          updatingInProgress: type === REXT_UPDATE.SUCCESS ? false : previousStateForIdentitiy.updatingInProgress,
          creationInProgress: type === REXT_CREATE.SUCCESS ? false : previousStateForIdentitiy.creationInProgress,
          hasError: false,
          message: payload.message
        }
      }
    case REXT_FETCH.FAILURE:
    case REXT_CREATE.FAILURE:
    case REXT_UPDATE.FAILURE:
    case REXT_LIST.FAILURE:
      return {
        ...info,
        [keys.identity]: {
          params: payload.params,
          fetchingList: type === REXT_LIST.FAILURE ? false : previousStateForIdentitiy.fetchingList,
          fetching: type === REXT_FETCH.FAILURE ? false : previousStateForIdentitiy.fetching,
          updatingInProgress: type === REXT_UPDATE.FAILURE ? false : previousStateForIdentitiy.updatingInProgress,
          creationInProgress: type === REXT_CREATE.FAILURE ? false : previousStateForIdentitiy.creationInProgress,
          hasError: true,
          message: payload.message
        }
      }
    case UNMOUNT_REXT: {
      delete info[keys.identity]
      return info
    }
    default:
      return info
  }
}
export const items = (items: RextItemsReducer = {}, action: IRextAction) => {
  const { type, payload, meta } = action;
  const { keys } = meta;
  const previousStateForIdentitiy = items[keys.identity] || defaultRextItem;
  switch (type) {
    case REXT_FETCH.SUCCESS:
    case REXT_CREATE.SUCCESS:
    case REXT_UPDATE.SUCCESS:
      return {
        ...items,
        [keys.identity]: {
          list: previousStateForIdentitiy.list,
          data: getData(previousStateForIdentitiy.data, payload.items, keys, payload.params, type )
        }
      }
    case REXT_LIST.SUCCESS:
      return {
        ...items,
        [keys.identity]: {
          data: previousStateForIdentitiy.data,
          list: getData(previousStateForIdentitiy.list, payload.items, keys, payload.params, type )
        }
      }
    case UNMOUNT_REXT: {
      delete items[keys.identity]
      return items
    }
    default:
      return items
  }
}
function getData(previousData: any, newData: any, keys: IRextKeys, params: IRextParams | undefined, type: string) {
  if(keys.transformation) {
    if(keys.maintainOldValues) {
      return keys.transformation(newData, previousData, params)
    }
    return keys.transformation(newData);
  } else {
    if(keys.maintainOldValues) {
      if(type === REXT_LIST.SUCCESS) {
        return [...previousData, ...newData]
      } else {
        return {...previousData, ...newData}
      }
    }
    return newData
  }
}
export const resources = (resources: RextResourcesReducer = {}, action: IRextAction) => {
  const { type, payload, meta } = action
  const { keys } = meta;
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
      delete resources[keys.identity]
      return resources
    }
    default:
      return resources
  }
}
import { IRextReducer, IRextState, IRextInfo, IRextItem } from "./keys";
import { defaultRextInfo, defaultRextItem } from "./reducer";
export function getRextState(rext: IRextReducer, identity: string, defaultValue: any): IRextState {
  const info: IRextInfo = rext.info[identity] || defaultRextInfo;
  const item: IRextItem = rext.items[identity] || defaultRextItem;
  return {
    creationInProgress: info.creationInProgress,
    updatingInProgress: info.updatingInProgress,
    fetching: info.fetching,
    fetchingList: info.fetchingList,
    error: info.hasError || false,
    message: info.message,
    data: item.data || defaultValue,
    list: item.list || [],
    resources: rext.resources[identity]
  }
}
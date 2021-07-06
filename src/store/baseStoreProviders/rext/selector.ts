import { IRextReducer, IRextState, IRextInfo, IRextItem } from "./keys";
import { defaultRextInfo, defaultRextItem } from "./reducer";
export function getRextState(rext: IRextReducer, defaultValue: any): IRextState {
  const info: IRextInfo = rext.info || defaultRextInfo;
  const item: IRextItem = rext.items || defaultRextItem;
  return {
    creationInProgress: info.creationInProgress,
    updatingInProgress: info.updatingInProgress,
    fetching: info.fetching,
    fetchingList: info.fetchingList,
    error: info.hasError || false,
    message: info.message,
    data: item.data || defaultValue,
    list: item.list || [],
    resources: rext.resources,
    isCancelled: rext.info.isCancelled
  }
}
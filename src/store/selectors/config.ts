import { ApplicationState } from "store/reducers";

export function getBaseUrl(state: ApplicationState): string {
    return state.configState.baseUrl;
}
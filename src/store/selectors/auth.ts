import { ApplicationState } from "store/reducers";

export function getToken(state: ApplicationState): string {
    return state.authState.token;
}
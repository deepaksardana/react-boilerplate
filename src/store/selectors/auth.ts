import { ApplicationState, AuthState } from "store/reducers";

export function getToken(state: ApplicationState): string {
    return state.authState.token;
}

export function getAuthState(state: ApplicationState): AuthState {
    return state.authState;
}
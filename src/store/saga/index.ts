import { SagaIterator } from "redux-saga";
import { fork, all, cancel } from "redux-saga/effects";

import { loginEvent, forgotEvent, registerEvent } from "./auth";
import { watchRextEvent } from "../baseStoreProviders";


export default function* root(): SagaIterator {
    yield all([
        loginEvent,
        forgotEvent,
        registerEvent
    ])
};
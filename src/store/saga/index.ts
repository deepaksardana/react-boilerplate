import { SagaIterator } from "redux-saga";
import { all } from "redux-saga/effects";

import { loginEvent, forgotEvent, registerEvent } from "./auth";
import { rextEventRoot } from "../baseStoreProviders";


export default function* root(): SagaIterator {
    yield all([
        loginEvent,
        forgotEvent,
        registerEvent,
        rextEventRoot
    ])
};
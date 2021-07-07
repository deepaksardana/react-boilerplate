import { SagaIterator } from "redux-saga";
import { all, fork } from "redux-saga/effects";

import { loginEvent, forgotEvent, registerEvent } from "./auth";
import { textRext, textRext1 } from "rext";
export default function* root(): SagaIterator {
    yield all([
        loginEvent,
        forgotEvent,
        registerEvent,
        fork(textRext.saga),
        fork(textRext1.saga)
    ])
};
import { SagaIterator } from "redux-saga";
import { all, fork } from "redux-saga/effects";

import { watchAuthEvent } from "./auth";
import { textRext, textRext1 } from "rext";
export default function* root(): SagaIterator {
    yield all([
        fork(watchAuthEvent),
        fork(textRext.saga),
        fork(textRext1.saga)
    ])
};
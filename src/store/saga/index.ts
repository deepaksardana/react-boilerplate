import { SagaIterator } from "redux-saga";
import { all, fork } from "redux-saga/effects";
import { forgotPassword, updateForgotPassword } from "rext";

import { watchAuthEvent } from "./auth";
export default function* root(): SagaIterator {
    yield all([
        fork(watchAuthEvent),
        fork(forgotPassword.saga),
        fork(updateForgotPassword.saga)
    ])
};
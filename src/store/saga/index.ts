import { SagaIterator } from "redux-saga";
import { fork, all } from "redux-saga/effects";

export default function* root(): SagaIterator {
    yield all([])
};
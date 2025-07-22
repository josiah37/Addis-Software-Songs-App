import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import songsReducer from "../features/songs/songsSlice";
import rootSaga from "../features/songs/songsSaga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: {
        songs: songsReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;


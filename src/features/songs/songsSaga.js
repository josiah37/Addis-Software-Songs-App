import { call, put, takeLatest, all } from "redux-saga/effects";
import { fetchSongsRequest, fetchSongsSuccess, fetchSongsFailure } from "./songsSlice";

// i will Replace with my actual API URL or mock URL if i dont get much time
const API_URL = "https://jsonplaceholder.typicode.com/posts";

// Fetch songs worker saga
function* fetchSongs() {
   try {
      const response = yield call(fetch, API_URL);
      const data = yield response.json();
      yield put(fetchSongsSuccess(data));
   } catch (error) {
      yield put(fetchSongsFailure(error.message));
   }
}

// Watcher saga
function* watchFetchSongs() {
   yield takeLatest(fetchSongsRequest.type, fetchSongs);
}

// Root saga
export default function* rootSaga() {
   yield all([
      watchFetchSongs(),
      //todo: Add other watchers here later for create, update, delete
   ]);
}

import { call, put, takeLatest, all } from "redux-saga/effects";
import {
   // featch
   fetchSongsRequest,
   fetchSongsSuccess,
   fetchSongsFailure,
   // create
   createSongRequest,
   createSongSuccess,
   createSongFailure,
   //   delete
   deleteSongRequest,
   deleteSongFailure,
   deleteSongSuccess,
   //    update
   updateSongRequest,
   updateSongSuccess,
   updateSongFailure,
} from "./songsSlice";

// i will Replace with my actual API URL or mock URL if i dont get much time
const API_URL = "https://jsonplaceholder.typicode.com/posts";
// const API_URL = "https://my-json-server.typicode.com/ridoansaleh/my-music-api/songs";
// const API_URL = "https://api.openopus.org/work/dump.json";

// Fetch songs worker saga
function* fetchSongs(action) {
   try {
      const pageSize = 10;
      const page = action.payload?.page || 1;
      const response = yield call(fetch, `${API_URL}?_page=${page}&_limit=${pageSize}`);
      const data = yield response.json();
      const totalCount = parseInt(response.headers.get("x-total-count"), 10) || 100; // fallback for placeholder
      yield put(fetchSongsSuccess({ data, totalCount }));
   } catch (error) {
      yield put(fetchSongsFailure(error.message));
   }
}

// Create Song Worker
function* createSong(action) {
   try {
      const response = yield call(fetch, API_URL, {
         method: "POST",
         body: JSON.stringify(action.payload),
         headers: { "Content-Type": "application/json" },
      });
      const data = yield response.json();
      yield put(createSongSuccess(data));
   } catch (error) {
      yield put(createSongFailure(error.message));
   }
}

// delete-Song Worker
function* deleteSong(action) {
   try {
      const id = action.payload;
      yield call(fetch, `${API_URL}/${id}`, { method: "DELETE" });
      yield put(deleteSongSuccess(id));
   } catch (err) {
      yield put(deleteSongFailure(err.message));
   }
}

// Worker for update
function* updateSong(action) {
   try {
      const { id, ...rest } = action.payload;
      //   const response = yield call(fetch, `${API_URL}/${id}`, {
      yield call(fetch, `${API_URL}/${id}`, {
         method: "PUT",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify(rest),
      });
      //   const data = yield response.json();
      //   yield put(updateSongSuccess(data));
      yield put(updateSongSuccess(action.payload));
   } catch (err) {
      yield put(updateSongFailure(err.message));
   }
}

// Watcher saga
function* watchFetchSongs() {
   yield takeLatest(fetchSongsRequest.type, fetchSongs);
}

function* watchCreateSong() {
   yield takeLatest(createSongRequest.type, createSong);
}

function* watchDeleteSong() {
   yield takeLatest(deleteSongRequest.type, deleteSong);
}

function* watchUpdateSong() {
   yield takeLatest(updateSongRequest.type, updateSong);
}

// Root saga
export default function* rootSaga() {
   yield all([watchFetchSongs(), watchCreateSong(), watchDeleteSong(), watchUpdateSong()]);
}

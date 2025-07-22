import { createSlice } from "@reduxjs/toolkit";

const songsSlice = createSlice({
    name: "songs",
    initialState: {
        list: [],
        loading: false,
        error: null,
    },
    reducers: {
        fetchSongsRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchSongsSuccess: (state, action) => {
            state.list = action.payload;
            state.loading = false;
        },
        fetchSongsFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    fetchSongsRequest,
    fetchSongsSuccess,
    fetchSongsFailure,
} = songsSlice.actions;

export default songsSlice.reducer;

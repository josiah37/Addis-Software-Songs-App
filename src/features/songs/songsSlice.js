import { createSlice } from "@reduxjs/toolkit";

const songsSlice = createSlice({
   name: "songs",
   initialState: {
      list: [],
      loading: false,
      error: null,
      // start on page 1 with 10 page sizee and teh totalPages will be recalculated
      currentPage: 1,
      totalPages: 1,
      pageSize: 10,
   },

   reducers: {
    

      fetchSongsRequest: (state, action) => {
         state.loading = true;
         state.error = null;
         if (action.payload?.page) {
            state.currentPage = action.payload.page;
         }
      },

    
      fetchSongsSuccess: (state, action) => {
         const { data, totalCount } = action.payload;
         state.list = data; 
         state.loading = false;
         state.totalPages = Math.ceil(totalCount / state.pageSize);
      },
      fetchSongsFailure: (state, action) => {
         state.loading = false;
         state.error = action.payload;
      },

      // for creating songs
      createSongRequest: (state, action) => {
         state.loading = true;
         state.error = null;
      },
      createSongSuccess: (state, action) => {
         state.list = [action.payload, ...state.list];
         state.loading = false;
      },
      createSongFailure: (state, action) => {
         state.loading = false;
         state.error = action.payload;
      },

      // reducers for deelting songs

      deleteSongRequest: (state, action) => {
         state.loading = true;
         state.error = null;
      },
      deleteSongSuccess: (state, action) => {
         // action.payload is the id of the deleted song
         state.list = state.list.filter((song) => song.id !== action.payload);
         state.loading = false;
      },
      deleteSongFailure: (state, action) => {
         state.loading = false;
         state.error = action.payload;
      },

      // UPDATE SONG
      updateSongRequest: (state, action) => {
         state.loading = true;
         state.error = null;
      },
      updateSongSuccess: (state, action) => {
         // zis will update z entire song object
         const updated = action.payload;
         state.list = state.list.map((song) => (song.id === updated.id ? updated : song));
         state.loading = false;
      },
      updateSongFailure: (state, action) => {
         state.loading = false;
         state.error = action.payload;
      },
   },
});



export const {
   // for fetching
   fetchSongsRequest,
   fetchSongsSuccess,
   fetchSongsFailure,
   // to create songs
   createSongRequest,
   createSongSuccess,
   createSongFailure,
   // for deleteing
   deleteSongRequest,
   deleteSongSuccess,
   deleteSongFailure,
   //    dor update
   updateSongRequest,
   updateSongSuccess,
   updateSongFailure,
} = songsSlice.actions;

export default songsSlice.reducer;

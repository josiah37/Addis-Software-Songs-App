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
      //   fetchSongsRequest: (state) => {
      //      state.loading = true;
      //      state.error = null;
      //   },

      fetchSongsRequest: (state, action) => {
         state.loading = true;
         state.error = null;
         if (action.payload?.page) {
            state.currentPage = action.payload.page;
         }
      },

      //   fetchSongsSuccess: (state, action) => {
      //      state.list = action.payload;
      //      state.loading = false;
      //   },
      fetchSongsSuccess: (state, action) => {
         const { data, totalCount } = action.payload;
         state.list = data; // ← data must be the array
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
   },
});

//     },
// });

export const {
   fetchSongsRequest,
   fetchSongsSuccess,
   fetchSongsFailure,
   // create songs
   createSongRequest,
   createSongSuccess,
   createSongFailure,
} = songsSlice.actions;

export default songsSlice.reducer;

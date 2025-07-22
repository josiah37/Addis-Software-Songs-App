import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSongsRequest } from "../features/songs/songsSlice";

const SongsList = () => {
   const dispatch = useDispatch();
   const { list, loading, error, currentPage, totalPages } = useSelector((state) => state.songs);

   useEffect(() => {
      dispatch(fetchSongsRequest({ page: currentPage }));
   }, [dispatch, currentPage]);

   const goPrev = () => {
      if (currentPage > 1) {
         dispatch(fetchSongsRequest({ page: currentPage - 1 }));
      }
   };

   const goNext = () => {
      if (currentPage < totalPages) {
         dispatch(fetchSongsRequest({ page: currentPage + 1 }));
      }
   };

   return (
      <div style={{ padding: "20px" }}>
         <h1>Addis Software Songs App</h1>

         {loading && <p>Loading… please wait</p>}
         {error && <p style={{ color: "red" }}>Error: {error}</p>}
         {!loading && list.length === 0 && <p>No songs found.</p>}

         <div
            style={{
               display: "grid",
               gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
               gap: "12px",
               marginTop: "20px",
            }}
         >
            {list.map((song) => (
               <div
                  key={song.id}
                  style={{
                     border: "1px solid #ccc",
                     padding: "10px",
                     borderRadius: "6px",
                     background: "#f9f9f9",
                  }}
               >
                  <h3>{song.title}</h3>
                  <p>ID: {song.id}</p>
                  <p>{song.body?.slice(0, 60)}...</p>
               </div>
            ))}
         </div>

         <div style={{ marginTop: "20px" }}>
            <button onClick={goPrev} disabled={currentPage === 1}>
               ← Prev
            </button>
            <span style={{ margin: "0 10px" }}>
               Page {currentPage} of {totalPages}
            </span>
            <button onClick={goNext} disabled={currentPage === totalPages}>
               Next →
            </button>
         </div>
      </div>
   );
};

export default SongsList;

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
   fetchSongsRequest,
   createSongRequest,
   deleteSongRequest,
   updateSongRequest,
} from "../features/songs/songsSlice";

const SongsList = () => {
   const dispatch = useDispatch();
   const { list, loading, error, currentPage, totalPages } = useSelector((state) => state.songs);
   // for update
   const [editingId, setEditingId] = useState(null);
   const [editData, setEditData] = useState({ title: "", body: "", gener: "" });

   useEffect(() => {
      dispatch(fetchSongsRequest({ page: currentPage }));
   }, [dispatch, currentPage]);

   //  structuring a song to be created
   const [newSong, setNewSong] = useState({
      title: "",
      body: "",
      //   singer: "",
      gener: "",
      userId: 1, // required by jsonplaceholder
   });

   //to handle  created songs
   const handleSubmit = (e) => {
      e.preventDefault();
      if (newSong.title.trim() === "" || newSong.body.trim() === "") return;
      dispatch(createSongRequest(newSong));
      setNewSong({ title: "", body: "", singer: "", gener: "", userId: 1 });
   };

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

         {/* Add Song Form */}
         <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
            <input
               type="text"
               placeholder="Song Title"
               value={newSong.title}
               onChange={(e) => setNewSong({ ...newSong, title: e.target.value })}
               style={{ marginRight: "10px" }}
            />
            <input
               type="text"
               placeholder="Singer"
               value={newSong.body}
               onChange={(e) => setNewSong({ ...newSong, body: e.target.value })}
               style={{ marginRight: "10px" }}
            />
            <input
               type="text"
               placeholder="Song gener"
               value={newSong.gener}
               onChange={(e) => setNewSong({ ...newSong, gener: e.target.value })}
               style={{ marginRight: "10px" }}
            />
            <button type="submit">Add Song</button>
         </form>

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
            {/* {console.log(list)}
            {console.log("the lisste", list.composers)} */}
            {console.log("state.songs.list:", list)}
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
                  {editingId === song.id ? (
                     <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2px" }}>
                        <label htmlFor="title">title</label>

                        <input
                           type="text"
                           value={editData.title}
                           onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                           style={{ display: "block", marginBottom: "8px", width: "90%" }}
                        />

                        <label htmlFor="title">singer</label>
                        <input
                           type="text"
                           value={editData.body}
                           onChange={(e) => setEditData({ ...editData, body: e.target.value })}
                           style={{ display: "block", marginBottom: "8px", width: "90%" }}
                        />

                        <label htmlFor="gener">gener</label>
                        <input
                           type="text"
                           value={editData.gener}
                           onChange={(e) => setEditData({ ...editData, gener: e.target.value })}
                           style={{ display: "block", marginBottom: "8px", width: "90%" }}
                        />
                        <button
                           onClick={() => {
                              dispatch(updateSongRequest({ id: song.id, ...editData }));
                              setEditingId(null);
                           }}
                           style={{ margin: "8px" }}
                        >
                           Save
                        </button>
                        <button onClick={() => setEditingId(null)}>Cancel</button>
                     </div>
                  ) : (
                     <>
                        <h3>{song.title}</h3>
                        <p> song ID: {song?.id}</p>
                        <p> singer: {song?.body?.slice(0, 10)}</p>
                        <p>genre: {song?.gener ? song.gener : song?.body?.slice(0, 10)}</p>
                        {/* <p>
                     <b> disciption </b> <br />
                     {song?.body?.slice(0, 60)}...
                  </p> */}
                        <button
                           onClick={() => {
                              setEditingId(song.id);
                              setEditData({ title: song.title, body: song.body });
                           }}
                           style={{ marginTop: "10px", float: "left" }}
                        >
                           Edit
                        </button>
                        <button
                           onClick={() => dispatch(deleteSongRequest(song.id))}
                           style={{ marginTop: "10px", float: "right" }}
                        >
                           Delete
                        </button>
                     </>
                  )}
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

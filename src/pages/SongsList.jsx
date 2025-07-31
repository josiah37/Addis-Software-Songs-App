import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { css } from "@emotion/react";
// /** @jsxImportSource @emotion/react */

import {
   fetchSongsRequest,
   createSongRequest,
   deleteSongRequest,
   updateSongRequest,
} from "../features/songs/songsSlice";

import { Grid, Card, Button, Input } from "../components/ui";
import { padding } from "styled-system";
// import song_cd from "../../public/song_cd.jpg";
import song_cd from "../assets/song_cd.jpg";

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
      userId: 1,
   });
   // control create‑modal visibility & form data
   const [showCreate, setShowCreate] = useState(false);

   //to handle  created songs
   const handleCreate = () => {
      if (!newSong.title.trim() || !newSong.body.trim()) return;
      dispatch(createSongRequest(newSong));
      setShowCreate(false);
      setNewSong({ title: "", body: "", gener: "", userId: 1 });
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
      <div style={{ padding: "32px" }}>
         <h1 style={{ textAlign: "center", paddingBottom: "2%" }}>Addis Software Songs App</h1>

         {/* Add Song Form */}
         {/* <form onSubmit={handleSubmit} style={{ marginBottom: 24, display: "flex", gap: 16 }}>
            <input
               type="text"
               placeholder="Song Title"
               value={newSong.title}
               onChange={(e) => setNewSong({ ...newSong, title: e.target.value })}
               flex="1"
               borderColor="cardBorder"
               borderRadius="sm"
            />
            <input
               type="text"
               placeholder="Singer"
               value={newSong.body}
               onChange={(e) => setNewSong({ ...newSong, body: e.target.value })}
               flex="1"
               borderColor="cardBorder"
               borderRadius="sm"
            />
            <input
               type="text"
               placeholder="Song gener"
               value={newSong.gener}
               onChange={(e) => setNewSong({ ...newSong, gener: e.target.value })}
               flex="1"
               borderColor="cardBorder"
               borderRadius="sm"
            />
            <button type="submit" bg="primary" color="white" px={3} borderRadius="md">
               Add Song
            </button>
         </form> */}
         <Button
            onClick={() => setShowCreate(true)}
            bg="primary"
            color="white"
            borderRadius="md"
            mb={4}
            style={{ padding: "1% 3%" }}
         >
            Create Song
         </Button>
         {showCreate && (
            <div
               css={css({
                  position: "fixed",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  background: "rgba(0,0,0,0.5)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 1000,
               })}
            >
               <Card p={4} width={400} bg="background" borderColor="cardBorder" borderRadius="md">
                  <h2>Create New Song</h2>
                  <Input
                     placeholder="Title"
                     mb={2}
                     value={newSong.title}
                     onChange={(e) => setNewSong({ ...newSong, title: e.target.value })}
                  />
                  <Input
                     placeholder="Singer"
                     mb={2}
                     value={newSong.body}
                     onChange={(e) => setNewSong({ ...newSong, body: e.target.value })}
                  />
                  <Input
                     placeholder="Genre"
                     mb={3}
                     value={newSong.gener}
                     onChange={(e) => setNewSong({ ...newSong, gener: e.target.value })}
                  />
                  <div css={css({ display: "flex", justifyContent: "flex-end", gap: 8 })}>
                     <Button onClick={() => setShowCreate(false)} mr={2}>
                        Cancel
                     </Button>
                     <Button bg="primary" color="white" onClick={handleCreate}>
                        Save
                     </Button>
                  </div>
               </Card>
            </div>
         )}

         {loading && <p>Loading… please wait</p>}
         {/* {error && <p style={{ color: "red" }}>Error: {error}</p>} */}
         {error && <p style={{ color: theme.colors.danger }}>Error: {error}</p>}
         {!loading && list.length === 0 && <p>No songs found.</p>}

         <Grid mt={4}>
            {list.map((song) => (
               <Card
                  key={song.id}
                  p={3}
                  borderColor="cardBorder"
                  borderRadius="md"
                  css={css({
                     backgroundColor: "#f9f9f9", // Set color separately
                     //  backgroundImage: `url(${song_cd})`, // Use the imported URL
                     backgroundRepeat: "no-repeat",
                     backgroundPosition: "right bottom",
                     backgroundSize: "cover",
                     minHeight: "200px",

                     position: "relative", // Context for pseudo-element
                     "&::before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundImage: `url(${song_cd})`,
                        backgroundSize: "cover",
                        opacity: "85%", // Adjust opacity here
                     },
                     "& > *": {
                        position: "relative", // Ensure content is above the image
                        color: "white",
                        textShadow: "1px 1px 1px rgba(43, 3, 47, 0.8)",
                        // #98688eff
                     },
                  })}
               >
                  {console.log("song_cd URL:", song_cd)}
                  {/* for editing */}
                  {editingId === song.id ? (
                     <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                        <label htmlFor="title">title</label>

                        <input
                           type="text"
                           value={editData.title}
                           onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                           style={{ display: "block", marginBottom: "8px", width: "90%", padding: "2% 1%" }}
                        />

                        <label htmlFor="title">singer</label>
                        <input
                           type="text"
                           value={editData.body}
                           onChange={(e) => setEditData({ ...editData, body: e.target.value })}
                           style={{ display: "block", marginBottom: "5px", width: "90%", padding: "2% 1%" }}
                        />

                        <label htmlFor="gener">gener</label>
                        <input
                           type="text"
                           value={editData.gener}
                           onChange={(e) => setEditData({ ...editData, gener: e.target.value })}
                           style={{ display: "block", marginBottom: "5px", width: "90%", padding: "2% 1%" }}
                        />
                        <button
                           onClick={() => {
                              dispatch(updateSongRequest({ id: song.id, ...editData }));
                              setEditingId(null);
                           }}
                           style={{ margin: "8px" }}
                        >
                           Saveee
                        </button>
                        <button onClick={() => setEditingId(null)}>Cancel</button>
                     </div>
                  ) : (
                     <>
                        <h3 color="white" style={{ color: "rgba(245, 156, 53, 0.84)", textAlign: "center" }}>
                           {song.title?.slice(0, 20)}
                        </h3>
                        <p style={{ color: "#fff", fontWeight: "bolder" }}>Song Id: {song.id}</p>
                        <p style={{ color: "#fff", fontWeight: "bolder" }}>Singer: {song.body.slice(0, 10)}</p>
                        <p style={{ color: "#fff", fontWeight: "bolder" }}>
                           Gener: {song?.gener ? song.gener : song.body?.slice(0, 5)}
                        </p>
                        <Button
                           onClick={() => {
                              setEditingId(song.id);
                              setEditData({ title: song.title, body: song.body, gener: song.gener });
                           }}
                           bg="primary"
                           color="white"
                           mr={3}
                           borderRadius="sm"
                           style={{ padding: "3% 5%" }}
                        >
                           Edit
                        </Button>
                        <Button
                           onClick={() => dispatch(deleteSongRequest(song.id))}
                           bg="red"
                           color="white"
                           borderRadius="sm"
                           style={{ padding: "3% 5%" }}
                        >
                           Delete
                        </Button>
                     </>
                  )}
               </Card>
            ))}
         </Grid>

         {/* Pagination */}
         <div style={{ marginTop: 32 }}>
            <button onClick={goPrev} disabled={currentPage === 1} mr={2}>
               ← Prev
            </button>
            <span>
               Page {currentPage} of {totalPages}
            </span>
            <button onClick={goNext} disabled={currentPage === totalPages} ml={2}>
               Next →
            </button>
         </div>
      </div>
   );
};

export default SongsList;

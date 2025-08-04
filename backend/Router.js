import express from "express";
// import songController from "./Controllers/song.controller.js";
import { createSong, getAllSongs } from "./Controllers/song.controller.js";
// Call the router method from express to create the router

const router = express.Router();

// create song
router.post("/create_song", createSong);

// list song
router.get("/", getAllSongs);

export default router;

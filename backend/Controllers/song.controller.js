import SongModel from "../models/songs.models.js";

// app.get("/", async (req, res) => {

// getAllSongs
const getAllSongs = async (req, res, next) => {
   try {
      const songList = await SongModel.find();
      res.json(songList);
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch songs" });
   }
};

// createSong
const createSong = async (req, res) => {
   try {
      console.log({ "body received": req.body });
      const newsong = await SongModel.create(req.body);
      res.json({ status: "success!", data: req.body });
   } catch (error) {
      res.status(500).json({ error: "Failed to create song" });
   }
};

export { createSong, getAllSongs };

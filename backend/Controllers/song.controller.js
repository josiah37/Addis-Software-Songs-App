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

// update
const updateSongByID = async (req, res) => {
   console.log(req);
   const { id } = req.params;
   const dataToUpdate = req.body;
   // Without { new: true }, findByIdAndUpdate returns the original document before the update was applied.
   try {
      const updatedDoc = await SongModel.findByIdAndUpdate(id, { $set: dataToUpdate }, { new: true });
      res.status(200).json([{ status: "success" }, { data: updatedDoc }]);
   } catch (error) {
      res.status(500).json({ status: "fail", data: "there is an error in updating the song" });
   }
};

// delete by id
const deleteSongById = async (req, res) => {
   const { id } = req.params;

   try {
      const deleteSong = await SongModel.findByIdAndDelete(id);
      res.status(201).json([{ status: "success", data: "song deleted sucessfully" }]);
   } catch (error) {
      console.log("error:\n\t", error);
      console.log(error);
      res.status(500).json({ status: "fail", data: "there is an error in deleting the song" });
   }
};

export { createSong, getAllSongs, updateSongByID, deleteSongById };

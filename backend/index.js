import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import bodyParser from "body-parser";
import { Sequelize, Model, DataTypes } from "sequelize";

// setting the dotenv(setting env vars)
dotenv.config();

const app = express();

// getting the port
const port = process.env.PORT;

// * middle wares
// Enable CORS for all origins
app.use(cors({ origin: true }));
// Parse JSON request bodies
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Create Sequelize instance
const sequelize = new Sequelize({
   dialect: "sqlite",
   storage: "./database.sqlite",
   logging: console.log, // <-- see SQL in console
});

// Define User model
class Song extends Model {}
Song.init(
   {
      title: DataTypes.STRING,
      genre: DataTypes.STRING,
      body: DataTypes.STRING,
      year: DataTypes.DATE,
      // Set default value for userId
      userId: { type: DataTypes.INTEGER, defaultValue: 1010 },
   },
   {
      sequelize,
      modelName: "addis_songs", // ← simpler name
      tableName: "songs", // ← explicit table name
   }
);

// Sync models with database
sequelize
   .sync()
   .then(() => console.log("✅ Database synced"))
   .catch((err) => console.error("❌ DB sync error:", err));

// Middleware for parsing request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CRUD
// app.get("/", (req, res) => {
//    res.status(200).json({ message: "succsess!" });
// });

// app.get("/create", (req, res) => {
//    res.status(200).json({ message: "sucessfully created" });
// });

app.get("/", async (req, res) => {
   try {
      const songList = await Song.findAll();
      res.json(songList);
   } catch (error) {
      console.error(err);
      res.status(500).json({ error: "Failed to fetch songs" });
   }
});

app.post("/create_song", async (req, res) => {
   try {
      //   const newSong = await req.body;
      const newSong = await Song.create(req.body);
      console.log({ "body received": req.body });
      res.json({ status: "sucess", data: newSong });
   } catch (error) {
      console.log("could not create the song", err);
      res.status(500).json({ error: "Failed to create song" });
   }
});

// listener
app.listen(port, () => {
   console.log(`running on port ${port}. http://localhost:${port}/`);
});

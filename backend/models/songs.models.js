import mongoose from "mongoose";

const songSchema = mongoose.Schema(
   {
      title: {
         type: String,
         required: true,
         unique: [true, "song title already exists"],
      },
      singer: {
         type: String,
         //   if u want to give a comment if not provided
         required: [true, "please mention the singer"],
      },

      genre: {
         type: String,
      },
      userId: {
         type: Number,
         required: true,
         default: 105,
      },
   },
   { timestamps: true }
);

// 'Song' is the name of the model, and Mongoose will look for a collection called 'songs'
// Song is the variable you use to interact with that collection.

const SongModel = mongoose.model("Song", songSchema);

export default SongModel;

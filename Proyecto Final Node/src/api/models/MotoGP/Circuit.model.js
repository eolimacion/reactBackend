const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CircuitSchema = new Schema(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    length: { type: Number, required: true },
    capacity: { type: Number, required: true },
    topSpeed: { type: Number, required: true },
    image: { type: String, required: false },

    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    selected: [{ type: mongoose.Schema.Types.ObjectId, ref: "Podium" }],
    fastestLap: [{ type: mongoose.Schema.Types.ObjectId, ref: "Rider" }, { type: Number, required: true }, { type: Number, required: true }],
    mostSuccessful: [{ type: mongoose.Schema.Types.ObjectId, ref: "Rider" }],
  },
  {
    timestamps: true,
  }
);
const Circuit = mongoose.model("Circuit", CircuitSchema);
module.exports = Circuit
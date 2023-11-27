const mongoose = require("mongoose");
const Rider = mongoose.Schema;
const RiderSchema = new Schema(
  {
    name: { type: String, unique: true, required: true },
    
    number: { type: Number, required: true },
    nationality: { type: String, required: true },
    age: { type: Number, required: true },
    rating: { type: Number, required: true },
    ranking: { type: Number, required: true },
    points:{ type: Number, required: true },
    image: { type: String, required: false },
    victoriesSeason:{ type: Number, required: false },
    victoriesCarrer:{ type: Number, required: false },
    championshipsCarrer:{ type: Number, required: false },
    team:{ type: String, required: false },
    polesSeason:{ type: Number, required: true },
    circuits: [{ type: mongoose.Schema.Types.ObjectId, ref: "Circuit" }],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    selected: [{ type: mongoose.Schema.Types.ObjectId, ref: "Podium" }],
  },
  {
    timestamps: true,
  },
);
const Player = mongoose.model("Rider", RiderSchema);
module.exports = Rider;



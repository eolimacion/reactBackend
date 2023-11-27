const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PodiumSchema = new Schema(
    {
        name: { type: String, unique: true, required: true },
        owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true },
        firstPlace: { type: mongoose.Schema.Types.ObjectId, ref: "Rider"},
        secondPlace: { type: mongoose.Schema.Types.ObjectId, ref: "Rider"},
        thirdPlace: { type: mongoose.Schema.Types.ObjectId, ref: "Rider"},
        circuit: { type: mongoose.Schema.Types.ObjectId, ref: "Circuit"},
        likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    },
    {
    timestamps: true,
    },
);

const Podium = mongoose.model("Podium", PodiumSchema);
module.exports = Podium;
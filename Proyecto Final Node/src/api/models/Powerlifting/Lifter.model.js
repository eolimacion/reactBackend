const mongoose = require('mongoose');
const { genderEnum } = require('../../../data/genderEnum');

const LifterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    gender: {
      type: Number,
      enum: genderEnum,
      unique: false,
      trim: true,
    },
    age: { type: Number, required: false },
    birthYear: { type: Number, required: true },
    benchPress: { type: Number, required: true },
    squat: { type: Number, required: true },
    deadlift: { type: Number, required: true },
    weightCategory: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'weightCategory' },
    ],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    image: { type: String },
    artist: { type: String, required: true, trim: true, lowercase: true },
  },
  {
    timestamps: true,
  }
);

const Lifter = mongoose.model('Lifter', LifterSchema);

module.exports = Lifter;

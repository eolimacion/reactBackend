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
    age: { type: Number, required: false },
    gender: {
      type: Number,
      enum: genderEnum,
      unique: false,
      trim: true,
    },
    birthYear: { type: Number, required: true },
    benchPress: { type: Number, required: true },
    squat: { type: Number, required: true },
    deadlift: { type: Number, required: true },
    GLPoints: { type: Number, required: false },
    weightCategory: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'weightCategory' },
    ],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  },
  {
    timestamps: true,
  }
);

const Lifter = mongoose.model('Lifter', LifterSchema);

module.exports = Lifter;
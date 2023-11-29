const mongoose = require('mongoose');
const genderEnum = require('../../../data/genderEnum');

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
      type: String,
      enum: genderEnum,
      unique: false,
      trim: true,
    },
    birthYear: { type: String, required: true },
    benchPress: { type: Number, required: true },
    squat: { type: Number, required: true },
    deadlift: { type: Number, required: true },
    total: { type: Number },
    GLPoints: { type: Number, required: false },
    weightCategory: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'WeightCategory' },
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

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CommentSchema = new Schema(
  {
    rating: [{ type: Number, required: true }],
    creator: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    location: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Eleven' }],
    locationMoto: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Podium' }],
    locationLifter: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lifter' }],

    comment: { type: String, unique: false, required: true },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  },
  {
    timestamps: true,
  }
);
const Comment = mongoose.model('Comment', CommentSchema);
module.exports = Comment;

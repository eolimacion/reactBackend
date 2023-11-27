const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WeightCategorySchema = new Schema(
{
    weight: {
        type: String,
        enum: [ 53, 59, 66, 74, 88, 93, 105, 120, "+120", 43, 47, 52, 57, 63, 69, 76, 84, "+84" ],

    },
    gender: {
        type: String,
        required: true,
        enum: ['hombre', 'mujer'],
      },
    age: { 
        type: String,
        enum: ["Subjunior", "Junior", "Open", "Master 1", "Master 2", "Master 3", "Master 4"],

    },
    lifters: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Lifter',
        },
      ],
    likes: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
      ],

}

 )


 const WeightCategory = mongoose.model('WeightCategory', WeightCategorySchema);

module.exports = WeightCategory;
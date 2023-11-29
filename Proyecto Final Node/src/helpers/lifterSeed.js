const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Lifter = require('../api/models/Powerlifting/Lifter.model');
const { powerlifters } = require('../data/lifterdata')

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
console.log(MONGO_URI);

const seedLifters = () => {
  mongoose
    .connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(async () => {
      const allLifters = await Lifter.find();
      if (allLifters.length > 0) {
        await Lifter.collection.drop();   //borra a todos los lifters
        console.log('Database has been emptied');
      }
    })
    .catch((error) => console.log('Seeding error.', error.message))
    .then(async () => {
      const allLiftersModel = powerlifters.map((lifter) => new Lifter(lifter));
      await Lifter.insertMany(allLiftersModel);
      console.log('Seeding successful.');
    })
    .catch((error) => {
      console.log('Seeding unable to finalize', error.message);
    })
    .finally(() => {
      mongoose.disconnect();
    });
};

module.exports = seedLifters;
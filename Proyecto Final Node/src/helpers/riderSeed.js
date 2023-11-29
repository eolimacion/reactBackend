
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Rider = require('../api/models/MotoGP/Rider.model');
const riderData = require('./../data/riderdata')

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
console.log(MONGO_URI);

const seedRider = () => {
  mongoose
    .connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(async () => {
      const allRider = await Rider.find();
      if (allRider.length > 0) {
        await Rider.collection.drop();   //borra a todos los lifters
        console.log('Database has been emptied');
      }
    })
    .catch((error) => console.log('Seeding error.', error.message))
    .then(async () => {
      const allRiderModel = riderData.map((rider) => new Rider(rider));
      await Rider.insertMany(allRiderModel);
      console.log('Seeding successful.');
    })
    .catch((error) => {
      console.log('Seeding unable to finalize', error.message);
    })
    .finally(() => {
      mongoose.disconnect();
    });
};

module.exports = seedRider;
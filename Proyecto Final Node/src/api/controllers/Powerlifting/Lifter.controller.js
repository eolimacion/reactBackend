const { genderEnum } = require('../../../data/genderEnum');
const Lifter = require('../../models/Powerlifting/Lifter.model');
const WeightCategory = require('../../models/Powerlifting/WeightCategory.model');
const User = require('../../models/User.model');


const createLifter = async (req, res, next) => {
  try {
    await Lifter.syncIndexes();
    const newLifter = new Lifter(req.body);
    const savedLifter = await newLifter.save();

    if (savedLifter) {
      return res.status(200).json(savedLifter);
    } else
      return res
        .status(404)
        .json('The lifter was not submitted correctly. Please retry.');
  } catch (error) {
    next(error);
    return (
      res.status(404).json({
        message: 'Error in lifter creation.',
        error: error,
      }) && next(error)
    );
  }
};

//<!--SEC                                          GET lifter BY ID                                             -->

const getLifterById = async (req, res) => {
  try {
    const { id } = req.params;
    const lifterById = await Lifter.findById(id);
    if (lifterById) {
      return res.status(200).json(lifterById);
    } else {
      return res.status(404).json("That lifter isn't in the database yet.");
    }
  } catch (error) {
    return res.status(404).json(error.message);
  }
};

//<!--SEC                                          GET ALL lifterS                                              -->

const getAllLifters = async (req, res) => {
  try {
    const allLifters = await Lifter.find();
    if (allLifters.length > 0) {
      return res.status(200).json(allLifters);
    } else {
      return res.status(404).json('No lifters in the database.');
    }
  } catch (error) {
    return res.status(404).json({
      error: 'Error while searching for all lifters',
      message: error.message,
    });
  }
};

//<!--SEC                                      GET BY LIFTER NAME                                        -->

const getByLifterName = async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.body.name);
    let { name } = req.body;
    name = name.toLowerCase();

    console.log(name);
    const lifterByName = await Lifter.find({ name });
    console.log(lifterByName);
    if (lifterByName.length > 0) {
      return res.status(200).json(lifterByName);
    } else {
      return res
        .status(404)
        .json("That lifter's name doesn't show up in our database.");
    }
  } catch (error) {
    return res.status(404).json({
      error: 'Error in the search getBylifterName catch.',
      message: error.message,
    });
  }
};

//<!--SEC                                  TOGGLE CATEGORY FOR                                     -->

// const addAndRemoveAlbumById = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const albumId = req.body.id;
//     console.log(albumId);
//     const lifterToUpdate = await lifter.findById(id);
//     if (lifterToUpdate) {
//       console.log('Hay cancion');
//       try {
//         if (lifterToUpdate.album.includes(albumId)) {
//           try {
//             await lifter.findByIdAndUpdate(id, {
//               $pull: { album: albumId },
//             });
//             try {
//               await Album.findByIdAndUpdate(albumId, {
//                 $pull: { lifters: id },
//               });
//               return res.status(200).json({
//                 dataUpdate: await lifter.findById(id).populate('album'),
//               });
//             } catch (error) {
//               return res.status(404).json('Error pulling lifter.');
//             }
//           } catch (error) {
//             return res.status(404).json('Error pulling album.');
//           }
//         } else {
//           try {
//             await lifter.findByIdAndUpdate(id, {
//               $push: { album: albumId },
//             });
//             try {
//               await Album.findByIdAndUpdate(albumId, {
//                 $push: { lifters: id },
//               });
//               return res.status(200).json({
//                 dataUpdate: await lifter.findById(id).populate('album'),
//               });
//             } catch (error) {
//               return res.status(404).json('Error pushing lifters.');
//             }
//           } catch (error) {
//             return res.status(404).json('Error pushing items.');
//           }
//         }
//       } catch (error) {
//         return res.status(404).json('Update not finalized.');
//       }
//     } else {
//       console.log('No hay cancion.');
//       return res.status(404).json('lifter not found.');
//     }
//   } catch (error) {
//     return (
//       res.status(404).json({
//         error: error.message,
//         message: 'Error in the Controller Catch',
//       }) && next(error)
//     );
//   }
// };

// //<!--SEC                                      UPDATE lifter                                          -->

// const update = async (req, res) => {
//   await lifter.syncIndexes();
//   try {
//     const { id } = req.params;
//     const lifterById = await lifter.findById(id);

//     if (lifterById) {
//       const customBody = {
//         _id: lifterById._id,
//         album: lifterById.album,
//         lifterName: req.body?.lifterName ? req.body.lifterName : lifterById.lifterName,
//         lifterLength: req.body?.lifterLength
//           ? req.body.lifterLength
//           : lifterById.lifterLength,
//         artist: req.body?.artist ? req.body.artist : lifterById.artist,
//         year: req.body?.year ? req.body.year : lifterById.year,
//         likedBy: lifterById.album,
//       };

//       if (req.body?.genres) {
//         const { genres } = req.body;
//         console.log(genres);
//         const requestGenres = genres.split(',');
//         const requestGenresInArray = [];
//         requestGenres.forEach((genre) => {
//           genre = genre.toLowerCase().trim();
//           requestGenresInArray.push(genre);
//         });
//         console.log(requestGenresInArray, 'Final del forEach');
//         const enumResult = enumGenres(requestGenresInArray);
//         console.log(enumResult, 'Enum result');
//         customBody.genres = enumResult.check
//           ? requestGenresInArray
//           : lifterById.genres;
//       }

//       if (req.body?.producers) {
//         const { producers } = req.body;
//         const producersArray = producers
//           .toLowerCase()
//           .split(',')
//           .map((producer) => producer.trim());
//         customBody.producers = producersArray;
//       }

//       if (req.body?.pace) {
//         const enumResult = enumPace(req.body.pace);
//         customBody.pace = enumResult.check ? req.body.pace : lifterById.pace;
//       }

//       try {
//         await lifter.findByIdAndUpdate(id, customBody);

//         const updatedlifter = await lifter.findById(id);
//         const elementUpdate = Object.keys(req.body);
//         let test = {};
//         elementUpdate.forEach((item) => {
//           if (req.body[item] === updatedlifter[item]) {
//             test[item] = true;
//           } else {
//             test[item] = false;
//           }
//         });
//         // Testeamos genres por separado porque es un array de un enum,
//         // entonces lo que hacemos es hacer un forEach sopesando si cada uno
//         // de los elementos forma parte del enum, sumando al accumulator si es cierto.
//         // Luego miramos si el accumulator ha subido, y en el caso de que sea mayor que 0,
//         // es decir, que en alguno de los forEach haya dado false, setteamos a false el resultado
//         // del testing de genres.
//         if (req.body.genres) {
//           const { genres } = req.body;
//           const requestGenres = genres.split(',');
//           const requestGenresInArray = [];
//           let acc = 0;
//           requestGenres.forEach((genre) => {
//             genre = genre.toLowerCase().trim();
//             requestGenresInArray.push(genre);
//           }); //aqui console.log de requestGenresInArray va bien
//           requestGenresInArray.forEach((genre) => {
//             console.log(genre);
//             !updatedlifter.genres.includes(genre) && acc++;
//             console.log(acc);
//           });
//           acc > 0
//             ? (test = { ...test, genres: false })
//             : (test = { ...test, genres: true });
//         }
//         let isUpdatedIncorrectly = 0;
//         for (let key in test) {
//           test[key] === false && isUpdatedIncorrectly++;
//         }

//         if (isUpdatedIncorrectly > 0) {
//           return res.status(404).json({
//             dataTest: test,
//             update: false,
//           });
//         } else {
//           return res.status(200).json({
//             dataTest: test,
//             test: true,
//           });
//         }
//       } catch (error) {
//         return setError(404, 'Error updating the lifter.');
//       }
//     } else return res.status(404).json('lifter not found.');
//   } catch (error) {
//     setError(404, error.message || 'Error in general catch update lifter.');
//   }
// };

// //<!--SEC                                         DELETE lifter                                                 -->

// const deletelifter = async (req, res) => {
//   try {
//     const { id } = req.params;
//     await lifter.findByIdAndDelete(id);

//     try {
//       try {
//         await Album.updateMany({ lifters: id }, { $pull: { lifters: id } });
//         try {
//           await User.updateMany({ favlifters: id }, { $pull: { favlifters: id } });
//         } catch (error) {
//           return res.status(404).json('Error pulling albums.');
//         }
//       } catch (error) {
//         return res.status(404).json('Error pulling lifters');
//       }
//       const findlifterById = await lifter.findById(id);
//       return res.status(findlifterById ? 404 : 200).json({
//         deleteTest: findlifterById ? false : true,
//       });
//     } catch (error) {
//       return res.status(404).json('Error in catch deleting.');
//     }
//   } catch (error) {
//     return res.status(404).json(error);
//   }
// };

module.exports = {
    createLifter,
    getLifterById,
    getAllLifters,
    getByLifterName,
}
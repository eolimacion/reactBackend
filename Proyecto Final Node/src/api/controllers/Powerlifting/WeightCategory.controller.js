//?------------------------ modelos ------------------------------
const User = require('../../models/User.model');
const Lifter = require('../../models/Powerlifting/Lifter.model');
const WeightCategory = require('../../models/Powerlifting/WeightCategory.model');

//?------------------------- utils -------------------------------
const { enumGenderOk, enumWeightCatOk } = require('../../../utils/enumOk');
//?----------------------- middleware -----------------------------

//?------------------------ librería ------------------------------

//?------------------------- estados ------------------------------

//?------------------------- helpers ------------------------------
const setError = require('../../../helpers/handle-error');

//?---------------------------------------------------------------------------------
//! -------------------------------- GET BY ----------------------------------------
//?---------------------------------------------------------------------------------

//* ---------------------- get by id ---------------------------

const getWeightCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const WeightCategoryById = await WeightCategory.findById(id);

    return res
      .status(WeightCategoryById ? 200 : 404)
      .json(
        WeightCategoryById ? WeightCategoryById : 'weight category not found'
      );
  } catch (error) {
    return next(setError(500, error.message || 'Error to get'));
  }
};

//* ------------------------- get all ---------------------------

const getAllWeightCategories = async (req, res) => {
  try {
    const allWeightCategories = await WeightCategory.find();

    if (allWeightCategories.length > 0) {
      return res.status(200).json(allWeightCategories);
    } else {
      return res.status(404).json('weight category not found');
    }
  } catch (error) {
    return next(setError(500, error.message || 'Error to get'));
  }
};

//?---------------------------------------------------------------------------------
//! ---------------------------- SORT BY GENDER ------------------------------------
//?---------------------------------------------------------------------------------

const getWeightCategoryByGender = async (req, res, next) => {
  try {
    const { gender } = req.params;

    const weightCatByGender = await WeightCategory.find({ gender }); //?-------- te devuelve solo uno????

    if (weightCatByGender.length > 0) {
      weightCatByGender.sort((b, a) => b.weight - a.weight);
      console.log(weightCatByGender);

      return res.status(200).json(weightCatByGender);
    } else {
      return res.status(404).json('not found');
    }
  } catch (error) {
    return next(setError(500, error.message || 'Error to get'));
  }
};

//*    ----------------------------------------------------------------------------------
//todo ------------------------------- CON AUTH -----------------------------------------
//todo -------------------------------DE ADMIN  -----------------------------------------
//*    ----------------------------------------------------------------------------------

//*-------------------------------- POST ------------------------------------------

//?---------------------------------------------------------------------------------
//! -------------------------------- CREATE ----------------------------------------
//?---------------------------------------------------------------------------------

const createWeightCategory = async (req, res, next) => {
  try {
    await WeightCategory.syncIndexes();
    const newWeightCategory = new WeightCategory(req.body);

    if (enumWeightCatOk(req.body.weight)) {
      const saveWeightCategory = newWeightCategory.save();

      if (saveWeightCategory) {
        return res.status(200).json(newWeightCategory);
      } else {
        return res.status(404).json('Not saved');
      }
    } else {
      return res.status(404).json('enum NOT OK');
    }
  } catch (error) {
    return next(setError(500, error.message || 'Error to create'));
  }
};

//*--------------------------------- PATCH ---------------------------------

//?---------------------------------------------------------------------------------
//! ---------------------------- GENERAL UPDATE ------------------------------------
//?---------------------------------------------------------------------------------

const updateWeightCategory = async (req, res, next) => {
  await WeightCategory.syncIndexes();
  try {
    const { id } = req.params; //hacemos la const del id y lo buscamos con findById
    const weightCategoryById = await WeightCategory.findById(id);
    //si ese autor existiese
    if (weightCategoryById) {
      const customBody = {
        weight: req.body?.weight ? req.body?.weight : weightCategoryById.weight,
        age: req.body?.age ? req.body?.age : weightCategoryById.age,
        lifters: weightCategoryById.lifters,
        likes: weightCategoryById.likes,
      };

      if (req.body?.gender) {
        const genderValid = enumGenderOk(req.body?.gender);
        customBody.genre = genderValid
          ? req.body?.gender
          : weightCategoryById.genre;
      }

      try {
        await weightCategoryById.findByIdAndUpdate(id, customBody);

        //todo----- VAMOS A HACER EL TESTING -------

        const weightCategoryByIdUpdate = await WeightCategory.findById(id);
        const elementUpdate = Object.keys(req.body);

        let test = {};
        //si el elemento existe
        elementUpdate.forEach((item) => {
          if (req.body[item] === weightCategoryByIdUpdate[item]) {
            if (req.body[item] != weightCategoryByIdUpdate[item]) {
              //si no es la misma que la antigua
              test[item] = true;
            } else {
              test[item] = 'same old info';
            }
          } else {
            test[item] = false;
          }
        });

        let acc = 0;
        for (let clave in test) {
          test[clave] == false && acc++;
        }
        if (acc > 0) {
          return res.status(404).json({
            weightCategoryByIdUpdate,
            update: test,
          });
        } else {
          return res.status(200).json({
            weightCategoryByIdUpdate,
            update: test,
          });
        }
      } catch (error) {
        res.status(404).json({
          error: 'genre not found',
          message: error.message,
        });
      }
    }
  } catch (error) {
    return next(setError(500, error.message || 'General error to update'));
  }
};

//?---------------------------------------------------------------------------------
//! ---------------------------- TOGGLE LIFTER------------------------------------
//?-------------------------------- update -----------------------------------------

const toggleLifter = async (req, res, next) => {
  //lo vamos a localizar con un id
  const { id } = req.params; // weightCategory
  const { lifters } = req.body; // lifter
  const weightCategoryById = await WeightCategory.findById(id);
  if (weightCategoryById) {
    const arrayIdLifter = lifters.split(',');
    //recorremos el array creado con un mapeo y dentro de una promesa para manejar asincronías
    // console.log(bookById);
    Promise.all(
      arrayIdLifter.map(async (lifter) => {
        console.log(lifter);
        if (weightCategoryById.lifters.includes(lifter)) {
          try {
            await WeightCategory.findByIdAndUpdate(id, {
              $pull: { lifters: lifter },
            });
            try {
              await Lifter.findByIdAndUpdate(lifter, {
                $pull: { weightCategory: id },
              });
            } catch (error) {
              return next(
                setError(500, error.message || 'General error to toggle pull')
              );
            }
          } catch (error) {
            return next(
              setError(500, error.message || 'General error to toggle pull')
            );
          }
        } else {
          try {
            await WeightCategory.findByIdAndUpdate(id, {
              $push: { lifters: lifter },
            });
            try {
              await Lifter.findByIdAndUpdate(lifter, {
                $push: { weightCategory: id },
              });
            } catch (error) {
              return next(
                setError(500, error.message || 'General error to toggle push')
              );
            }
          } catch (error) {
            return next(
              setError(500, error.message || 'General error to toggle push')
            );
          }
        }
      })
    ).then(async () => {
      return res.status(200).json({
        dataUpdate: await WeightCategory.findById(id).populate('lifters'),
      });
    });
  } else {
    return res.status(404).json('this lifter does not exist');
  }
};

//*------------------------------- delete ---------------------------------------

//?---------------------------------------------------------------------------------
//! -------------------------------- DELETE ----------------------------------------
//?---------------------------------------------------------------------------------

const deleteWeightCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    await WeightCategory.findByIdAndDelete(id);

    try {
      await Lifter.updateMany(
        { weightCategory: id },
        { $pull: { weightCategory: id } }
      );

      try {
        await User.updateMany(
          { favWeightCategories: id },
          { $pull: { favWeightCategories: id } }
        );

        const weightCategoryDeleted = await WeightCategory.findById(id);
        return res
          .status(weightCategoryDeleted ? 404 : 200)
          .json(
            weightCategoryDeleted
              ? 'error deleting genre'
              : 'this weight category no longer exists'
          );
      } catch (error) {
        return next(setError(500, error.message || 'Error to delete'));
      }
    } catch (error) {
      return next(setError(500, error.message || 'Error to delete'));
    }
  } catch (error) {
    return next(setError(500, error.message || 'Error to delete'));
  }
};

module.exports = {
  getWeightCategoryById,
  getAllWeightCategories,
  createWeightCategory,
  updateWeightCategory,
  toggleLifter,
  getWeightCategoryByGender,
  deleteWeightCategory,
};

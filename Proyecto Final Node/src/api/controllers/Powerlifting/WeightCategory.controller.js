//?------------------------ modelos ------------------------------
const User = require('../../models/User.model');
const WeightCategory = require('../../models/Powerlifting/WeightCategory.model');

//?------------------------- utils -------------------------------

//?----------------------- middleware -----------------------------

//?------------------------ librería ------------------------------

//?------------------------- estados ------------------------------

//?------------------------- helpers ------------------------------
const setError = require('../../../helpers/handle-error');
const { enumGenderOk } = require('../../../utils/enumOk');


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
        .json(WeightCategoryById ? WeightCategoryById : 'weight category not found');
    } catch (error) {
        return next(setError(500, error.message || 'Error to get'))
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
        return next(setError(500, error.message || 'Error to get'))
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
    const saveWeightCategory = newWeightCategory.save();

    if (saveWeightCategory) {
      return res.status(200).json(saveWeightCategory);
    } else {
      return res.status(404).json('Couldnt create weight category');
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
          customBody.genre = genderValid ? req.body?.gender : weightCategoryById.genre;
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










//*------------------------------- delete ---------------------------------------

//?---------------------------------------------------------------------------------
//! -------------------------------- DELETE ----------------------------------------
//?---------------------------------------------------------------------------------

const deleteGenre = async (req, res, next) => {
    try {
      const { id } = req.params;
      await Genre.findByIdAndDelete(id);
  
      try {
        await Book.updateMany({ authors: id }, { $pull: { authors: id } });
        try {
          await Author.updateMany({ genres: id }, { $pull: { genres: id } });
          try {
            await User.updateMany(
              { favGenres: id },
              { $pull: { favGenres: id } }
            );
  
            const genreDeleted = await Genre.findById(id);
            return res
              .status(genreDeleted ? 404 : 200)
              .json(
                genreDeleted
                  ? 'error deleting genre'
                  : 'this genre no longer exists'
              );
          } catch (error) {
            return res.status(404).json({
              error: 'error catch updating user',
              message: error.message,
            });
          }
        } catch (error) {
          return res.status(404).json({
            error: 'error catch updating authors',
            message: error.message,
          });
        }
      } catch (error) {
        return res.status(404).json({
          error: 'error catch updating book',
          message: error.message,
        });
      }
    } catch (error) {
      return next(setError(500, error.message || 'Error to delete'));
    }
  };



module.exports= {
    getWeightCategoryById,
    getAllWeightCategories,
    createWeightCategory,
    updateWeightCategory
}

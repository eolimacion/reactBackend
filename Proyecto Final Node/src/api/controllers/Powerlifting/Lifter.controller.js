const setError = require('../../../helpers/handle-error');
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
    const lifterById = await Lifter.findById(id).populate(
      'weightCategory comments'
    );
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
    console.log(req.body.name);
    let { name } = req.body;
    name = name.toLowerCase();

    console.log(name);
    const lifterByName = await Lifter.find({ name: {$regex : name, $options : "i"} });
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

//<!--SEC                                      SORT BY GL POINTS                                       -->

const getLifterByGL = async (req, res, next) => {
  try {
    const allLifters = await Lifter.find();
    if (allLifters.length > 0) {
      allLifters.sort((a, b) => b.GLPoints - a.GLPoints);
      console.log(allLifters);

      return res.status(200).json({
        allLifters,
      });
    } else {
      return res.status(404).json('not found');
    }
  } catch (error) {
    return next(setError(500, error.message || 'Error'));
  }
};

//<!--SEC                                  TOGGLE CATEGORY FOR LIFTER                                    -->

const addAndRemoveCategoryById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { categoryId } = req.body;
    console.log(id);
    console.log(categoryId);
    const lifterToUpdate = await Lifter.findById(id);
    if (lifterToUpdate) {
      console.log('Hay lifter');
      try {
        if (lifterToUpdate.weightCategory.includes(categoryId)) {
          try {
            await Lifter.findByIdAndUpdate(id, {
              $pull: { weightCategory: categoryId },
            });
            try {
              await WeightCategory.findByIdAndUpdate(categoryId, {
                $pull: { lifters: id },
              });
              return res.status(200).json({
                dataUpdate:
                  await Lifter.findById(id).populate('weightCategory'),
              });
            } catch (error) {
              return res.status(404).json(error.message);
            }
          } catch (error) {
            return res.status(404).json('Error pulling category.');
          }
        } else {
          try {
            await Lifter.findByIdAndUpdate(id, {
              $push: { weightCategory: categoryId },
            });
            try {
              await WeightCategory.findByIdAndUpdate(categoryId, {
                $push: { lifters: id },
              });
              return res.status(200).json({
                dataUpdate:
                  await Lifter.findById(id).populate('weightCategory'),
              });
            } catch (error) {
              return res.status(404).json('hola');
            }
          } catch (error) {
            return res.status(404).json(error.message);
          }
        }
      } catch (error) {
        return res.status(404).json('Update not finalized.');
      }
    } else {
      console.log('No lifter found.');
      return res.status(404).json('Lifter not found.');
    }
  } catch (error) {
    return (
      res.status(404).json({
        error: error.message,
        message: 'Error in the Controller Catch',
      }) && next(error)
    );
  }
};

//<!--SEC                                      UPDATE lifter                                          -->

const updateLifter = async (req, res) => {
  await Lifter.syncIndexes();
  try {
    const { id } = req.params;
    const lifterById = await Lifter.findById(id);
    req.file && (lifterById.image = catchImg)

    if (lifterById) {
      const customBody = {
        _id: lifterById._id,
        weightCategory: lifterById.weightCategory,
        name: req.body?.name ? req.body.name : lifterById.name,
        age: req.body?.age ? req.body.age.parseInt() : lifterById.age,
        benchPress: req.body?.benchPress
          ? req.body.benchPress.parseInt()
          : lifterById.benchPress,
        squat: req.body?.squat ? req.body.squat.parseInt() : lifterById.squat,
        deadlift: req.body?.deadlift
          ? req.body.deadlift.parseInt()
          : lifterById.deadlift,
        total: req.body?.total ? req.body.total.parseInt() : lifterById.total,
        GLPoints: req.body?.GLPoints
          ? req.body.GLPoints.parseInt()
          : lifterById.GLPoints,
        likes: lifterById.category,
        comments: lifterById.comments,
      };

      try {
        await Lifter.findByIdAndUpdate(id, customBody);

        const updatedLifter = await Lifter.findById(id);
        const elementUpdate = Object.keys(req.body);
        let test = [];
        elementUpdate.forEach((item) => {
          if (req.body[item] === updatedLifter[item]) {
            test[item] = true;
          } else {
            test[item] = false;
          }
        });

        if (req.file) {
          //? la imagen va siempre aparte porque va por la request.file
          updatedLifter.image === catchImg //? si la imagen del user actualizado es igual a la imagen nueva, guardada en el catch
            ? test.push({
                //? indicamos que la clave image es true, porque ha sido actualizada
                image: true,
              })
            : test.push({
                image: false,
              });
        }
        // Testeamos genres por separado porque es un array de un enum,
        // entonces lo que hacemos es hacer un forEach sopesando si cada uno
        // de los elementos forma parte del enum, sumando al accumulator si es cierto.
        // Luego miramos si el accumulator ha subido, y en el caso de que sea mayor que 0,
        // es decir, que en alguno de los forEach haya dado false, setteamos a false el resultado
        // del testing de genres.
        let isUpdatedIncorrectly = 0;
        for (let key in test) {
          test[key] === false && isUpdatedIncorrectly++;
        }

        if (isUpdatedIncorrectly > 0) {
          return res.status(404).json({
            dataTest: test,
            update: false,
          });
        } else {
          return res.status(200).json({
            dataTest: test,
            test: true,
          });
        }
      } catch (error) {
        return setError(404, 'Error updating the lifter.');
      }
    } else return res.status(404).json('Lifter not found.');
  } catch (error) {
    setError(404, error.message || 'Error in general catch update Lifter.');
  }
};

//<!--SEC                                         DELETE lifter                                                 -->

const deleteLifter = async (req, res) => {
  try {
    const { id } = req.params;
    await Lifter.findByIdAndDelete(id);

    try {
      try {
        await WeightCategory.updateMany(
          { lifters: id },
          { $pull: { lifters: id } }
        );
        try {
          await User.updateMany(
            { favLifters: id },
            { $pull: { favLifters: id } }
          );
        } catch (error) {
          return res.status(404).json('Error pulling categories.');
        }
      } catch (error) {
        return res.status(404).json('Error pulling lifters');
      }
      const findLifterById = await Lifter.findById(id);
      return res.status(findLifterById ? 404 : 200).json({
        deleteTest: findLifterById ? false : true,
      });
    } catch (error) {
      return res.status(404).json('Error in catch deleting.');
    }
  } catch (error) {
    return res.status(404).json(error);
  }
};


//! --------------- FILTER GENERAL NUMÉRICO ----------------
const filterLiftersNum = async (req, res, next) => {
  try {
    let liftersArray;
    const { filter, gt, lt } = req.params; //? en el param ponemos 1o: propiedad a filtrar, 2o: mayor que (Greater Than), 3o: menor que (Lower Than)
    console.log(filter, gt, lt)
    switch (filter) {
      case "birthYear":
      case "benchPress":
      case "squat":
      case "deadlift":
      case "total":
      case "GLPoints":
        liftersArray = await Lifter.find({
          $and: [{ [filter]: { $gt: gt } }, { [filter]: { $lt: lt } }],
        }).populate("weightCategory");
        break;

      default:
        return res
          .status(404)
          .json(
            "La propiedad por la que quiere filtrar no existe/está mal escrita ❌, compruebe el modelo de datos para checkear como se escribe",
          );
    }

    return res
      .status(liftersArray.length > 0 ? 200 : 404)
      .json(
        liftersArray.length > 0
          ? liftersArray
          : `No se han encontrado jugadores con ${filter} mayor que ${gt} y menor que ${lt} en la DB/BackEnd ❌`,
      );
  } catch (error) {
    return next(
      setError(500, error.message || `Error general al filtrar Jugadores ❌`),
    );
  }
};

//! --------------- SORT GENERAL DESCENDING----------------

const sortLiftersbyDescending = async (req, res, next) => {
  try {
    const { stat } = req.params;
    const liftersArray = await Lifter.find().populate("weightCategory");
    switch (stat) {
      case "birthYear":
        case "benchPress":
        case "squat":
        case "deadlift":
        case "total":
        case "GLPoints":
          liftersArray.sort((a, b) => {
          return b[stat] - a[stat]; //? le decimos que ordene de manera descendiente (ascendiente sería a - b)
        });
        break;

      case "likes": //? lo hacemos diferente porque tenemos que evaluar la length del array para ver los likes
      liftersArray.sort((a, b) => {
          return b[stat].length - a[stat].length; //? le decimos que ordene de manera descendiente (ascendiente sería a - b)
        });
        break;

      case "name":
        liftersArray.sort((a, b) => {
          a = a[stat].toLowerCase();
          b = b[stat].toLowerCase();
          return a[stat] < b[stat] ? -1 : 1; //? le decimos que ordene ALFABÉTICAMENTE (al revés sería b - a)
        });
        break;

      default:
        return res
          .status(404)
          .json(
            "La propiedad por la que quiere ordenar no existe/está mal escrita ❌, compruebe el modelo de datos para checkear como se escribe",
          );
    }
    return res
      .status(liftersArray.length > 0 ? 200 : 404)
      .json(
        liftersArray.length > 0
          ? liftersArray
          : "No se han encontrado jugadores en la DB/BackEnd ❌",
      );
  } catch (error) {
    return next(
      setError(
        500,
        error.message ||
          `Error general al ordenar Jugadores de forma Descendiente ❌`,
      ),
    );
  }
};

//! --------------- SORT GENERAL ASCENDING ----------------
const sortLiftersbyAscending = async (req, res, next) => {
  try {
    const { stat } = req.params;
    const liftersArray = await Lifter.find().populate("weightCategory");
    switch (stat) {
      case "birthYear":
        case "benchPress":
        case "squat":
        case "deadlift":
        case "total":
        case "GLPoints":
          liftersArray.sort((a, b) => {
          return a[stat] - b[stat]; //? le decimos que ordene de manera ASCENDIENTE
        });
        break;

      case "name":
        liftersArray.sort((a, b) => {
          a = a[stat].toLowerCase();
          b = b[stat].toLowerCase();
          return a[stat] > b[stat] ? -1 : 1; //? le decimos que ordene ALFABÉTICAMENTE INVERSO
        });
        break;

      default:
        return res
          .status(404)
          .json(
            "La propiedad por la que quiere ordenar no existe/está mal escrita ❌, compruebe el modelo de datos para checkear como se escribe",
          );
    }

    return res
      .status(liftersArray.length > 0 ? 200 : 404)
      .json(
        liftersArray.length > 0
          ? liftersArray
          : "No se han encontrado jugadores en la DB/BackEnd ❌",
      );
  } catch (error) {
    return next(
      setError(
        500,
        error.message ||
          `Error general al ordenar Jugadores de forma Ascendiente ❌`,
      ),
    );
  }
};

module.exports = {
  createLifter,
  getLifterById,
  getAllLifters,
  getByLifterName,
  getLifterByGL,
  addAndRemoveCategoryById,
  updateLifter,
  deleteLifter,
  filterLiftersNum,
  sortLiftersbyDescending,
  sortLiftersbyAscending
};

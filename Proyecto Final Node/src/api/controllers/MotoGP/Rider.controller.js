const setError = require('../../../helpers/handle-error');
const { deleteImgCloudinary } = require('../../../middleware/files.middleware');
const Circuit = require('../../models/MotoGP/Circuit.model');
const Podium = require('../../models/MotoGP/Podium.model');
const Rider = require('../../models/MotoGP/Rider.model');
const User = require('../../models/User.model');

//!--------- CREATE ---------------

const create = async (req, res, next) => {
  let catchImg = req.file?.path; //? ------- capturamos la url de la img que se sube a cloudinary. El OPTIONAL CHAINING es porque la img no es obligatoria y puede que no haya imagen en la request
  try {
    await Rider.syncIndexes(); //? --------------------------- ACTUALIZAMOS INDEXES, que son aquellas claves del objeto que son únicas. Lo hacemos para asegurarnos que tenemos la última versión en caso de haber sido modificados los modelos
    const newRider = new Rider(req.body); //? --------------------- instanciamos un nuevo rider y le INTRODUCIMOS COMO INFO INICIAL LO QUE RECIBIMOS EN EL BODY DE LA REQUEST
    if (req.file) {
      //? -------------------- miramos si en la request hay imagen. Si la hay, la introducimos al nuevo rider
      newRider.image = catchImg;
    } else {
      newRider.image = //CAMBIAR LA IMG POR DEFECTO
        'https://s.hs-data.com/bilder/spieler/gross/619081.jpg?fallback=png';
    }
    const saveRider = await newRider.save(); //? ---------------------- GUARDAMOS EL RIDER EN LA BASE DE DATOS (DB) O BACKEND
    //todo ----------------- INTENTO RECIPROCIDAD EN EL CREATE ----------------
    const id = saveRider._id; //? obtenemos el id a través de _id (FORMA PARA OBTENER EL ID)
    const riderCircuits = req.body?.circuits;
    if (riderCircuits) {
      await Circuit.findByIdAndUpdate(
        riderCircuits, //? 1r param: el id del elemento que vamos a modificar (añadirle los riders)
        { $push: { riders: id } } //? ------------------------------------------- 2o param: le metemos el id del rider que estamos creando a la propiedad player del circuit que hemos puesto en el body
      );
    }

    if (saveRider) {
      //? si se ha guardado correctamente (savePlayer existe)
      res
        .status(200)
        .json(await Rider.findById(id).populate('circuits likes selected')); //? ---- podriamos poner que devuelva savePlayer pero he puesto el findbyid para popular el team
    } else {
      return res.status(404).json({
        message: 'No se ha podido guardar el rider en la DB ❌',
      });
    }
  } catch (error) {
    //? --------------------------------------------- si ha habido un error creando el rider:
    req.file?.path ? deleteImgCloudinary(catchImg) : null; //? ---- hay que borrar la imagen, ya que ya se ha subido a cloudinary. Se ha hecho en la primera línea de esta función
    return next(
      setError(500, error.message || 'Error general al crear el rider ❌')
    );
  }
};

//! --------- Get by ID ------------
const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const riderById = await Rider.findById(id).populate(
      'likes selected circuits'
    ); //? cogemos el elemento (rider) identificandola a través del id, que es único
    if (riderById) {
      //? --------------------------- si hay un elemento con dicho id
      return res.status(200).json(riderById);
    } else {
      return res.status(404).json('no se ha encontrado el rider ❌');
    }
  } catch (error) {
    return next(
      setError(500, error.message || 'Error general al GET by ID ❌')
    );
  }
};

//! --------------- GET ALL ----------------
const getAll = async (req, res, next) => {
  try {
    const allRiders = await Rider.find().populate('circuits likes selected'); //? ------------- el find() nos devuelve un array con todos los elementos de la colección del BackEnd, es decir, TODOS LOS RIDERS
    if (allRiders.length > 0) {
      //? --------------------------- SI HAY MOTOS:
      console.log(allRiders);
      return res.status(200).json(allRiders);
    } else {
      return res
        .status(404)
        .json('no se han encontrado riders en la colección (BackEnd) ❌');
    }
  } catch (error) {
    return next(setError(500, error.message || 'Error general al GET ALL ❌'));
  }
};

//! --------------- GET by NAME ----------------
const getByName = async (req, res, next) => {
  try {
    const { name } = req.params;
    const riderByName = await Rider.find({ name }).populate('likes selected');
    if (riderByName.length > 0) {
      console.log(riderByName);
      return res.status(200).json(riderByName);
    } else {
      return res
        .status(404)
        .json('no se han encontrado riders a través de name ❌');
    }
  } catch (error) {
    return next(
      setError(500, error.message || 'Error general al GET by NAME ❌')
    );
  }
};

//! --------------- UPDATE ----------------

const update = async (req, res) => {
  await Rider.syncIndexes();
  let catchImg = req.file?.path;
  try {
    const { id } = req.params;
    const riderById = await Rider.findById(id);
    if (riderById) {
      const oldImg = riderById.image;

      const customBody = {
        _id: riderById._id, //? ---------- ponemos _.id porque así lo pone en insomnia
        image: req.file?.path ? catchImg : oldImg, //? -------------- si en el param hay una nueva imagen la ponemos en el lugar de la que había, si no hay una nueva, se deja la que había
        name: req.body?.name ? req.body.name : riderById.name,
        number: req.body?.number ? req.body.number : riderById.number,
        age: req.body?.age ? req.body.age : riderById.age,
        nationality: req.body?.nationality
          ? req.body?.nationality
          : riderById.nationality,
        rating: req.body?.rating ? req.body.rating : riderById.rating,
        ranking: req.body?.ranking ? req.body?.ranking : riderById.ranking,
        points: req.body?.points ? req.body?.points : riderById.points,
        victoriesSeason: req.body?.victoriesSeason
          ? req.body?.victoriesSeason
          : riderById.victoriesSeason,
        victoriesCarrer: req.body?.victoriesCarrer
          ? req.body?.victoriesCarrer
          : riderById.victoriesCarrer,
        championshipsCarrer: req.body?.championshipsCarrer
          ? req.body?.championshipsCarrer
          : riderById.championshipsCarrer,
        team: req.body?.team ? req.body?.team : riderById.team,
        polesSeason: req.body?.polesSeason
          ? req.body?.polesSeason
          : riderById.polesSeason,
        circuits: riderById.circuits,
        likes: riderById.likes,
        selected: riderById.selected,
      };

      try {
        await Rider.findByIdAndUpdate(id, customBody).populate(
          'circuits likes selected'
        );
        if (req.file?.path) {
          deleteImgCloudinary(oldImg);
        }
        //!           -------------------
        //!           | RUNTIME TESTING |
        //!           -------------------

        const riderByIdUpdated = await Rider.findById(id);
        const elementUpdate = Object.keys(req.body);
        let test = [];

        elementUpdate.forEach((key) => {
          if (req.body[key] === riderByIdUpdated[key]) {
            //? ---------- si el valor de la clave en la request (el valor actualizado que hemos pedido meter) es el mismo que el que hay ahora en el elemento ---> está bien
            test.push({ [key]: true }); //? ------------------------------------ está bien hecho por lo tanto en el test con la clave comprobada ponemos true --> test aprobado hehe
          } else {
            test.push({ [key]: false }); //? ----------------------------------- algo ha fallado y por lo tanto el test está suspendido (false)
          }
        });

        if (catchImg) {
          riderByIdUpdated.image = catchImg //? ---------------- si la imagen en la request es la misma que la que hay ahora en el elemento
            ? (test = { ...test, file: true }) //? ------------- hacemos una copia de test y le decimos que en file (foto) es true, ha ido bien
            : (test = { ...test, file: false }); //? ------------ hacemos una copia de test y le decimos que en file (foto) es false, ha ido mal
        }

        let acc = 0;
        for (let clave in test) {
          //? -------------------- recorremos tests
          test[clave] == false ? acc++ : null; //? - si el valor es false es que algo ha fallado y le sumamos al contador de fallos
        }

        if (acc > 0) {
          //? --------------------- si acc 1 o más, es que ha habido uno o más errores, y por lo tanto hay que notificarlo
          return res.status(404).json({
            dataTest: test, //? ------------ por aquí podremos examinar los errores viendo en qué claves se han producido
            update: false,
          });
        } else {
          return res.status(200).json({
            dataTest: test,
            update: true,
            updatedRider: riderByIdUpdated,
          });
        }
      } catch (error) {
        return res.status(404).json({
          message: 'no se ha guardado el rider updated correctamente ❌',
          error: error.message,
        });
      }
    } else {
      return res.status(404).json('este rider no existe ❌');
    }
  } catch (error) {
    return res.status(404).json({
      message:
        'error al actualizar datos del rider (update) ❌ - catch general',
      error: error.message,
    });
  }
};

//! --------------- DELETE ----------------

const deleteRider = async (req, res, next) => {
  try {
    const { id } = req.params;
    const rider = await Rider.findByIdAndDelete(id);

    if (rider) {
      try {
        await User.updateMany({ favRiders: id }, { $pull: { favRiders: id } });
        try {
          await Circuit.updateMany(
            { fastestLap: id },
            { $pull: { fastestLap: id } }
          );
          try {
            await Circuit.updateMany(
              { mostSuccessful: id },
              { $pull: { mostSuccessful: id } }
            );
            try {
              await Podium.updateMany(
                { firstPlace: id },
                { $pull: { firstPlace: id } }
              );
              try {
                await Podium.updateMany(
                  { secondPlace: id },
                  { $pull: { secondPlace: id } }
                );
                try {
                  await Podium.updateMany(
                    { thirdPlace: id },
                    { $pull: { thirdPlace: id } }
                  );
                } catch (error) {
                  return next(
                    setError(
                      500,
                      /* error.message || */ 'Error al eliminar al rider de la tercera plaza del Podium ❌'
                    )
                  );
                }
              } catch (error) {
                return next(
                  setError(
                    500,
                    /* error.message || */ 'Error al eliminar al rider de la segunda plaza del Podium ❌'
                  )
                );
              }
            } catch (error) {
              return next(
                setError(
                  500,
                  /* error.message || */ 'Error al eliminar al rider de la primera plaza del Podium ❌'
                )
              );
            }
          } catch (error) {
            return next(
              setError(
                500,
                /* error.message || */ 'Error al eliminar al rider de la most successful en circuit ❌'
              )
            );
          }
        } catch (error) {
          return next(
            setError(
              500,
              /* error.message || */ 'Error al eliminar al rider de la fastest lap en cirucuit ❌'
            )
          );
        }
      } catch (error) {
        return next(
          setError(
            500,
            /* error.message || */ 'Error al eliminar al rider de favoritos de User ❌'
          )
        );
      }
      const findByIdRider = await Rider.findById(id); //? hemos encontrado este jugador? no debería existir porque lo hemos eliminado al ppio
      return res.status(findByIdRider ? 404 : 200).json({
        //? si se encuentra hay un error, porque no se ha eliminado
        deleteTest: findByIdRider ? false : true, //? si existe, el test ha dado fallo y si no existe ha aprobado el test
      });
    } else {
      return res.status(404).json('este rider no existe ❌');
    }
  } catch (error) {
    return next(
      setError(500, error.message || 'Error general al eliminar al rider ❌')
    );
  }
};

// -----------------------------------------------------
// -------------- EXTRA CONTROLLERS --------------------
// -----------------------------------------------------

//!----------SORT GENERAL DESCENDING --------------

const sortRidersByDescending = async (req, res, next) => {
  try {
    const { stat } = req.params;
    const ridersArray = await Rider.find().populate('circuits likes selected');
    switch (stat) {
      case 'name':
      case 'nationality':
      case 'number':
      case 'age':
      case 'ranking':
      case 'polesSeason':
      case 'points':
      case 'victoriesSeason':
      case 'victoriesCarrer':
      case 'championshipsCarrer':
      case 'rating':
        ridersArray.sort((a, b) => {
          return b[stat] - a[stat];
        });
        break;
      case 'likes':
        ridersArray.sort((a, b) => {
          return b[stat].length - a[stat].length;
        });
        break;
      case 'name':
        ridersArray.sort((a, b) => {
          a = a[stat].toLowerCase();
          b = b[stat].toLowerCase();
          return a[stat] < b[stat] ? -1 : 1;
        });
        break;
      default:
        return res
          .status(404)
          .json(
            'La propiedad por la que quiere ordenar no existe/está mal escrita ❌, compruebe el modelo de datos para checkear como se escribe'
          );
    }
    return res
      .status(ridersArray.length > 0 ? 200 : 404)
      .json(
        ridersArray.length > 0
          ? ridersArray
          : 'No se han encontrado riders en la DB/BackEnd ❌'
      );
  } catch (error) {
    return next(
      setError(
        500,
        error.message ||
          `Error general al ordenar Riders de forma Descendiente ❌`
      )
    );
  }
};

//!----------------- SORT GENERAL ASCENDING --------------

const sortRidersByAscending = async (req, res, next) => {
  try {
    const { stat } = req.params;
    const ridersArray = await Rider.find().populate('circuits likes selected');
    switch (stat) {
      case 'number':
      case 'age':
      case 'polesSeason':
      case 'points':
      case 'victoriesSeason':
      case 'victoriesCarrer':
      case 'championshipsCarrer':
      case 'rating':
        ridersArray.sort((a, b) => {
          return a[stat] - b[stat];
        });
        break;

      case 'name':
        ridersArray.sort((a, b) => {
          a = a[stat].toLowerCase();
          b = b[stat].toLowerCase();
          return a[stat] > b[stat] ? -1 : 1;
        });
        break;
      default:
        return res
          .status(404)
          .json(
            'La propiedad por la que quiere ordenar no existe/está mal escrita ❌, compruebe el modelo de datos para checkear como se escribe'
          );
    }
    return res
      .status(ridersArray.length > 0 ? 200 : 404)
      .json(
        ridersArray.length > 0
          ? ridersArray
          : 'No se han encontrado riders en la DB/BackEnd ❌'
      );
  } catch (error) {
    return next(
      setError(
        500,
        error.message ||
          `Error general al ordenar Riders de forma Descendiente ❌`
      )
    );
  }
};

//!-----------FILTER POR NAME ------------------

const filterRiders = async (req, res, next) => {
  try {
    let ridersArray;
    const { filter, gt, lt } = req.params;

    switch (filter) {
      case 'number':
      case 'age':
      case 'ranking':
      case 'victoriesSeason':
      case 'victoriesCarrer':
      case 'championshipsCarrer':
      case 'polesSeason':
      case 'points':
      case 'rating':
        ridersArray = await Rider.find({
          $and: [{ [filter]: { $gt: gt } }, { [filter]: { $lt: lt } }],
        }).populate('likes selected circuits');

        break;

      default:
        return res
          .status(404)
          .json(
            'La propiedad por la que quiere filtrar no existe o está mal escrita ❌'
          );
    }

    return res
      .status(ridersArray.length > 0 ? 200 : 404)
      .json(
        ridersArray.length > 0
          ? ridersArray
          : `No se han encontrado pilotos con ${filter} mayor que ${gt} y menor que ${lt} en la DB/BackEnd.`
      );
  } catch (error) {
    return next(
      setError(500, error.message || 'Error general al filtrar riders ❌')
    );
  }
};

module.exports = {
  create,
  getById,
  getAll,
  getByName,
  update,
  deleteRider,
  sortRidersByAscending,
  sortRidersByDescending,
  filterRiders,
};
